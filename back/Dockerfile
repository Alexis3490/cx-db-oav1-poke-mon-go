FROM node:latest
# Create app directory
WORKDIR /usr/src/app
# Copy file and Install app dependencies
COPY . ./
RUN yarn install
#Expose port and start application
CMD [ "yarn", "start" ]