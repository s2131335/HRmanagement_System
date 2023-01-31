# System Deployment and Setup

<!-- StackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!** -->

## Dependencies
#### NodeJs v18.6.0+

To install:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

// To check version:
node --version
```

#### PDFtk

To install:
```bash
sudo add-apt-repository ppa:malteworld/ppa
sudo apt update
sudo apt install pdftk
```  
#### git

To install:
```bash
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git
```

## Deployment
1. *Download source code from remote repository*
	```bash
	git clone https://yourRemoteRepo.git
	```
2. *Setup mongodb*  
   1. Register an account on https://cloud.mongodb.com/  
   2. After registration, it will bring you to the "Create New Cluster" page. Follow the instructions, and click the "Create Cluster" button.  
   <img src="mongo4.png" width="60%">  
    
   3. Click the "database" tab on the nav bar, then click "Connect", finally click "Connect your application"
   <img src="mongo2.png" width="60%">  
   4. Copy the uri, fill in the password. It will be useful for the next step.  
   <img src="mongo3.png" width="60%">  
	
3. *Create `.env` file in `yourpath/hr_app/`*  
	```bash
	touch .env
	vim .env
	```
	In `.env`:
	```bash
	URI=Your_MongoDb_URI
	SENDER_EMAIL=Your_Email_account
	SENDER_PASSWORD=Your_Email_Password
   EMAIL_HOST=your_Email_host # if not set, default is 'smtp.gmail.com'
   EMAIL_PORT=your_Email_port # if not set, default is '587'
	PORT=Port_you_want_to_run_at # if not set, default port is 8080, make sure to enable port 8080 on your server
	DOMAIN=Domain_of_Server
	ADMIN_PW=YOUR_PASSWORD	# The password need to be 8 chars or longer. # if not set, the default password is notadmin123
	```
	Please note that whenever the ".env" file is modified, the server need to be restarted manually to apply the changes.
4. *Install node modules:*  
	```bash
	cd yourpath/hr_app
	sudo apt-get install build-essential
	npm i
	```
5. *Start the server (simple but unstable)*  
	```bash
	npm start
	```
6. *A more stable way to start the server (Optional)*  
   ```bash
   cd /etc/systemd/system
   touch hrsystem.service # can replace by your own service name
   ```
   fill the following information in the hrsystem.service:
   ```bash
   [Unit]
   Description=hr_app  # description
   After=multi-user.target  
   [Service]
   ExecStart=sudo /usr/bin/node /home/ubuntu/HRManagementSystem/hr_app/bin/www  # command to start the server
   Restart=always  # restart the server when crashed  
   RestartSec=10  # restart timeout  
   StandardOutput=syslog  # system log name  
   StandardError=syslog  # system log name  
   SyslogIdentifier=hr_app  
   User=ubuntu  # username  
   EnvironmentFile=/home/ubuntu/HRManagementSystem/hr_app/.env  # path of the environment file  
   [Install]  
   WantedBy=multi-user.target  
   ```
   Make sure not to copy the comments  
   After that: 
   ```bash
   sudo systemctl start hrsystem.service # start the server
   ```
7. *Generate documentation (optional)*  
   Go to `yourpath/hr_app/`, then run the following command:  
   ```bash
   npm run publish
   ```   
   to generate documentation under the `yourpath/hr_app/public` folder. Then the documentation can be access by `http://YOUR_DOMAIN/documentation/index.html`

## System Initialization
1. On the server, use `ls -l /etc/localtime` to make sure the time zone is `Asia/Hong_Kong`. If not, `sudo timedatectl set-timezone Asia/Hong_Kong` to set the timezone to Hong Kong.
2. Use `http://YOUR_DOMAIN/testing/createAdmin` to create a new Admin account.
   ```
   credential:
   account: admin
   password: notadmin123 or YOUR_DEFAULT_PASSWORD
   ```
3. Use `http://YOUR_DOMAIN/aptest/ImportExcel` to initialize the apt test database

## Customization
1. Logo file is on `public/image/logo.png`. Replace this file with your own Logo (max height 512 px). 
   


