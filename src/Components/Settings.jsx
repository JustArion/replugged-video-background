const { React } = require('powercord/webpack')
const { SwitchItem, TextInput, SliderInput } = require('powercord/components/settings')

module.exports = class Settings extends React.Component 
{
	render()
	{
		const { getSetting, toggleSetting, updateSetting, plugin} = this.props;

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
					input = this.props.DefaultBackgroundLink;

				plugin.SetVideoLink(input);
				updateSetting('VideoBackgroundLink', input)
			}}>
			Background Link
			</TextInput>
			<SliderInput
			minValue={0}
			maxValue={100}
			initialValue={getSetting('VideoBackgroundVolume', 0)}
			markers={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
			onValueChange={value => {
				const volume = value / 100;
				plugin.SetVideoVolume(volume);
				updateSetting('VideoBackgroundVolume', value);
			}}>
			Video Volume
			</SliderInput>
		</div>
		);
	}

	Reload()
	{
		this.props.plugin._unload();
		this.props.plugin._load();
	}
};