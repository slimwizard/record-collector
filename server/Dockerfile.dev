FROM tiangolo/uwsgi-nginx:python3.6-alpine3.8
COPY . /app
WORKDIR /app
RUN pip3 install -r requirements.txt
ENTRYPOINT ["python3"]
CMD ["-u","app.py"]