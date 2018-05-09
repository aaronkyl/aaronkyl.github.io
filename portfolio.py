import tornado.web
import tornado.wsgi
import tornado.ioloop
import os
import boto3
from jinja2 import \
    Environment, PackageLoader, select_autoescape

ENV = Environment(
    loader=PackageLoader('portfolio', 'templates'),
    autoescape=select_autoescape(['html', 'xml'])
)

client = boto3.client(
  'ses',
  aws_access_key_id=os.environ.get('AWS_ACCESS_KEY'),
  aws_secret_access_key=os.environ.get('AWS_SECRET_KEY'),
  region_name='us-east-1'
)

class TemplateHandler(tornado.web.RequestHandler):
    def render_template (self, tpl, context):
        template = ENV.get_template(tpl)
        self.write(template.render(**context))

class MainHandler(TemplateHandler):
    def get(self):
        self.render_template("index.html", {})
        
class MailHandler(TemplateHandler):
    def post(self):
        name = self.get_argument("name")
        email = self.get_argument("email")
        message = self.get_argument("message")
        send_email(name, email, message)

def send_email(sender_name, sender_email, message):
    client.send_email(
        Destination={
            'ToAddresses': ['aaronwilkinson@gmail.com'],
        },
        Message={
            'Body': {
                'Text': {
                    'Charset': 'UTF-8',
                    'Data': "Name: {} \n\n Email: {} \n\n Message: {}".format(sender_name, sender_email, message),
                },
            },
            'Subject': {'Charset': 'UTF-8', 'Data': 'Portfolio Contact Message'},
        },
        Source='aaronwilkinson@gmail.com',
    )

def webApp():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/contact", MailHandler),
        (r"/static/(.*)", 
            tornado.web.StaticFileHandler, {'path': 'static'}),
        ], autoreload=True)

# Wrapping the Tornado Application into a WSGI interface
# As per AWS EB requirements, the WSGI interface must be named
# 'application' only
application = tornado.wsgi.WSGIAdapter(webApp)

if __name__ == '__main__':
    tornado.log.enable_pretty_logging()
    app = webApp()
    PORT = int(os.environ.get('PORT', '8080'))
    app.listen(PORT)
    tornado.ioloop.IOLoop.current().start()