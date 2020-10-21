# Steps for running project- FileBin

1. Initially Download the Project from Github link.
2. Go to the Project Directory and run command "npm i" to install packages.
3. Then enter "npm start" command in the terminal. It will start the backend server.
4. Again open another terminal and go the directory "client"  and  run command "npm i" to install packages inside client folder. 
5. Then again run the command "npm start" to start the react app.
6. After that upload file from local device less than 20MB and click on upload button. It will upload the file.
7. That file will be saved in the difi-prx-task/controllers/public/uploads.
8. A link will be shown in the fornt end main page to download the uploaded file. Copy that link.
9. Thereafter, go to browser and enter the given link in the url and press enter. The uploaded file will be downloaded.
10. When the file will be downloaded once for that user, it will not be downloaded again.

#steps to run test cases

1. run backend server in one terminal by "npm start" command
2. open another terminal and change directory to project directory and run command "npm test".
3. It will automatically run endpoint testcase implemented in it.

