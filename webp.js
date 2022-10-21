const imagemin = require('imagemin'),
	webp = require('imagemin-webp')



const inputFolder =
	'./public/img/main/webp/'

const outputFolder =
	'./public/img/main/webp/'

const lossless = false,
	quality = 100

const produceWebP = async () => {
    await imagemin([inputFolder + '*.png'], {
			destination: outputFolder,
			plugins: [
				webp({
					lossless,
					quality,
				}),
			],
		})
    console.log('PNGs processed')
    await imagemin(
			[inputFolder + '*.{jpg,jpeg}'],
			{
				destination: outputFolder,
				plugins: [
					webp({
						lossless,
						quality,
					}),
				],
			}
		)
    console.log('JPGs and JPEGs processed')
}
produceWebP();
