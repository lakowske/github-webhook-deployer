github-webhook-deployer deploys branch changes using github push events.

1. When a push event occurs, the current directory's branch is compared to the push event branch.
2. If they are the same, git pull is called and the server process terminates.
3. The server process restarts using forever (or an equivelent daemon manager).
4. Deployment is complete and you are running the latest code.

For example, somewhere in the cloud there are two copies of a server, production and development.
The production branch is checked out in ~/production and the development branch in ~/development.
Both servers are started using the daemon manager forever.

Now a developer wants to make some changes to the code.  The developer does a checkout of the development
branch on his local laptop/workstation, runs the server locally and makes some changes.  The developer can then
push his/her changes to github.  Github webhooks broadcast his/her change event to the production and development servers in the cloud.  
The development server sees the update, pulls in the changes and restarts.  The developer can now test the changes on development server 
in the cloud. Once satisfied, he/she can merge the changes into the production branch. When the production branch is pushed another push
event and this time the production server sees the update, pulls in the changes and restarts.  SSHing into the server, git pulling, 
and restarting the server has been avoided and all is well.