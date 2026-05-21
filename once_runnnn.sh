docker run -d -p 5000:5000 --name registry registry:latest

docker tag once_minji:latest localhost:5000/once_minji:latest

docker push localhost:5000/once_minji:latest

docker rm -f registry

docker run -d -p 5000:5000 --name registry registry:latest
## localhost:5000/once_minji:latest
# if need to use :latest use --no-cache

docker build --no-cache -t once_minji:latest .
docker tag once_minji:latest localhost:5000/once_minji:latest
docker push localhost:5000/once_minji:latest