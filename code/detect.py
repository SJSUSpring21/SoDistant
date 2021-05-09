from flask import current_app as app
import numpy as np
import cv2
from scipy.spatial import distance as dist
from mail import send
import threading


def detect_people(frame, net, ln, personIdx=0):
    (H, W) = frame.shape[:2]
    results = []

    blob = cv2.dnn.blobFromImage(frame, 1 / 255.0, (app.config['CV_INP_WIDTH'], app.config['CV_INP_HEIGHT']), (0, 0, 0), swapRB=True, crop=False)
    net.setInput(blob)
    layerOutputs = net.forward(ln)

    boxes = []
    centroids = []
    confidences = []

    for output in layerOutputs:
        for detection in output:
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]

            if classID == personIdx and confidence > app.config['MIN_CONF']:
                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype("int")
                x = int(centerX - (width / 2))
                y = int(centerY - (height / 2))

                boxes.append([x, y, int(width), int(height)])
                centroids.append((centerX, centerY))
                confidences.append(float(confidence))

    idxs = cv2.dnn.NMSBoxes(boxes, confidences, app.config['MIN_CONF'], app.config['NMS_THRESH'])

    if len(idxs) > 0:
        for i in idxs.flatten():
            x, y, w, h = boxes[i]
            r = (confidences[i], (x, y, x + w, y + h), centroids[i])
            results.append(r)

    return results, len(idxs)


def draw_people(frame, results):
    violations = set()

    if len(results) >= 2:
        centroids = np.array([r[2] for r in results])
        D = dist.cdist(centroids, centroids, metric="euclidean")

        for i in range(0, D.shape[0]):
            for j in range(i + 1, D.shape[1]):
                if D[i, j] < app.config['MIN_DISTANCE']:
                    violations.add(i)
                    violations.add(j)
                    cv2.line(frame, (centroids[i][0], centroids[i][1]), (centroids[j][0], centroids[j][1]), (0, 0, 255), 1)

    for (i, (prob, bbox, centroid)) in enumerate(results):
        (startX, startY, endX, endY) = bbox
        (cX, cY) = centroid
        color = (0, 255, 0)
        if i in violations:
            color = (0, 0, 255)
        cv2.rectangle(frame, (startX, startY), (endX, endY), color, 1)
        cv2.circle(frame, (cX, cY), 1, color, 2)

    return violations


def draw_metrics(frame, violations, no_of_people, mailSent):
    font = cv2.FONT_HERSHEY_SIMPLEX
    if app.config['DISPLAY']:
        safe_distance_text = "Safe distance: >{} px".format(app.config['MIN_DISTANCE'])
        cv2.putText(frame, safe_distance_text, (470, frame.shape[0] - 25), font, 0.60, (255, 0, 0), 1)
        threshold_text = "Threshold limit: {}".format(app.config['THRESHOLD'])
        cv2.putText(frame, threshold_text, (470, frame.shape[0] - 50), font, 0.60, (255, 0, 0), 1)
        violations_text = "Total violations: {}".format(len(violations))
        cv2.putText(frame, violations_text, (10, frame.shape[0] - 25), font, 0.60, (0, 0, 255), 1)
        total_people_text = "Total people: {}".format(no_of_people)
        cv2.putText(frame, total_people_text, (470, frame.shape[0] - 75), cv2.FONT_HERSHEY_SIMPLEX, 0.60, (0, 0, 0), 1)

    if len(violations) >= app.config['THRESHOLD']:
        if app.config['DISPLAY']:
            cv2.putText(frame, "*ALERT: Violations over limit*", (10, frame.shape[0] - 50), font, 0.60, (0, 0, 255), 1)
        if app.config['ALERT'] is True and mailSent is not True:
            print('[INFO] Sending mail...')
            threading.Thread(target=send, args=(app.config['MAIL'],)).start()
            return True

    return False
