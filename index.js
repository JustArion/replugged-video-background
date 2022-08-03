const { Plugin } = require('powercord/entities')
const { React } = require('powercord/webpack')
const Settings = require('./src/Components/Settings.jsx')

const DefaultBackgroundLink = 'https://universe.communitydragon.org/events/2021/arcane-nlex-hub-2021/videos/collection-jayce.webm';

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
		// this.VideoSection.muted = true;
		this.VideoSection.loop = true;
		this.SetVideoVolume(this.settings.get('VideoBackgroundVolume', 0) / 100);
		this.VideoSection.playsInline = true;

		this.SetVideoLink(videoLink);
		this.log(this);
	}

	SetVideoLink(url)
	{
		if (this.VideoSection === null) return;

		this.VideoSection.src = url;
	}
	SetVideoVolume(volume)
	{
		if (this.VideoSection === null) return;

		this.VideoSection.volume = volume;
	}

    async pluginWillUnload() 
	{
		powercord.api.settings.unregisterSettings(this.entityID);
		document.getElementById(this.entityID)?.remove();
    }
}
