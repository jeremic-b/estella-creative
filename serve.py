#!/usr/bin/env python3
"""Tiny static server for the Estella site (threaded, so the videos stream fine).

Sends no-store headers for HTML/CSS/JS so the browser always loads the latest
code (no more "Chrome isn't updating"); images and videos still cache normally
so reloads stay fast.

Run:  python3 serve.py     then open http://localhost:8000
"""
import functools
import http.server
import os

PORT = int(os.environ.get("PORT", "8000"))
DIR = os.path.dirname(os.path.abspath(__file__))


class DevHandler(http.server.SimpleHTTPRequestHandler):
    """Disable caching for code files so edits show up on a plain reload."""

    def end_headers(self):
        path = self.path.split("?")[0]
        if path.endswith((".html", ".css", ".js")) or path.endswith("/"):
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
        super().end_headers()


Handler = functools.partial(DevHandler, directory=DIR)
http.server.ThreadingHTTPServer.allow_reuse_address = True

with http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler) as httpd:
    print(f"Estella → http://localhost:{PORT}  (Ctrl+C to stop)")
    httpd.serve_forever()
