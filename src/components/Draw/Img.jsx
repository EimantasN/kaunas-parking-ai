import React, {Component} from 'react';
import {Image} from 'react-konva';


var imgCache = {
	brokenImage: document.createElement("img")
};

var brokenImage = imgCache.brokenImage;
brokenImage.src = "/assets/broken-image.png";
brokenImage.onload = function() {
	console.log("preloaded broken image");
	this.brokenImage = true;
};

class Img extends Component {

	constructor(...args) {
		super(...args);
		this.state = {
			lastUpdate: null,
			image: null,
			error: false,
			loaded: false,
			loading: false
		};
	}

	loadImg(src) {
		if (!src) {
			throw new Error("Expected image src instead saw " + typeof src);
		}

		var img = undefined;

		if (!img) {
			img = imgCache[src] = document.createElement("img");
			img.loadFns = [];
			img.errorFns = [];
			img.onerror = function() {
				img.error = true;
				img.errorFns.forEach(fn => fn.call(img));

			};
			img.onload = function() {
				var hasNH = 'naturalHeight' in img,
					w = hasNH ? 'naturalWidth' : 'width',
					h = hasNH ? 'naturalHeight' : 'height',
					invalidImg = img[w] + img[h] == 0;

				if (invalidImg) {
					img.onerror();
				} else {
					img.loaded = true;
					img.loadFns.forEach(fn => fn.call(img));
				}
			};
		}

		if (!img.loaded && !img.error) {
			img.loadFns.push(() => {
				img.loaded = true;
				this.setState({
					loaded: true, 
					image: img, 
					lastUpdate: this.props.lastUpdate
				});
			});

			img.errorFns.push(() => {
				img.error = true;
				this.setState({
					error: true, 
					image: brokenImage, 
					lastUpdate: this.props.lastUpdate
				});
			});

		} else if (img.error) {
			this.setState({
				error: true, 
				image: brokenImage
			});
			console.log('Error previously loading image', src);
		} else {
			this.setState({
				loaded: true, 
				image: img, 
				lastUpdate: this.props.lastUpdate});
		}

		if (!img.src) {
			img.src = src;
		}
	}

	fillRect = (p, c) => {
		return (c.width / c.height) < (p.width / p.height)
			? {width: p.width, height: c.height * (p.width / c.width)}
			: {height: p.height, width: c.width * (p.height / c.height)};
	};

	fitRect = (p, c) => {
		return (c.width / c.height) > (p.width / p.height)
			? {width: p.width, height: c.height * (p.width / c.width)}
			: {height: p.height, width: c.width * (p.height / c.height)};
	};

	render = () => {
		if (this.state.lastUpdate !== this.props.lastUpdate) {
			this.loadImg(this.props.src);
		}
		return (
			<Image 
				image={this.state.image} 
				x={0} 
				y={0}
				width={this.props.width} 
				height={this.props.height}/>
		);
	};
}

export default Img;