import tornado.web
import tornado.wsgi
import tornado.ioloop
import os
from jinja2 import \
    Environment, PackageLoader, select_autoescape

ENV = Environment(
    loader=PackageLoader('portfolio', 'templates'),
    autoescape=select_autoescape(['html', 'xml'])
)

class TemplateHandler(tornado.web.RequestHandler):
    def render_template (self, tpl, context):
        template = ENV.get_template(tpl)
        self.write(template.render(**context))

class MainHandler(TemplateHandler):
    def get(self):
        self.render_template("index.html", {})

def webApp():
    return tornado.web.Application([
        (r"/", MainHandler),
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