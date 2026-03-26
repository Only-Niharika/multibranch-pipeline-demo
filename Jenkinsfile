pipeline {
    agent any
    stages {
        stage('Clean') {
            steps {
                cleanWs()
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
                    echo "Building branch: ${env.BRANCH_NAME}"
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    echo "Running tests for branch: ${env.BRANCH_NAME}"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo "Deploying branch: ${env.BRANCH_NAME}"
                    if (env.BRANCH_NAME == 'main') {
                        sh '''
                            sudo rm -rf /var/www/myapp/main/*
                            sudo cp -r * /var/www/myapp/main/
                        '''
                        echo 'Main deployed successfully!'
                    }
                    else if (env.BRANCH_NAME == 'dev') {
                        sh '''
                            sudo rm -rf /var/www/myapp/dev/*
                            sudo cp -r * /var/www/myapp/dev/
                        '''
                        echo 'Dev deployed successfully!'
                    }
                    else if (env.BRANCH_NAME == 'feature') {
                        sh '''
                            sudo rm -rf /var/www/myapp/feature/*
                            sudo cp -r * /var/www/myapp/feature/
                        '''
                        echo 'Feature deployed successfully!'
                    }
                    else {
                        echo "Branch '${env.BRANCH_NAME}' not configured. Skipping."
                    }
                }
            }
        }
    }
    post {
        success { echo "Success: ${env.BRANCH_NAME}" }
        failure { echo "Failed: ${env.BRANCH_NAME}" }
    }
}
