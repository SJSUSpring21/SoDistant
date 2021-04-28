import config
from mail import Mailer
from detect import detect_people, draw_people, draw_metrics
from imutils.video import VideoStream, FPS
import argparse, imutils, cv2, os, time

parser = argparse.ArgumentParser()
parser.add_argument("-i", "--input", type=str, default="", help="path to (optional) input video file")
parser.add_argument("-o", "--output", type=str, default="", help="path to (optional) output video file")
args = parser.parse_args()

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

writer = None
fps = FPS().start()

while cv2.waitKey(1) != 27:
    (success, frame) = cap.read()
    if not success:
        break

    frame = imutils.resize(frame, width=700, height=700)
    results, no_of_people = detect_people(frame, net, ln, personIdx=LABELS.index("person"))
    violations = draw_people(frame, results)
    draw_metrics(frame, violations, no_of_people)

    cv2.imshow("Real-Time Monitoring/Analysis Window", frame)
    fps.update()

    if args.output != "" and writer is None:
        outputFile = config.VIDEO_PATH + "output/" + args.output
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        writer = cv2.VideoWriter(outputFile, fourcc, 25,
                                 (frame.shape[1], frame.shape[0]), True)
    if writer is not None:
        writer.write(frame)

fps.stop()
print("----------------------------")
print("[INFO] Elapsed time: {:.2f}".format(fps.elapsed()))
print("[INFO] Approx. FPS: {:.2f}".format(fps.fps()))

if args.output != "":
    writer.release()
cap.release()
cv2.destroyAllWindows()