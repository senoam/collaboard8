FROM postgres

COPY . /docker-entrypoint-initdb.d/temp/

RUN chmod +x /docker-entrypoint-initdb.d/temp/ordering.sh

RUN sed -i -e 's/\r$//' /docker-entrypoint-initdb.d/temp/ordering.sh

RUN /docker-entrypoint-initdb.d/temp/ordering.sh

RUN rm -rf /docker-entrypoint-initdb.d/temp