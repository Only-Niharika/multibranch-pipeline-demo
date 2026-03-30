# Jenkins Multistage Pipeline with Branch-wise Deployment

This is one of my DevOps projects where I set up a Jenkins pipeline that deploys code to different environments based on the Git branch. Each branch gets its own server directory and runs on a separate port using Apache Virtual Hosts on an AWS EC2 instance.

---

## What this project does

Whenever a change is pushed to any of the three branches, Jenkins picks it up and deploys the code to its corresponding environment on the server — no manual copying, no SSH-ing into the server every time.

| Branch | Environment | Port |
|--------|-------------|------|
| main | Production | 8081 |
| dev | Development | 8082 |
| feature | Feature Testing | 8083 |

---

## Screenshots

### GitHub Repository
![GitHub Repo](/git_repo.png)

### Jenkins Pipeline Stage View
![Jenkins](/jenkins.png)

### Production — main branch (Port 8081)
![Production](/production.png)

### Development — dev branch (Port 8082)
![Development](/development.png)

### Feature — feature branch (Port 8083)
![Feature](/feature.png)

---

## Tools used

- Jenkins — for the CI/CD pipeline
- GitHub — to manage the three branches
- AWS EC2 (Ubuntu) — the server where everything gets deployed
- Apache2 — to serve each branch on its own port
- Groovy — for writing the Jenkinsfile
- Shell scripting — for the actual deployment commands

---

## Project structure

All three branches have the same four files. The content and styling differ per branch so you can visually tell which environment you are looking at.

`
repo/
|-- index.html
|-- style.css
|-- app.js
|-- Jenkinsfile
`

The Jenkinsfile is identical across branches. Jenkins figures out which branch triggered the build using `env.GIT_BRANCH` and runs the correct deploy block.

---

## How the pipeline works

There are five stages in the pipeline:

1. **Clean** — wipes the old workspace using `cleanWs()`
2. **Checkout** — pulls the latest code from the correct branch
3. **Build** — logs the branch name (can be extended for actual builds)
4. **Test** — logs the branch name (can be extended for tests)
5. **Deploy** — copies files to the right folder on the server

---

## Server setup

Everything runs on a single EC2 instance. Here is what I set up on the server before running any pipeline:

 
# Create the three deployment folders
sudo mkdir -p /var/www/myapp/main
sudo mkdir -p /var/www/myapp/dev
sudo mkdir -p /var/www/myapp/feature

# Jenkins needs permission to write to these folders
sudo chown -R jenkins:jenkins /var/www/myapp

# Allow Jenkins to run sudo commands without a password prompt
sudo visudo
# Add at the bottom: jenkins ALL=(ALL) NOPASSWD: ALL


---

## Apache Virtual Hosts

By default Apache serves everything from `/var/www/html`. I changed this so each folder runs on its own port.

First, added the ports in `/etc/apache2/ports.conf`:

`
Listen 80
Listen 8081
Listen 8082
Listen 8083
`

Then created a config file for each branch:

`
# /etc/apache2/sites-available/main.conf
<VirtualHost *:8081>
    DocumentRoot /var/www/myapp/main
    <Directory /var/www/myapp/main>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

# /etc/apache2/sites-available/dev.conf
<VirtualHost *:8082>
    DocumentRoot /var/www/myapp/dev
    <Directory /var/www/myapp/dev>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

# /etc/apache2/sites-available/feature.conf
<VirtualHost *:8083>
    DocumentRoot /var/www/myapp/feature
    <Directory /var/www/myapp/feature>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
`

Enabled the sites and restarted Apache:

`
sudo a2ensite main.conf dev.conf feature.conf
sudo systemctl restart apache2
`

Also opened ports 8081, 8082, 8083 in the AWS Security Group inbound rules.

---

## Jenkins job setup

I created three separate Pipeline jobs in Jenkins — one for each branch. Using a regular Pipeline job instead of Multibranch because `env.GIT_BRANCH` works correctly here whereas `env.BRANCH_NAME` was returning null in my Multibranch setup.

For each job the configuration is:

`
Definition  : Pipeline script from SCM
SCM         : Git
Repo URL    : https://github.com/Only-Niharika/multibranch-pipeline-demo.git
Branch      : */main   (change to */dev and */feature for the other two jobs)
Script Path : Jenkinsfile
`

---

## Author

Niharika Karkra — DevOps student, currently learning Jenkins, AWS, and Linux.

[GitHub](https://github.com/Only-Niharika) | [LinkedIn](https://www.linkedin.com/in/YOUR_LINKEDIN)
