module.exports = {
	logo: '/img/Share_icon.svg',
	sublogo: '/img/Open_share.svg',
	shareText: 'shareText',
	close: '/img/Cross.svg',
	alt: 'CommonSharePanel_ShareImageAlt',
	alt_open: 'CommonSharePanel_ShareImageOpenedAlt',
	links: [
		{
			link: 'https://www.facebook.com/sharer/sharer.php?u=_URL_&amp;src=sdkpreparse',
			img: '/img/Facebook.svg',
			alt: 'CommonSharePanelFBImageAlt',
		},
		{
			link: 'http://vk.com/share.php?url=_URL_',
			img: '/img/Vkontakte.svg',
			alt: 'CommonSharePanelVKImageAlt',
		},
		{
			link: 'https://www.linkedin.com/shareArticle?mini=true&url=_URL_&title=Different%20Lend',
			img: '/img/Linkedin.svg',
			alt: 'CommonSharePanelLinkedinImageAlt',
		},
		{
			link: 'mailto:?',
			img: '/img/mail_share.svg',
			subject: 'mailSubject',
			title: 'mailTitle',
			description: 'mailDescription',
			type: 'mail',
			alt: 'CommonSharePanelMailImageAlt',
		},
	],
}
