github-webhook-deployer deploys git branch changes using github webhook push events.

When a push event occurs, the current directory's branch is compared to the push event branch.
If they are the same, git pull is called and the server process terminates.
The server process restarts using forever (or an equivelent daemon manager).
Deployment is complete and you are running the latest code.

For example, somewhere in the cloud there are two copies of a server, production and development.
The production branch is checked out in ~/production and the development branch in ~/development.
Both servers are started using the daemon manager forever.

A developer wants to make some changes to the code.  The developer does a checkout of the development
branch on his local laptop/workstation, runs the server locally and makes some changes.  The developer can then
push his/her changes to github.  Through the magic of github webhooks and github-webhook-deployer,
his/her change event is broadcast out to the production and development servers in the cloud.  The development server
sees the update, pulls in the changes and restarts.  The developer can now test the changes in the cloud. Once the developer
is satisfied, he/she merges the changes into the production branch and pushes the production branch.  This triggers another push
event and this time the production server sees the update, pulls in the changes and restarts.  All is well, and
nobody had to ssh, git pull, and forever restart anything.