import json
from flask_cors import CORS, cross_origin
import cv2
import imutils
import os
from flask import Flask, render_template, Response, send_from_directory, request, jsonify, flash, redirect, url_for, \
    make_response
from imutils.video import FPS
import traceback
from detect import detect_people, draw_people, draw_metrics
from werkzeug.utils import secure_filename
from datetime import datetime
import csv


app = Flask(__name__)
CORS(app)
cors = CORS(app, resource={
    r"/*": {
        "origins": "*"
    }
})
app.secret_key = os.urandom(24)
app.config.from_pyfile('config.py')

settings = ['MIN_DISTANCE', 'THRESHOLD', 'ALERT', 'OUTPUT', 'DISPLAY', 'USE_GPU', 'MAIL', 'MIN_CONF', 'NMS_THRESH',
            'WEIGHTS', 'CFG']
ALLOWED_EXTENSIONS = {'mp4'}

xVals = []
yVals = []
currentTime = []
csvFile1 = []


def getSettings(config_dict):
    return {key: config_dict[key] for key in settings}


print(getSettings(app.config))


def gen_frames(filename):
    csvFile = filename.split('.')[0] + '.csv'
    csvFile1.append(csvFile)
    try:
        with app.app_context():
            mailSent = False
            labelsPath = os.path.sep.join([app.config['MODEL_PATH'], "coco.names"])
            LABELS = open(labelsPath).read().strip().split("\n")

            weightsPath = os.path.sep.join([app.config['MODEL_PATH'], app.config['WEIGHTS']])
            configPath = os.path.sep.join([app.config['MODEL_PATH'], app.config['CFG']])

            net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)

            if app.config['USE_GPU']:
                print("[INFO] Using GPU")
                net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
                net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)
            else:
                print("[INFO] Using CPU")
                net.setPreferableBackend(cv2.dnn.DNN_BACKEND_OPENCV)
                net.setPreferableTarget(cv2.dnn.DNN_TARGET_CPU)

            ln = net.getLayerNames()
            ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]

            cap = cv2.VideoCapture(app.config['VIDEO_PATH'] + filename)
            writer = None
            fps = FPS().start()

            while True:
                success, frame = cap.read()
                if not success:
                    break
                frame = imutils.resize(frame, width=700, height=700)
                results, no_of_people = detect_people(frame, net, ln, personIdx=LABELS.index("person"))
                violations = draw_people(frame, results)
                xVals.append(no_of_people)
                yVals.append(len(violations))
                timestamp = datetime.utcnow().strftime('%H:%M:%S')
                currentTime.append(timestamp)
                if draw_metrics(frame, violations, no_of_people, mailSent) is True:
                    mailSent = True
                data = [no_of_people, len(violations), timestamp]
                with open('../client/src/assets/{csvFile}', mode='a', newline='') as csv_file:
                    csv_writer = csv.writer(csv_file)
                    csv_writer.writerow(data)
                ret, buffer = cv2.imencode('.jpg', frame)
                yield b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n'
                fps.update()
                if app.config['OUTPUT'] is True and writer is None:
                    outputFile = app.config['VIDEO_PATH'] + "output/" + filename
                    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
                    writer = cv2.VideoWriter(outputFile, fourcc, 25,
                                             (frame.shape[1], frame.shape[0]), True)
                if writer is not None:
                    writer.write(frame)
            fps.stop()
            print("----------------------------")
            print("[INFO] Elapsed time: {:.2f}".format(fps.elapsed()))
            print("[INFO] Approx. FPS: {:.2f}".format(fps.fps()))
    except:
        traceback.print_exc()
    finally:
        # xVals.append("#")
        # yVals.append("#")
        data = ["#", "#", "#"]
        with open('../client/src/assets/violations.csv', mode='a', newline='') as csv_file:
            csv_writer = csv.writer(csv_file)
            csv_writer.writerow(data)
        if writer is not None:
            writer.release()
        if cap is not None:
            cap.release()


@app.route('/video_feed/<path:filename>')
def video_feed(filename):
    return Response(gen_frames(filename), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/dashboard')
@cross_origin()
def get_current_time():
    print('inside')
    return {'time': xVals}


@app.route('/getFile')
@cross_origin()
def get_current_file():
    print('inside')
    return {'file': csvFile1}


@app.route('/dashboard1')
@cross_origin()
def get_current_time1():
    print('inside')
    return {'time1': yVals}


@app.route('/dashboard2')
@cross_origin()
def get_current_time2():
    print('inside')
    return {'time2': currentTime}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/download/<path:filename>', methods=['GET', 'POST'])
@cross_origin(origin='localhost')
def download(filename):
    try:
        output_folder = os.path.join(app.root_path, app.config['VIDEO_PATH'], "output/")
        return send_from_directory(directory=output_folder, filename=filename, mimetype='application/octet-stream',
                                   as_attachment=True)
    except:
        traceback.print_exc()


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            print('No file part')
            return make_response("False", 500)
        file = request.files['file']
        if file.filename == '':
            print('No selected file')
            return make_response("False", 500)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.root_path, app.config['VIDEO_PATH'], filename))
            print('File uploaded')
            return make_response("True", 200)
    except:
        traceback.print_exc()
        return make_response("False", 500)


@app.route('/config', methods=['GET', 'POST'])
def config():
    try:
        if request.method == 'GET':
            return json.dumps(getSettings(app.config))
        else:
            data = request.json
            for key in settings:
                if key in data:
                    app.config[key] = data[key]
            return json.dumps(getSettings(app.config))
    except:
        traceback.print_exc()


if __name__ == '__main__':
    app.run(debug=True)
