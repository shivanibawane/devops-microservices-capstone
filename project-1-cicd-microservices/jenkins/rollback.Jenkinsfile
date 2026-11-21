pipeline {
    agent any

    parameters {
        choice(name: 'TARGET_ENVIRONMENT', choices: ['staging', 'production', 'dev'], description: 'Select environment to rollback')
        string(name: 'ROLLBACK_IMAGE_TAG', defaultValue: '', description: 'Specific previous Docker image tag to rollback to (e.g., 42-a1b2c3d)')
        string(name: 'ROLLBACK_REASON', defaultValue: 'Critical incident recovery', description: 'Justification for rollback')
    }

    environment {
        DOCKER_IMAGE_REPO = 'devopsstudent/capstone-store'
        ANSIBLE_VAULT_PASSWORD_ID = 'ansible-vault-secret'
    }

    stages {
        stage('Validate Inputs') {
            steps {
                script {
                    if (!params.ROLLBACK_IMAGE_TAG) {
                        error "You must provide a valid ROLLBACK_IMAGE_TAG!"
                    }
                    echo "Initiating emergency rollback for [${params.TARGET_ENVIRONMENT}] to tag [${params.ROLLBACK_IMAGE_TAG}]..."
                    echo "Reason: ${params.ROLLBACK_REASON}"
                }
            }
        }

        stage('Execute Rollback') {
            steps {
                dir('project-1-cicd-microservices/ansible') {
                    withCredentials([string(credentialsId: ANSIBLE_VAULT_PASSWORD_ID, variable: 'VAULT_PASS')]) {
                        sh """
                            ansible-playbook -i inventories/${params.TARGET_ENVIRONMENT}.ini deploy.yml \
                                -e "image_tag=${params.ROLLBACK_IMAGE_TAG} docker_repo=${DOCKER_IMAGE_REPO}" \
                                --vault-password-file <(echo "${VAULT_PASS}")
                        """
                    }
                }
            }
        }

        stage('Post-Rollback Health Verification') {
            steps {
                script {
                    echo "Checking health endpoints after rollback..."
                    // In real environment: curl -f http://${TARGET_HOST}/health
                }
            }
        }
    }

    post {
        success {
            echo "ROLLBACK COMPLETE: ${params.TARGET_ENVIRONMENT} rolled back to ${params.ROLLBACK_IMAGE_TAG} successfully."
        }
        failure {
            echo "ROLLBACK FAILED: Alerting team immediately!"
        }
    }
}
