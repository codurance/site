#!/bin/bash
# Script generated with: http://getoptgenerator.dafuer.es/

# Define help function
function help(){
    echo "deploy_prb";
    echo "Usage example:";
    echo "deploy-prb (-o|--REPO_OWNER) string (-n|--REPO_NAME) string (-g|--GITHUB_TOKEN) string (-d|--DEPLOYMENT_URL) string [(-h|--HELP)] [(-p|--PR_NUMBER) string]";
    echo "Options:";
    echo "-h or --HELP: Displays this information.";
    echo "-o or --REPO_OWNER string: Repository owner. Required.";
    echo "-n or --REPO_NAME string: Repository name. Required.";
    echo "-p or --PR_NUMBER string: Pull requeset number.";
    echo "-g or --GITHUB_TOKEN string: Github token. Required.";
    echo "-d or --DEPLOYMENT_URL string: Deployment url. Required.";
    exit 1;
}
 
# Declare vars. Flags initalizing to 0.
 
# Execute getopt
ARGS=$(getopt -o "ho:n:p:g:d:" -l "HELP,REPO_OWNER:,REPO_NAME:,PR_NUMBER:,GITHUB_TOKEN:,DEPLOYMENT_URL:" -n "deploy_prb" -- "$@");
 
#Bad arguments
if [ $? -ne 0 ];
then
    help;
fi
 
eval set -- "$ARGS";
 
while true; do
    case "$1" in
        -h|--HELP)
            shift;
            help;
            ;;
        -o|--REPO_OWNER)
            shift;
                    if [ -n "$1" ]; 
                    then
                        REPO_OWNER="$1";
                        shift;
                    fi
            ;;
        -n|--REPO_NAME)
            shift;
                    if [ -n "$1" ]; 
                    then
                        REPO_NAME="$1";
                        shift;
                    fi
            ;;
        -p|--PR_NUMBER)
            shift;
                    if [ -n "$1" ]; 
                    then
                        PR_NUMBER="$1";
                        shift;
                    fi
            ;;
        -g|--GITHUB_TOKEN)
            shift;
                    if [ -n "$1" ]; 
                    then
                        GITHUB_TOKEN="$1";
                        shift;
                    fi
            ;;
        -d|--DEPLOYMENT_URL)
            shift;
                    if [ -n "$1" ]; 
                    then
                        DEPLOYMENT_URL="$1";
                        shift;
                    fi
            ;;
 
        --)
            shift;
            break;
            ;;
    esac
done
 
if [ -z "$REPO_OWNER" ]
then
    echo "REPO_OWNER is required";
    help;
fi
 
if [ -z "$REPO_NAME" ]
then
    echo "REPO_NAME is required";
    help;
fi
 
if [ -z "$GITHUB_TOKEN" ]
then
    echo "GITHUB_TOKEN is required";
    help;
fi
 
if [ -z "$DEPLOYMENT_URL" ]
then
    echo "DEPLOYMENT_URL is required";
    help;
fi
