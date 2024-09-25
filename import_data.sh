#!/bin/bash

# Espera a que la base de datos esté lista (por ejemplo, usando pg_isready)
until pg_isready --host=$POSTGRES_HOST --port=$POSTGRES_PORT --username=$POSTGRES_USER; do
  echo "Esperando a que PostgreSQL esté listo..."
  sleep 2
done

# Ejecuta el archivo SQL para cargar los datos
psql postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB -f datasets/load.sql

echo "you fuck it up..."