pipeline{
    agent any
    stages{
        stage('Checkout'){
            steps{
                git 'https://github.com/Chaithanyababu04/form.git'
            }
        }
        stage('Build'){
            steps{
                sh 'docker build -t form .'
            }
        }
        stage('Test'){
            steps{
                echo 'Testing..'
            }
        }
        stage('Deploy'){
            environment {
             DB_HOST = credentials('db_host')
                DB_USER = credentials('db_user')
                DB_PASS = credentials('db_pass')
                DB_NAME = credentials('db_name')
            }
            steps {
                sh '''
                docker stop form || true
                docker rm form || true

                docker run -d \
                --name form \
                --link mysql:mysql \
                -e DB_HOST=$DB_HOST \
                -e DB_USER=$DB_USER \
                -e DB_PASS=$DB_PASS \
                -e DB_NAME=$DB_NAME \
                -p 3000:3000 \
                form
                '''
            }
        }
    }
}