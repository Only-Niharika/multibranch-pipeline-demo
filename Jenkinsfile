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
                    // Add your build commands here
                    // e.g., sh 'npm install && npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    def branch = env.GIT_BRANCH?.replaceAll('origin/', '').trim()
                    echo "Running tests for branch: ${branch}"
                    // Add your test commands here
                    // e.g., sh 'npm test'
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
                            sudo rm -rf /var/www/main/*
                            sudo cp -r * /var/www/main/
                        '''
                        echo 'Main branch deployed successfully!'
                    }
                    else if (branch == 'dev') {
                        echo 'Deploying to DEV environment...'
                        sh '''
                            sudo rm -rf /var/www/dev/*
                            sudo cp -r * /var/www/dev/
                        '''
                        echo 'Dev branch deployed successfully!'
                    }
                    else if (branch == 'feature') {
                        echo 'Deploying to FEATURE environment...'
                        sh '''
                            sudo rm -rf /var/www/feature/*
                            sudo cp -r * /var/www/feature/
                        '''
                        echo 'Feature branch deployed successfully!'
                    }
                    else {
                        echo "Branch '${branch}' is not configured for deployment. Skipping."
                    }
                }
            }
        }

        stage('Notify') {
            steps {
                script {
                    def branch = env.GIT_BRANCH?.replaceAll('origin/', '').trim()
                    echo "Pipeline completed for branch: ${branch}"
                    // Add Slack/email notifications here
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded for branch: ${env.GIT_BRANCH}"
        }
        failure {
            echo "Pipeline FAILED for branch: ${env.GIT_BRANCH}"
        }
        always {
            echo "Pipeline finished. Branch: ${env.GIT_BRANCH}"
        }
    }
}
