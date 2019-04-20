FROM tiangolo/meinheld-gunicorn:python3.7
LABEL maintainer="Royston Yinkore <roystonyinkore@gmail.com>"

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY ./app /reform-api/app
WORKDIR /reform-api

CMD [ "python", "-m", "flask", "run", "--host=0.0.0.0" ]