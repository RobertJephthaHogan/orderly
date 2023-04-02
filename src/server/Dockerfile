FROM python:3.9-alpine

WORKDIR /server
COPY ./app /server/app
COPY ./main.py /server
COPY ./requirements.txt /server
COPY .env /server

# Install native libraries, required for numpy
RUN apk --no-cache add musl-dev linux-headers g++

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["python", "main.py"]