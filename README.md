# emcee

A very simple way to temporarily patch your /etc/hosts file by way of a local `Hostsfile`.

To use:

```
npm install -g @kevboh/emcee
echo "127.0.0.1 mycoolsite.online" > Hostsfile
sudo emcee # You probably need sudo here, sorry.
```

I made this in like five minutes, feel free to PR suggestions!
