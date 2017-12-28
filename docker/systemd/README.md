## Systemd Files

These files expect this repo checkout out to /opt/ecosml-webapp.  Then symlink to ```/etc/systemd/system```

Next, tell systemd to start on boot

```
> sudo systemctl enable ecosml.service
```

Then

```bash
> sudo service [start|stop] ecosml
```