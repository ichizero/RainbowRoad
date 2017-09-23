FROM ubuntu:16.04
MAINTAINER Akihiko Horiuchi <a.horiuchi@ntt.com>

RUN sed -i -e 's/archive\.ubuntu\.com/ftp\.jaist\.ac\.jp/g' /etc/apt/sources.list && \
    apt-get update && \
    apt-get -y upgrade && \
    apt-get -y install software-properties-common

RUN apt-add-repository -y ppa:nginx/stable && \
    apt-get update && \
    apt-get -y install nginx

RUN ln -fs /dev/stdout /var/log/nginx/access.log && \
    ln -fs /dev/stderr /var/log/nginx/error.log

RUN apt-get -y autoremove && \
    apt-get clean && \
    rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir /tmp/work

EXPOSE 80

ENV SKYWAY_KEY YOUR_API_KEY

COPY ./ /tmp/work

CMD echo "window.__SKYWAY_KEY__ = '${SKYWAY_KEY}';" > /tmp/work/script/key.js && cd /tmp/work && python3 -m http.server 80
