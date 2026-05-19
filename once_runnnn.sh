docker run -d -p 5000:5000 --name registry registry:latest

docker tag once_minji:latest localhost:5000/once_minji:latest

docker push localhost:5000/once_minji:latest


## localhost:5000/once_minji:latest