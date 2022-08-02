const { Plugin } = require('powercord/entities')
const { React } = require('powercord/webpack')
const Settings = require('./src/Components/Settings.jsx')

const DefaultBackgroundLink = 'https://cdn.discordapp.com/attachments/883435300880261120/1003962526662410300/Dawn---hu.webm';

module.exports = class VideoBackgrounds extends Plugin 
{
    async startPlugin() 
	{

        powercord.api.settings.registerSettings(this.entityID, 
        {
            category: this.entityID, 
            label: 'Video Background', 
            render: props => React.createElement(Settings, {
				...props,
				DefaultBackgroundLink,
				plugin: this
			})
        });

		if (this.settings.get('UseVideoBackground', true) === true)
		{
			// Why does powercord make their loadStylesheet function not return the id ;-;
			if (this.settings.get('FlipVideoBackground', false) === true)
				this.loadStylesheet('./src/CSS/video-background-flipped.scss');
				
			this.loadStylesheet('./src/CSS/video-background.scss') // Unload is handled by Powercord apparently.
			this.BackgroundSection = document.createElement('div');
			this.BackgroundSection.id = this.entityID
			document.body.appendChild(this.BackgroundSection);
			this.SetVideoBackground();
		}
    }

	async SetVideoBackground()
	{
		let videoLink = this.settings.get('VideoBackgroundLink', DefaultBackgroundLink);
		this.VideoSection = document.createElement('video');
		this.VideoSection.setAttribute('class', 'background-video');

		this.BackgroundSection.appendChild(this.VideoSection);
		
		this.VideoSection.autoplay = true;
		this.VideoSection.muted = true;
		this.VideoSection.loop = true;
		this.VideoSection.playsInline = true;

		this.VideoSource = document.createElement('source');
		this.VideoSource.setAttribute('src', videoLink);

		this.VideoSection.appendChild(this.VideoSource);
	}

    async pluginWillUnload() 
	{
		powercord.api.settings.unregisterSettings(this.entityID);
		document.getElementById(this.entityID)?.remove();
    }
}
