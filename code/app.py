import config
from mail import Mailer
from detect import detect_people
from imutils.video import VideoStream, FPS
from scipy.spatial import distance as dist
import numpy as np
import argparse, imutils, cv2, os, time

parser = argparse.ArgumentParser()
parser.add_argument("-i", "--input", type=str, default="", help="path to (optional) input video file")
parser.add_argument("-o", "--output", type=str, default="", help="path to (optional) output video file")
args = parser.parse_args()

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

if not args.input:
    print("[INFO] Starting the live stream...")
    cap = cv2.VideoCapture(config.URL)
else:
    print("[INFO] Starting the video...")
    cap = cv2.VideoCapture(config.VIDEO_PATH + args.input)

inputFps = cap.get(cv2.CAP_PROP_FPS)
writer = None
fps = FPS().start()

while cv2.waitKey(1) != 27:
    (success, frame) = cap.read()
    if not success:
        break

    frame = imutils.resize(frame, width=700, height=700)
    results = detect_people(frame, net, ln, personIdx=LABELS.index("person"))
    violation = set()

    if len(results) >= 2:
        centroids = np.array([r[2] for r in results])
        D = dist.cdist(centroids, centroids, metric="euclidean")

        for i in range(0, D.shape[0]):
            for j in range(i + 1, D.shape[1]):
                if D[i, j] < config.MIN_DISTANCE:
                    violation.add(i)
                    violation.add(j)

    for (i, (prob, bbox, centroid)) in enumerate(results):
        (startX, startY, endX, endY) = bbox
        (cX, cY) = centroid
        color = (0, 255, 0)
        if i in violation:
            color = (0, 0, 255)
        cv2.rectangle(frame, (startX, startY), (endX, endY), color, 1)
        cv2.circle(frame, (cX, cY), 1, color, 1)

    if config.DISPLAY:
        Safe_Distance = "Safe distance: >{} px".format(config.MIN_DISTANCE)
        cv2.putText(frame, Safe_Distance, (470, frame.shape[0] - 25), font, 0.60, (255, 0, 0), 1)
        Threshold = "Threshold limit: {}".format(config.THRESHOLD)
        cv2.putText(frame, Threshold, (470, frame.shape[0] - 50), font, 0.60, (255, 0, 0), 1)
        text = "Total violations: {}".format(len(violation))
        cv2.putText(frame, text, (10, frame.shape[0] - 25), font, 0.60, (0, 0, 255), 1)

    if len(violation) >= config.THRESHOLD:
        if config.DISPLAY:
            cv2.putText(frame, "*ALERT: Violations over limit*", (10, frame.shape[0] - 50), font, 0.60, (0, 0, 255), 1)
        if config.ALERT:
            print('[INFO] Sending mail...')
            Mailer().send(config.MAIL)
            print('[INFO] Mail sent')

    cv2.imshow("Real-Time Monitoring/Analysis Window", frame)
    fps.update()

    if args.output != "" and writer is None:
        outputFile = config.VIDEO_PATH + "output/" + args.output
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        writer = cv2.VideoWriter(outputFile, fourcc, 20,
                                 (frame.shape[1], frame.shape[0]), True)
    if writer is not None:
        writer.write(frame)

fps.stop()
print("----------------------------")
print("[INFO] Elapsed time: {:.2f}".format(fps.elapsed()))
print("[INFO] Approx. FPS: {:.2f}".format(fps.fps()))

cv2.destroyAllWindows()
