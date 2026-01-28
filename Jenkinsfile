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
                docker build -t form .
            }
        }
        stage('Test'){
            steps{
                echo 'Testing..'
            }
        }
        stage('Deploy'){
            steps{
                docker run -d \
                -p 3000:3000 \
                --name form form \
                -e DB_HOST=localhost \
                -e DB_USER=root \
                -e DB_PASS=password \
                -e DB_NAME=formdb \
                
            }
        }
    }
}