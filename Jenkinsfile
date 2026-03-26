pipeline {
    agent any
    stages {
        stage('Clean') {
            steps {
                deleteDir()
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    def branch = env.GIT_BRANCH?.replaceAll('origin/', '').trim()
                    echo "Building branch: ${branch}"
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    def branch = env.GIT_BRANCH?.replaceAll('origin/', '').trim()
                    echo "Running tests for branch: ${branch}"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    def branch = env.GIT_BRANCH?.replaceAll('origin/', '').trim()
                    echo "Detected branch: ${branch}"
                    if (branch == 'main') {
                        echo 'Deploying to MAIN environment...'
                        sh '''
                            sudo rm -rf /var/www/myapp/main/*
                            sudo cp -r * /var/www/myapp/main/
                        '''
                        echo 'Main branch deployed successfully!'
                    }
                    else if (branch == 'dev') {
                        echo 'Deploying to DEV environment...'
                        sh '''
                            sudo rm -rf /var/www/myapp/dev/*
                            sudo cp -r * /var/www/myapp/dev/
                        '''
                        echo 'Dev branch deployed successfully!'
                    }
                    else if (branch == 'feature') {
                        echo 'Deploying to FEATURE environment...'
                        sh '''
                            sudo rm -rf /var/www/myapp/feature/*
                            sudo cp -r * /var/www/myapp/feature/
                        '''
                        echo 'Feature branch deployed successfully!'
                    }
                    else {
                        echo "Branch '${branch}' is not configured for deployment. Skipping."
                    }
                }
            }
        }
    }
    post {
        success { echo "Success: ${env.GIT_BRANCH}" }
        failure { echo "Failed: ${env.GIT_BRANCH}" }
    }
}
