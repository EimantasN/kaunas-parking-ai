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
			loaded: false
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
				console.log("image error handlers", img.errorFns);
				img.errorFns.forEach(fn => fn.call(img));

			};
			img.onload = function() {
				var hasNH = 'naturalHeight' in img,
					w = hasNH ? 'naturalWidth' : 'width',
					h = hasNH ? 'naturalHeight' : 'height',
					invalidImg = img[w] + img[h] == 0;

				if (invalidImg) {
					console.log("calling image onerror");
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
				this.setState({loaded: true, image: img, lastUpdate: this.props.lastUpdate});
			});

			img.errorFns.push(() => {
				img.error = true;
				this.setState({error: true, image: brokenImage, lastUpdate: this.props.lastUpdate});
			});

		} else if (img.error) {
			this.setState({error: true, image: brokenImage});
			console.log('Error previously loading image', src);
		} else {
			this.setState({loaded: true, image: img, lastUpdate: this.props.lastUpdate});
		}

		if (!img.src) {
			img.src = src;
			console.log(src);
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

	getDims = (space, parent, child) => {
		switch (space) {
			case "fill":
				return this.fillRect(parent, child);

			case "fit":
			default:
				return this.fitRect(parent, child);
		}
	};

	render = () => {
		if (this.state.lastUpdate !== this.props.lastUpdate) {
			this.loadImg(this.props.src);
			console.log('load');
		}
		var selfDims = {
				width: this.props.width, 
				height: this.props.height
			},
			image = this.state.image,
			imageDims = image ? {
				width: image.width, 
				height: image.height
			} : selfDims,
			dims = this.getDims(this.props.space, selfDims, imageDims),
			pos = {x: this.props.x || 0, y: this.props.y || 0
		};

		return (
			<Image 
				image={this.state.image} 
				x={pos.x} 
				y={pos.y} 
				width={dims.width} 
				height={dims.height}/>
		);
	};
}

export default Img;