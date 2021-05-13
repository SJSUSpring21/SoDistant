import smtplib, ssl


def send(mail):
    EMAIL = "#"
    PASS = "#"
    PORT = 465
    server = smtplib.SMTP_SSL('smtp.gmail.com', PORT)
    server = smtplib.SMTP_SSL('smtp.gmail.com', PORT)
    server.login(EMAIL, PASS)
    SUBJECT = 'ALERT!'
    TEXT = f'Social distancing violations exceeded!'
    message = 'Subject: {}\n\n{}'.format(SUBJECT, TEXT)
    server.sendmail(EMAIL, mail, message)
    server.quit()
