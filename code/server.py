from flask import Flask, render_template, Response
import cv2
import time
import config
from mail import Mailer
import argparse, imutils, cv2, os, time
from detect import detect_people, draw_people
from imutils.video import VideoStream, FPS


app = Flask(__name__)


def gen_frames():
    font = cv2.FONT_HERSHEY_SIMPLEX
    labelsPath = os.path.sep.join([config.MODEL_PATH, "coco.names"])
    LABELS = open(labelsPath).read().strip().split("\n")

    weightsPath = os.path.sep.join([config.MODEL_PATH, config.WEIGHTS])
    configPath = os.path.sep.join([config.MODEL_PATH, config.CFG])

    net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)

    if config.USE_GPU:
        print("[INFO] Using GPU")
        net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
        net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)
    else:
        print("[INFO] Using CPU")
        net.setPreferableBackend(cv2.dnn.DNN_BACKEND_OPENCV)
        net.setPreferableTarget(cv2.dnn.DNN_TARGET_CPU)

    ln = net.getLayerNames()
    ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]

    cap = cv2.VideoCapture("videos/test.mp4")
    fps = FPS().start()

    while True:
        success, frame = cap.read()
        if not success:
            break
        frame = imutils.resize(frame, width=700, height=700)
        results = detect_people(frame, net, ln, personIdx=LABELS.index("person"))
        violations = draw_people(frame, results)

        if config.DISPLAY:
            Safe_Distance = "Safe distance: >{} px".format(config.MIN_DISTANCE)
            cv2.putText(frame, Safe_Distance, (470, frame.shape[0] - 25), font, 0.60, (255, 0, 0), 1)
            Threshold = "Threshold limit: {}".format(config.THRESHOLD)
            cv2.putText(frame, Threshold, (470, frame.shape[0] - 50), font, 0.60, (255, 0, 0), 1)
            text = "Total violations: {}".format(len(violations))
            cv2.putText(frame, text, (10, frame.shape[0] - 25), font, 0.60, (0, 0, 255), 1)

        if len(violations) >= config.THRESHOLD:
            if config.DISPLAY:
                cv2.putText(frame, "*ALERT: Violations over limit*", (10, frame.shape[0] - 50), font, 0.60, (0, 0, 255),
                            1)
            if config.ALERT:
                print('[INFO] Sending mail...')
                Mailer().send(config.MAIL)
                print('[INFO] Mail sent')

        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n'
        # time.sleep(0.1)
        fps.update()
    fps.stop()
    print("----------------------------")
    print("[INFO] Elapsed time: {:.2f}".format(fps.elapsed()))
    print("[INFO] Approx. FPS: {:.2f}".format(fps.fps()))


@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
