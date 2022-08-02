const { React } = require('powercord/webpack')
const { SwitchItem, TextInput } = require('powercord/components/settings')

module.exports = class Settings extends React.Component 
{
	render()
	{
		const { getSetting, toggleSetting, updateSetting} = this.props;

		return (
		<div>
			<SwitchItem
			note='When enabled, will replace the background with a video one from the link provided below.'
			value={getSetting('UseVideoBackground', true)}
			onChange={()=> {
				toggleSetting('UseVideoBackground', false)
				this.Reload();
			}}>
			Use Video Background
			</SwitchItem>
			<SwitchItem
			value={getSetting("FlipVideoBackground", false)}
			onChange={()=> {
				toggleSetting('FlipVideoBackground', false)
				this.Reload();
			}}>
			Flip Background (Horizontal)
			</SwitchItem>
			<TextInput
			note='The link used for the video background'
			defaultValue={getSetting('VideoBackgroundLink', this.props.DefaultBackgroundLink)}
			onChange={input => {
				if (input.match(/^ *$/)) // If whitespace input is detected
					updateSetting(this.props.DefaultBackgroundLink);
				else 
					updateSetting('VideoBackgroundLink', input)
				
				this.Reload();
			}}>
			Background Link
			</TextInput>
		</div>
		);
	}

	Reload()
	{
		this.props.plugin._unload();
		this.props.plugin._load();
	}
};