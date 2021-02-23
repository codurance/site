set -e

function cleanup {
  docker-compose down -v
}

function waitForWebsiteToStart {
  attempt_counter=0
  max_attempts=120

  printf 'Visual regression tests are waiting for the website to start'

  until [ "$(hasWebsiteFinishedBuilding)" = "true" ]; do
      if [ ${attempt_counter} -eq ${max_attempts} ];then
        echo "Website is taking too long to start, or has failed to start."
        exit 1
      fi

      printf '.'
      attempt_counter=$(($attempt_counter+1))
      sleep 5
  done

  printf ' website started!'
}

function hasWebsiteFinishedBuilding {
  numberOfSuccesses=$(docker-compose logs site | grep -o "Build complete" | wc -l | tr -d ' ')
  if [ "$numberOfSuccesses" = "2" ]; then echo 'true'; else echo 'false'; fi
}

trap cleanup EXIT

function runBackstopCommand {
  command=$1

  cleanup
  docker-compose build visual_regression_tests
  docker-compose up -d site
  waitForWebsiteToStart
  
  docker-compose run visual_regression_tests $command
}
