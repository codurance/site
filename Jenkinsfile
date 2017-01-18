node('master') {

  setBuildStatus('Building...', 'PENDING');

  try {

    stage('Checkout') {
      checkout scm
    }

    stage('Build') {
      sh '''#!/bin/bash -l
        source ~/.bashrc
        _utility/build_site.sh'''
        setBuildStatus('Build Ok, deploying...', 'PENDING');
    }

    stage('Deploy') {
      BRANCH_NAME=sh(script: 'git describe --all --exact-match 2>/dev/null | sed \'s=.*/==\'', returnStdout: true).trim()
        AWS_REGION='eu-west-1'
        WEBSITE_INDEX='index.html'
        BUCKET_NAME=sh(script: "_utility/normalize_bucket_name.sh site-$BRANCH_NAME", returnStdout: true).trim()
        sh "_utility/deploy_prb.sh $AWS_REGION $WEBSITE_INDEX $BUCKET_NAME"

        PREVIEW_SITE_URL="https://${BUCKET_NAME}.s3.amazonaws.com/$WEBSITE_INDEX"
        SHORTEN_URL=sh(script: "_utility/shorten_url.sh $PREVIEW_SITE_URL", returnStdout: true).trim()
        setBuildStatus("Deployed: $SHORTEN_URL", 'SUCCESS');
    }

  } catch (e) {
    setBuildStatus("Error while building", "UNSTABLE");
    throw e;
  }

}

void setBuildStatus(String message, String state) {
  step([
      $class: 'GitHubCommitStatusSetter',
      contextSource: [$class: 'ManuallyEnteredCommitContextSource', context: 'Jenkins'],
      errorHandlers: [[$class: 'ChangingBuildStatusErrorHandler', result: 'UNSTABLE']],
      statusResultSource: [$class: 'ConditionalStatusResultSource', results: [[$class: 'AnyBuildResult', message: message, state: state]]]
  ]);
}
