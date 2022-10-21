// @index(['./*.js','!./index.js'], f => `import ${f.name} from '${f.path}${f.ext}'`)
import BigImage from './BigImage.js'
import BulletList from './BulletList.js'
import BulletListHeading from './BulletListHeading.js'
import Date from './Date.js'
import Heading from './Heading.js'
import NormalImage from './NormalImage.js'
import Slider from './Slider.js'
import Text from './Text.js'
import Title from './Title.js'
import TitleCenter from './TitleCenter.js'
import UnsignedImage from './UnsignedImage.js'
//@endindex

export {
	// @index('./*.js', f => `${f.name},`)
	BigImage,
	BulletList,
	BulletListHeading,
	Date,
	Heading,
	NormalImage,
	Slider,
	Text,
	Title,
	TitleCenter,
	UnsignedImage,
	//@endindex
}
