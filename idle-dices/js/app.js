/* Phaser v2.10.1 - http://phaser.io - @photonstorm - (c) 2016 Photon Storm Ltd. */

(function(){function t(t,e,i,n){var r=t.createTexture();return t.bindTexture(t.TEXTURE_2D,r),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n===s.scaleModes.LINEAR?t.LINEAR:t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n===s.scaleModes.LINEAR?t.LINEAR:t.NEAREST),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,e,i,0,t.RGBA,t.UNSIGNED_BYTE,null),r}function e(e,i,s,r,o){var a=e.createFramebuffer(),h=e.createRenderbuffer(),u=null,l=0;return e.activeTexture(e.TEXTURE0+o),e.bindFramebuffer(e.FRAMEBUFFER,a),e.bindRenderbuffer(e.RENDERBUFFER,h),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.RENDERBUFFER,this.renderBuffer),u=t(e,i,s,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,u,0),(l=e.checkFramebufferStatus(e.FRAMEBUFFER))!==e.FRAMEBUFFER_COMPLETE&&console.error("Incomplete GL framebuffer. ",n[l]),a.width=i,a.height=s,a.targetTexture=u,a.renderBuffer=h,a}var i=this,s=s||{};s.DisplayObject=function(){this.position=new s.Point(0,0),this.scale=new s.Point(1,1),this.pivot=new s.Point(0,0),this.rotation=0,this.alpha=1,this.visible=!0,this.hitArea=null,this.renderable=!1,this.parent=null,this.worldAlpha=1,this.worldTransform=new Phaser.Matrix,this.worldPosition=new s.Point(0,0),this.worldScale=new s.Point(1,1),this.worldRotation=0,this.filterArea=null,this._sr=0,this._cr=1,this._bounds=new s.Rectangle(0,0,0,0),this._currentBounds=null,this._mask=null,this._cacheAsBitmap=!1,this._cacheIsDirty=!1},s.DisplayObject.prototype={constructor:s.DisplayObject,destroy:function(){if(this.children){for(var t=this.children.length;t--;)this.children[t].destroy();this.children=[]}this.hitArea=null,this.parent=null,this.worldTransform=null,this.filterArea=null,this.renderable=!1,this._bounds=null,this._currentBounds=null,this._mask=null,this._destroyCachedSprite()},updateTransform:function(t){if(!t&&!this.parent&&!this.game)return this;var e=this.parent;t?e=t:this.parent||(e=this.game.world);var i,s,n,r,o,a,h=e.worldTransform,u=this.worldTransform;this.rotation%Phaser.Math.PI2?(this.rotation!==this.rotationCache&&(this.rotationCache=this.rotation,this._sr=Math.sin(this.rotation),this._cr=Math.cos(this.rotation)),i=this._cr*this.scale.x,s=this._sr*this.scale.x,n=-this._sr*this.scale.y,r=this._cr*this.scale.y,o=this.position.x,a=this.position.y,(this.pivot.x||this.pivot.y)&&(o-=this.pivot.x*i+this.pivot.y*n,a-=this.pivot.x*s+this.pivot.y*r),u.a=i*h.a+s*h.c,u.b=i*h.b+s*h.d,u.c=n*h.a+r*h.c,u.d=n*h.b+r*h.d,u.tx=o*h.a+a*h.c+h.tx,u.ty=o*h.b+a*h.d+h.ty):(i=this.scale.x,s=0,n=0,r=this.scale.y,o=this.position.x-this.pivot.x*i,a=this.position.y-this.pivot.y*r,u.a=i*h.a,u.b=i*h.b,u.c=r*h.c,u.d=r*h.d,u.tx=o*h.a+a*h.c+h.tx,u.ty=o*h.b+a*h.d+h.ty),i=u.a,s=u.b,n=u.c;var l=i*(r=u.d)-s*n;if(i||s){var c=Math.sqrt(i*i+s*s);this.worldRotation=s>0?Math.acos(i/c):-Math.acos(i/c),this.worldScale.x=c,this.worldScale.y=l/c}else if(n||r){var d=Math.sqrt(n*n+r*r);this.worldRotation=Phaser.Math.HALF_PI-(r>0?Math.acos(-n/d):-Math.acos(n/d)),this.worldScale.x=l/d,this.worldScale.y=d}else this.worldScale.x=0,this.worldScale.y=0;return this.worldAlpha=this.alpha*e.worldAlpha,this.worldPosition.x=u.tx,this.worldPosition.y=u.ty,this._currentBounds=null,this.transformCallback&&this.transformCallback.call(this.transformCallbackContext,u,h),this},preUpdate:function(){},generateTexture:function(t,e,i){var n=this.getLocalBounds(),r=new Phaser.RenderTexture(this.game,0|n.width,0|n.height,i,e,t);return s.DisplayObject._tempMatrix.tx=-n.x,s.DisplayObject._tempMatrix.ty=-n.y,r.render(this,s.DisplayObject._tempMatrix),r},updateCache:function(){return this._generateCachedSprite(),this},toGlobal:function(t){return this.updateTransform(),this.worldTransform.apply(t)},toLocal:function(t,e){return e&&(t=e.toGlobal(t)),this.updateTransform(),this.worldTransform.applyInverse(t)},_renderCachedSprite:function(t){this._cachedSprite.worldAlpha=this.worldAlpha,t.gl?s.Sprite.prototype._renderWebGL.call(this._cachedSprite,t):s.Sprite.prototype._renderCanvas.call(this._cachedSprite,t)},_generateCachedSprite:function(){this._cacheAsBitmap=!1;var t=this.getLocalBounds();if(t.width=Math.max(1,Math.ceil(t.width)),t.height=Math.max(1,Math.ceil(t.height)),this.updateTransform(),this._cachedSprite)this._cachedSprite.texture.resize(t.width,t.height);else{var e=0;this.texture&&this.texture.baseTexture&&s._enableMultiTextureToggle&&(e=this.texture.baseTexture.textureIndex);var i=new Phaser.RenderTexture(this.game,t.width,t.height,void 0,void 0,void 0,void 0,e);this._cachedSprite=new s.Sprite(i),this._cachedSprite.worldTransform=this.worldTransform}var n=this._filters;this._filters=null,this._cachedSprite.filters=n,s.DisplayObject._tempMatrix.tx=-t.x,s.DisplayObject._tempMatrix.ty=-t.y,this._cachedSprite.texture.render(this,s.DisplayObject._tempMatrix,!0),this._cachedSprite.anchor.x=-t.x/t.width,this._cachedSprite.anchor.y=-t.y/t.height,this._filters=n,this._cacheAsBitmap=!0},_destroyCachedSprite:function(){this._cachedSprite&&(this._cachedSprite.texture.destroy(!0),this._cachedSprite=null)}},s.DisplayObject.prototype.displayObjectUpdateTransform=s.DisplayObject.prototype.updateTransform,Object.defineProperties(s.DisplayObject.prototype,{x:{get:function(){return this.position.x},set:function(t){this.position.x=t}},y:{get:function(){return this.position.y},set:function(t){this.position.y=t}},worldVisible:{get:function(){if(this.visible){var t=this.parent;if(!t)return this.visible;do{if(!t.visible)return!1;t=t.parent}while(t);return!0}return!1}},mask:{get:function(){return this._mask},set:function(t){this._mask&&(this._mask.isMask=!1),this._mask=t,t&&(this._mask.isMask=!0)}},filters:{get:function(){return this._filters},set:function(t){if(Array.isArray(t)){for(var e=[],i=0;i<t.length;i++)for(var n=t[i].passes,r=0;r<n.length;r++)e.push(n[r]);this._filterBlock={target:this,filterPasses:e}}this._filters=t,this.blendMode&&this.blendMode===s.blendModes.MULTIPLY&&(this.blendMode=s.blendModes.NORMAL)}},cacheAsBitmap:{get:function(){return this._cacheAsBitmap},set:function(t){this._cacheAsBitmap!==t&&(t?this._generateCachedSprite():this._destroyCachedSprite(),this._cacheAsBitmap=t)}}}),s.DisplayObjectContainer=function(){s.DisplayObject.call(this),this.children=[],this.ignoreChildInput=!1},s.DisplayObjectContainer.prototype=Object.create(s.DisplayObject.prototype),s.DisplayObjectContainer.prototype.constructor=s.DisplayObjectContainer,s.DisplayObjectContainer.prototype.addChild=function(t){return this.addChildAt(t,this.children.length)},s.DisplayObjectContainer.prototype.addChildAt=function(t,e){if(e>=0&&e<=this.children.length)return t.parent&&t.parent.removeChild(t),t.parent=this,this.children.splice(e,0,t),t;throw new Error(t+"addChildAt: The index "+e+" supplied is out of bounds "+this.children.length)},s.DisplayObjectContainer.prototype.swapChildren=function(t,e){if(t!==e){var i=this.getChildIndex(t),s=this.getChildIndex(e);if(i<0||s<0)throw new Error("swapChildren: Both the supplied DisplayObjects must be a child of the caller.");this.children[i]=e,this.children[s]=t}},s.DisplayObjectContainer.prototype.getChildIndex=function(t){var e=this.children.indexOf(t);if(-1===e)throw new Error("The supplied DisplayObject must be a child of the caller");return e},s.DisplayObjectContainer.prototype.setChildIndex=function(t,e){if(e<0||e>=this.children.length)throw new Error("The supplied index is out of bounds");var i=this.getChildIndex(t);this.children.splice(i,1),this.children.splice(e,0,t)},s.DisplayObjectContainer.prototype.getChildAt=function(t){if(t<0||t>=this.children.length)throw new Error("getChildAt: Supplied index "+t+" does not exist in the child list, or the supplied DisplayObject must be a child of the caller");return this.children[t]},s.DisplayObjectContainer.prototype.removeChild=function(t){var e=this.children.indexOf(t);if(-1!==e)return this.removeChildAt(e)},s.DisplayObjectContainer.prototype.removeChildAt=function(t){var e=this.getChildAt(t);return e&&(e.parent=void 0,this.children.splice(t,1)),e},s.DisplayObjectContainer.prototype.removeChildren=function(t,e){void 0===t&&(t=0),void 0===e&&(e=this.children.length);var i=e-t;if(i>0&&i<=e){for(var s=this.children.splice(t,i),n=0;n<s.length;n++)s[n].parent=void 0;return s}if(0===i&&0===this.children.length)return[];throw new Error("removeChildren: Range Error, numeric values are outside the acceptable range")},s.DisplayObjectContainer.prototype.updateTransform=function(){if(this.visible&&(this.displayObjectUpdateTransform(),!this._cacheAsBitmap))for(var t=0;t<this.children.length;t++)this.children[t].updateTransform()},s.DisplayObjectContainer.prototype.displayObjectContainerUpdateTransform=s.DisplayObjectContainer.prototype.updateTransform,s.DisplayObjectContainer.prototype.getBounds=function(t){var e=t&&t instanceof s.DisplayObject,i=!0;e?i=t instanceof s.DisplayObjectContainer&&t.contains(this):t=this;var n;if(e){var r=t.worldTransform;for(t.worldTransform=Phaser.identityMatrix,n=0;n<t.children.length;n++)t.children[n].updateTransform()}var o,a,h,u=1/0,l=1/0,c=-1/0,d=-1/0,p=!1;for(n=0;n<this.children.length;n++)this.children[n].visible&&(p=!0,u=u<(o=this.children[n].getBounds()).x?u:o.x,l=l<o.y?l:o.y,a=o.width+o.x,h=o.height+o.y,c=c>a?c:a,d=d>h?d:h);var f=this._bounds;if(!p){var g=(f=new s.Rectangle).x,m=f.width+f.x,y=f.y,v=f.height+f.y,x=this.worldTransform,_=x.a,b=x.b,T=x.c,w=x.d,C=x.tx,S=x.ty,P=_*m+T*v+C,E=w*v+b*m+S,A=_*g+T*v+C,R=w*v+b*g+S,M=_*g+T*y+C,I=w*y+b*g+S,L=_*m+T*y+C,O=w*y+b*m+S;c=P,d=E,l=E,u=L<(u=M<(u=A<(u=P)?A:u)?M:u)?L:u,l=O<(l=I<(l=R<l?R:l)?I:l)?O:l,c=L>(c=M>(c=A>c?A:c)?M:c)?L:c,d=O>(d=I>(d=R>d?R:d)?I:d)?O:d}if(f.x=u,f.y=l,f.width=c-u,f.height=d-l,e)for(t.worldTransform=r,n=0;n<t.children.length;n++)t.children[n].updateTransform();if(!i){var k=t.getBounds();f.x-=k.x,f.y-=k.y}return f},s.DisplayObjectContainer.prototype.getLocalBounds=function(){return this.getBounds(this)},s.DisplayObjectContainer.prototype.contains=function(t){return!!t&&(t===this||this.contains(t.parent))},s.DisplayObjectContainer.prototype._renderWebGL=function(t){if(this.visible&&!(this.alpha<=0))if(this._cacheAsBitmap)this._renderCachedSprite(t);else{var e;if(this._mask||this._filters){for(this._filters&&(t.spriteBatch.flush(),t.filterManager.pushFilter(this._filterBlock)),this._mask&&(t.spriteBatch.stop(),t.maskManager.pushMask(this.mask,t),t.spriteBatch.start()),e=0;e<this.children.length;e++)this.children[e]._renderWebGL(t);t.spriteBatch.stop(),this._mask&&t.maskManager.popMask(this._mask,t),this._filters&&t.filterManager.popFilter(),t.spriteBatch.start()}else for(e=0;e<this.children.length;e++)this.children[e]._renderWebGL(t)}},s.DisplayObjectContainer.prototype._renderCanvas=function(t){if(!1!==this.visible&&0!==this.alpha)if(this._cacheAsBitmap)this._renderCachedSprite(t);else{this._mask&&t.maskManager.pushMask(this._mask,t);for(var e=0;e<this.children.length;e++)this.children[e]._renderCanvas(t);this._mask&&t.maskManager.popMask(t)}},Object.defineProperty(s.DisplayObjectContainer.prototype,"width",{get:function(){return this.getLocalBounds().width*this.scale.x},set:function(t){var e=this.getLocalBounds().width;this.scale.x=0!==e?t/e:1,this._width=t}}),Object.defineProperty(s.DisplayObjectContainer.prototype,"height",{get:function(){return this.getLocalBounds().height*this.scale.y},set:function(t){var e=this.getLocalBounds().height;this.scale.y=0!==e?t/e:1,this._height=t}}),s.Sprite=function(t){s.DisplayObjectContainer.call(this),this.anchor=new s.Point(s.Sprite.defaultAnchor.x,s.Sprite.defaultAnchor.y),this.texture=t||s.Texture.emptyTexture,this._width=0,this._height=0,this.tint=16777215,this.cachedTint=-1,this.tintedTexture=null,this.blendMode=s.blendModes.NORMAL,this.shader=null,this.exists=!0,this.texture.baseTexture.hasLoaded&&this.onTextureUpdate(),this.renderable=!0},s.Sprite.defaultAnchor={x:0,y:0},s.Sprite.prototype=Object.create(s.DisplayObjectContainer.prototype),s.Sprite.prototype.constructor=s.Sprite,Object.defineProperty(s.Sprite.prototype,"width",{get:function(){return this.scale.x*this.texture.frame.width},set:function(t){this.scale.x=t/this.texture.frame.width,this._width=t}}),Object.defineProperty(s.Sprite.prototype,"height",{get:function(){return this.scale.y*this.texture.frame.height},set:function(t){this.scale.y=t/this.texture.frame.height,this._height=t}}),s.Sprite.prototype.setTexture=function(t,e){e&&this.texture.baseTexture.destroy(),this.texture.baseTexture.skipRender=!1,this.texture=t,this.texture.valid=!0,this.cachedTint=-1},s.Sprite.prototype.onTextureUpdate=function(){this._width&&(this.scale.x=this._width/this.texture.frame.width),this._height&&(this.scale.y=this._height/this.texture.frame.height)},s.Sprite.prototype.getBounds=function(t){var e=this.texture.frame.width,i=this.texture.frame.height,s=e*(1-this.anchor.x),n=e*-this.anchor.x,r=i*(1-this.anchor.y),o=i*-this.anchor.y,a=t||this.worldTransform,h=a.a,u=a.b,l=a.c,c=a.d,d=a.tx,p=a.ty,f=-1/0,g=-1/0,m=1/0,y=1/0;if(0===u&&0===l){if(h<0){h*=-1;v=s;s=-n,n=-v}if(c<0){c*=-1;var v=r;r=-o,o=-v}m=h*n+d,f=h*s+d,y=c*o+p,g=c*r+p}else{var x=h*n+l*o+d,_=c*o+u*n+p,b=h*s+l*o+d,T=c*o+u*s+p,w=h*s+l*r+d,C=c*r+u*s+p,S=h*n+l*r+d,P=c*r+u*n+p;m=S<(m=w<(m=b<(m=x<m?x:m)?b:m)?w:m)?S:m,y=P<(y=C<(y=T<(y=_<y?_:y)?T:y)?C:y)?P:y,f=S>(f=w>(f=b>(f=x>f?x:f)?b:f)?w:f)?S:f,g=P>(g=C>(g=T>(g=_>g?_:g)?T:g)?C:g)?P:g}var E=this._bounds;return E.x=m,E.width=f-m,E.y=y,E.height=g-y,this._currentBounds=E,E},s.Sprite.prototype.getLocalBounds=function(){var t=this.worldTransform;this.worldTransform=Phaser.identityMatrix;for(var e=0;e<this.children.length;e++)this.children[e].updateTransform();var i=this.getBounds();for(this.worldTransform=t,e=0;e<this.children.length;e++)this.children[e].updateTransform();return i},s.Sprite.prototype._renderWebGL=function(t,e){if(this.visible&&!(this.alpha<=0)&&this.renderable){var i=this.worldTransform;if(e&&(i=e),this._mask||this._filters){var s=t.spriteBatch;this._filters&&(s.flush(),t.filterManager.pushFilter(this._filterBlock)),this._mask&&(s.stop(),t.maskManager.pushMask(this.mask,t),s.start()),s.render(this);for(n=0;n<this.children.length;n++)this.children[n]._renderWebGL(t);s.stop(),this._mask&&t.maskManager.popMask(this._mask,t),this._filters&&t.filterManager.popFilter(),s.start()}else{t.spriteBatch.render(this);for(var n=0;n<this.children.length;n++)this.children[n]._renderWebGL(t,i)}}},s.Sprite.prototype._renderCanvas=function(t,e){if(!(!this.visible||0===this.alpha||!this.renderable||this.texture.crop.width<=0||this.texture.crop.height<=0)){var i=this.worldTransform;if(e&&(i=e),this.blendMode!==t.currentBlendMode&&(t.currentBlendMode=this.blendMode,t.context.globalCompositeOperation=s.blendModesCanvas[t.currentBlendMode]),this._mask&&t.maskManager.pushMask(this._mask,t),this.texture.valid){var n=this.texture.baseTexture.resolution/t.resolution;t.context.globalAlpha=this.worldAlpha,t.smoothProperty&&t.scaleMode!==this.texture.baseTexture.scaleMode&&(t.scaleMode=this.texture.baseTexture.scaleMode,t.context[t.smoothProperty]=t.scaleMode===s.scaleModes.LINEAR);var r=this.texture.trim?this.texture.trim.x-this.anchor.x*this.texture.trim.width:this.anchor.x*-this.texture.frame.width,o=this.texture.trim?this.texture.trim.y-this.anchor.y*this.texture.trim.height:this.anchor.y*-this.texture.frame.height,a=i.tx*t.resolution+t.shakeX,h=i.ty*t.resolution+t.shakeY,u=this.texture.crop.width,l=this.texture.crop.height;if(this.texture.rotated){var c=i.a,d=i.b,p=i.c,f=i.d,g=u;a=i.c*l+a,h=i.d*l+h,i.a=6.123233995736766e-17*c-p,i.b=6.123233995736766e-17*d-f,i.c=c+6.123233995736766e-17*p,i.d=d+6.123233995736766e-17*f,u=l,l=g}if(t.roundPixels?(t.context.setTransform(i.a,i.b,i.c,i.d,0|a,0|h),r|=0,o|=0):t.context.setTransform(i.a,i.b,i.c,i.d,a,h),r/=n,o/=n,16777215!==this.tint)(this.texture.requiresReTint||this.cachedTint!==this.tint)&&(this.tintedTexture=s.CanvasTinter.getTintedTexture(this,this.tint),this.cachedTint=this.tint,this.texture.requiresReTint=!1),t.context.drawImage(this.tintedTexture,0,0,u,l,r,o,u/n,l/n);else{var m=this.texture.crop.x,y=this.texture.crop.y;u=Math.floor(u),l=Math.floor(l),t.context.drawImage(this.texture.baseTexture.source,m,y,u,l,r,o,u/n,l/n)}for(v=0;v<this.children.length;v++)this.children[v]._renderCanvas(t);this._mask&&t.maskManager.popMask(t)}else{for(var v=0;v<this.children.length;v++)this.children[v]._renderCanvas(t);this._mask&&t.maskManager.popMask(t)}}},s.initDefaultShaders=function(){},s.CompileVertexShader=function(t,e){return s._CompileShader(t,e,t.VERTEX_SHADER)},s.CompileFragmentShader=function(t,e){return s._CompileShader(t,e,t.FRAGMENT_SHADER)},s._CompileShader=function(t,e,i){var s=e;Array.isArray(e)&&(s=e.join("\n"));var n=t.createShader(i);return t.shaderSource(n,s),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)?n:(window.console.log(t.getShaderInfoLog(n)),null)},s.compileProgram=function(t,e,i){var n=s.CompileFragmentShader(t,i),r=s.CompileVertexShader(t,e),o=t.createProgram();return t.attachShader(o,r),t.attachShader(o,n),t.linkProgram(o),t.getProgramParameter(o,t.LINK_STATUS)||(window.console.log(t.getProgramInfoLog(o)),window.console.log("Could not initialise shaders")),o},s.PixiShader=function(t){this._UID=Phaser._UID++,this.gl=t,this.program=null,this.fragmentSrc=null,this.textureCount=0,this.firstRun=!0,this.dirty=!0,this.attributes=[],this.init()},s.PixiShader.prototype.constructor=s.PixiShader,s.PixiShader.prototype.initMultitexShader=function(){var t=this.gl;this.MAX_TEXTURES=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);for(var e="\tif (vTextureIndex == 0.0) { gl_FragColor = texture2D(uSamplerArray[0], vTextureCoord) * vColor;return;}\n",i=1;i<this.MAX_TEXTURES;++i)e+="\tif (vTextureIndex == "+i+".0) {gl_FragColor = texture2D(uSamplerArray["+i+"], vTextureCoord) * vColor;return;}\n";this.fragmentSrc=["// PixiShader Fragment Shader.","precision lowp float;","bool isnan( float val ) {  return ( val < 0.0 || 0.0 < val || val == 0.0 ) ? false : true; }","varying vec2 vTextureCoord;","varying vec4 vColor;","varying float vTextureIndex;","uniform sampler2D uSamplerArray["+this.MAX_TEXTURES+"];","const vec4 BLUE = vec4(1.0, 0.0, 1.0, 1.0);","const vec4 RED = vec4(1.0, 0.0, 0.0, 1.0);","void main(void) {",e,"   if(vTextureIndex >= "+this.MAX_TEXTURES+".0) { gl_FragColor = BLUE;return;}","   if(isnan(vTextureIndex)) { gl_FragColor = RED;return;}","}"];var n=s.compileProgram(t,this.vertexSrc||s.PixiShader.defaultVertexSrc,this.fragmentSrc);t.useProgram(n),this.uSamplerArray=t.getUniformLocation(n,"uSamplerArray[0]"),this.projectionVector=t.getUniformLocation(n,"projectionVector"),this.offsetVector=t.getUniformLocation(n,"offsetVector"),this.dimensions=t.getUniformLocation(n,"dimensions"),this.aVertexPosition=t.getAttribLocation(n,"aVertexPosition"),this.aTextureCoord=t.getAttribLocation(n,"aTextureCoord"),this.colorAttribute=t.getAttribLocation(n,"aColor"),this.aTextureIndex=t.getAttribLocation(n,"aTextureIndex");var r=[],o=t.createTexture();t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,o),t.texImage2D(t.TEXTURE_2D,0,t.RGB,1,1,0,t.RGB,t.UNSIGNED_BYTE,null);for(var a=0;a<this.MAX_TEXTURES;++a)t.activeTexture(t.TEXTURE0+a),t.bindTexture(t.TEXTURE_2D,o),r.push(a);t.activeTexture(t.TEXTURE0),t.uniform1iv(this.uSamplerArray,r),-1===this.colorAttribute&&(this.colorAttribute=2),this.attributes=[this.aVertexPosition,this.aTextureCoord,this.colorAttribute,this.aTextureIndex];for(var h in this.uniforms)this.uniforms[h].uniformLocation=t.getUniformLocation(n,h);this.initUniforms(),this.program=n},s.PixiShader.prototype.initDefaultShader=function(){null===this.fragmentSrc&&(this.fragmentSrc=["precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","varying float vTextureIndex;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;","}"]);var t=this.gl,e=s.compileProgram(t,this.vertexSrc||s.PixiShader.defaultVertexSrc,this.fragmentSrc);t.useProgram(e),this.uSampler=t.getUniformLocation(e,"uSampler"),this.projectionVector=t.getUniformLocation(e,"projectionVector"),this.offsetVector=t.getUniformLocation(e,"offsetVector"),this.dimensions=t.getUniformLocation(e,"dimensions"),this.aVertexPosition=t.getAttribLocation(e,"aVertexPosition"),this.aTextureCoord=t.getAttribLocation(e,"aTextureCoord"),this.colorAttribute=t.getAttribLocation(e,"aColor"),this.aTextureIndex=t.getAttribLocation(e,"aTextureIndex"),-1===this.colorAttribute&&(this.colorAttribute=2),this.attributes=[this.aVertexPosition,this.aTextureCoord,this.colorAttribute,this.aTextureIndex];for(var i in this.uniforms)this.uniforms[i].uniformLocation=t.getUniformLocation(e,i);this.initUniforms(),this.program=e},s.PixiShader.prototype.init=function(t){s._enableMultiTextureToggle&&!t?this.initMultitexShader():this.initDefaultShader()},s.PixiShader.prototype.initUniforms=function(){this.textureCount=1;var t,e=this.gl;for(var i in this.uniforms){var s=(t=this.uniforms[i]).type;"sampler2D"===s?(t._init=!1,null!==t.value&&this.initSampler2D(t)):"mat2"===s||"mat3"===s||"mat4"===s?(t.glMatrix=!0,t.glValueLength=1,"mat2"===s?t.glFunc=e.uniformMatrix2fv:"mat3"===s?t.glFunc=e.uniformMatrix3fv:"mat4"===s&&(t.glFunc=e.uniformMatrix4fv)):(t.glFunc=e["uniform"+s],t.glValueLength="2f"===s||"2i"===s?2:"3f"===s||"3i"===s?3:"4f"===s||"4i"===s?4:1)}},s.PixiShader.prototype.initSampler2D=function(t){if(t.value&&t.value.baseTexture&&t.value.baseTexture.hasLoaded){var e=this.gl;if(e.activeTexture(e.TEXTURE0+this.textureCount),e.bindTexture(e.TEXTURE_2D,t.value.baseTexture._glTextures[e.id]),t.textureData){var i=t.textureData,s=i.magFilter?i.magFilter:e.LINEAR,n=i.minFilter?i.minFilter:e.LINEAR,r=i.wrapS?i.wrapS:e.CLAMP_TO_EDGE,o=i.wrapT?i.wrapT:e.CLAMP_TO_EDGE,a=i.luminance?e.LUMINANCE:e.RGBA;if(i.repeat&&(r=e.REPEAT,o=e.REPEAT),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!!i.flipY),i.width){var h=i.width?i.width:512,u=i.height?i.height:2,l=i.border?i.border:0;e.texImage2D(e.TEXTURE_2D,0,a,h,u,l,a,e.UNSIGNED_BYTE,null)}else e.texImage2D(e.TEXTURE_2D,0,a,e.RGBA,e.UNSIGNED_BYTE,t.value.baseTexture.source);e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,o)}e.uniform1i(t.uniformLocation,this.textureCount),t._init=!0,this.textureCount++}},s.PixiShader.prototype.syncUniforms=function(){this.textureCount=1;var t,e=this.gl;for(var i in this.uniforms)1===(t=this.uniforms[i]).glValueLength?!0===t.glMatrix?t.glFunc.call(e,t.uniformLocation,t.transpose,t.value):t.glFunc.call(e,t.uniformLocation,t.value):2===t.glValueLength?t.glFunc.call(e,t.uniformLocation,t.value.x,t.value.y):3===t.glValueLength?t.glFunc.call(e,t.uniformLocation,t.value.x,t.value.y,t.value.z):4===t.glValueLength?t.glFunc.call(e,t.uniformLocation,t.value.x,t.value.y,t.value.z,t.value.w):"sampler2D"===t.type&&(t._init?(e.activeTexture(e["TEXTURE"+this.textureCount]),t.value.baseTexture._dirty[e.id]?s.instances[e.id].updateTexture(t.value.baseTexture):e.bindTexture(e.TEXTURE_2D,t.value.baseTexture._glTextures[e.id]),e.uniform1i(t.uniformLocation,this.textureCount),this.textureCount++):this.initSampler2D(t))},s.PixiShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},s.PixiShader.defaultVertexSrc=["// PixiShader Vertex Shader","// With multi-texture rendering","attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute vec4 aColor;","attribute float aTextureIndex;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","varying vec4 vColor;","varying float vTextureIndex;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   if (aTextureIndex > 0.0) gl_Position = vec4(0.0);","   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vColor = vec4(aColor.rgb * aColor.a, aColor.a);","   vTextureIndex = aTextureIndex;","}"],s.PixiFastShader=function(t){if(this._UID=Phaser._UID++,this.gl=t,this.program=null,s._enableMultiTextureToggle){var t=this.gl;this.MAX_TEXTURES=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);for(var e="\tif (vTextureIndex == 0.0) { gl_FragColor = texture2D(uSamplerArray[0], vTextureCoord) * vColor;return;}\n",i=1;i<this.MAX_TEXTURES;++i)e+="\tif (vTextureIndex == "+i+".0) { gl_FragColor = texture2D(uSamplerArray["+i+"], vTextureCoord) * vColor;return;}\n";this.fragmentSrc=["// PixiFastShader Fragment Shader.","precision lowp float;","bool isnan( float val ) {  return ( val < 0.0 || 0.0 < val || val == 0.0 ) ? false : true; }","varying vec2 vTextureCoord;","varying float vColor;","varying float vTextureIndex;","uniform sampler2D uSamplerArray["+this.MAX_TEXTURES+"];","const vec4 BLUE = vec4(1.0, 0.0, 1.0, 1.0);","const vec4 RED = vec4(1.0, 0.0, 0.0, 1.0);","void main(void) {",e,"   if(vTextureIndex >= "+this.MAX_TEXTURES+".0) { gl_FragColor = BLUE;return;}","   if(isnan(vTextureIndex)) {gl_FragColor = RED;return;}","}"]}else this.fragmentSrc=["// PixiFastShader Fragment Shader.","precision lowp float;","varying vec2 vTextureCoord;","varying float vColor;","varying float vTextureIndex;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;","}"];this.vertexSrc=["// PixiFastShader Vertex Shader.","attribute vec2 aVertexPosition;","attribute vec2 aPositionCoord;","attribute vec2 aScale;","attribute float aRotation;","attribute vec2 aTextureCoord;","attribute float aColor;","attribute float aTextureIndex;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform mat3 uMatrix;","varying vec2 vTextureCoord;","varying float vColor;","varying float vTextureIndex;","const vec2 center = vec2(-1.0, 1.0);","void main(void) {","   vec2 v;","   vec2 sv = aVertexPosition * aScale;","   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);","   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);","   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;","   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vTextureIndex = aTextureIndex;","   vColor = aColor;","}"],this.textureCount=0,this.init()},s.PixiFastShader.prototype.constructor=s.PixiFastShader,s.PixiFastShader.prototype.init=function(){var t=this.gl,e=s.compileProgram(t,this.vertexSrc,this.fragmentSrc);if(t.useProgram(e),this.uSampler=s._enableMultiTextureToggle?t.getUniformLocation(e,"uSamplerArray[0]"):t.getUniformLocation(e,"uSampler"),s._enableMultiTextureToggle){var i=[],n=t.createTexture();t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,n),t.texImage2D(t.TEXTURE_2D,0,t.RGB,1,1,0,t.RGB,t.UNSIGNED_BYTE,null);for(var r=0;r<this.MAX_TEXTURES;++r)t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,n),i.push(r);t.activeTexture(t.TEXTURE0),t.uniform1iv(this.uSampler,i)}this.projectionVector=t.getUniformLocation(e,"projectionVector"),this.offsetVector=t.getUniformLocation(e,"offsetVector"),this.dimensions=t.getUniformLocation(e,"dimensions"),this.uMatrix=t.getUniformLocation(e,"uMatrix"),this.aVertexPosition=t.getAttribLocation(e,"aVertexPosition"),this.aPositionCoord=t.getAttribLocation(e,"aPositionCoord"),this.aScale=t.getAttribLocation(e,"aScale"),this.aRotation=t.getAttribLocation(e,"aRotation"),this.aTextureCoord=t.getAttribLocation(e,"aTextureCoord"),this.colorAttribute=t.getAttribLocation(e,"aColor"),this.aTextureIndex=t.getAttribLocation(e,"aTextureIndex"),-1===this.colorAttribute&&(this.colorAttribute=2),this.attributes=[this.aVertexPosition,this.aPositionCoord,this.aScale,this.aRotation,this.aTextureCoord,this.colorAttribute,this.aTextureIndex],this.program=e},s.PixiFastShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},s.StripShader=function(t){if(this._UID=Phaser._UID++,this.gl=t,this.program=null,s._enableMultiTextureToggle){var t=this.gl;this.MAX_TEXTURES=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS);for(var e="\tif (vTextureIndex == 0.0) { gl_FragColor = texture2D(uSamplerArray[0], vTextureCoord);return;}\n",i=1;i<this.MAX_TEXTURES;++i)e+="\tif (vTextureIndex == "+i+".0) { gl_FragColor = texture2D(uSamplerArray["+i+"], vTextureCoord) ;return;}\n";this.fragmentSrc=["//StripShader Fragment Shader.","precision mediump float;","bool isnan( float val ) {  return ( val < 0.0 || 0.0 < val || val == 0.0 ) ? false : true; }","varying vec2 vTextureCoord;","varying float vTextureIndex;","uniform float alpha;","uniform sampler2D uSamplerArray["+this.MAX_TEXTURES+"];","const vec4 BLUE = vec4(1.0, 0.0, 1.0, 1.0);","const vec4 RED = vec4(1.0, 0.0, 0.0, 1.0);","void main(void) {",e,"   if(vTextureIndex >= "+this.MAX_TEXTURES+".0) { gl_FragColor = BLUE;return;}","   if(isnan(vTextureIndex)) {gl_FragColor = RED;return;}","}"]}else this.fragmentSrc=["//StripShader Fragment Shader.","precision mediump float;","varying vec2 vTextureCoord;","varying float vTextureIndex;","uniform float alpha;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord);","}"];this.vertexSrc=["//StripShader Vertex Shader.","attribute vec2 aVertexPosition;","attribute vec2 aTextureCoord;","attribute float aTextureIndex;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","varying vec2 vTextureCoord;","varying float vTextureIndex;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);","   vTextureCoord = aTextureCoord;","   vTextureIndex = aTextureIndex;","}"],this.init()},s.StripShader.prototype.constructor=s.StripShader,s.StripShader.prototype.init=function(){var t=this.gl,e=s.compileProgram(t,this.vertexSrc,this.fragmentSrc);if(t.useProgram(e),this.uSampler=s._enableMultiTextureToggle?t.getUniformLocation(e,"uSamplerArray[0]"):t.getUniformLocation(e,"uSampler"),s._enableMultiTextureToggle){var i=[],n=t.createTexture();t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,n),t.texImage2D(t.TEXTURE_2D,0,t.RGB,1,1,0,t.RGB,t.UNSIGNED_BYTE,null);for(var r=0;r<this.MAX_TEXTURES;++r)t.activeTexture(t.TEXTURE0+r),t.bindTexture(t.TEXTURE_2D,n),i.push(r);t.activeTexture(t.TEXTURE0),t.uniform1iv(this.uSampler,i)}this.projectionVector=t.getUniformLocation(e,"projectionVector"),this.offsetVector=t.getUniformLocation(e,"offsetVector"),this.colorAttribute=t.getAttribLocation(e,"aColor"),this.aTextureIndex=t.getAttribLocation(e,"aTextureIndex"),this.aVertexPosition=t.getAttribLocation(e,"aVertexPosition"),this.aTextureCoord=t.getAttribLocation(e,"aTextureCoord"),this.attributes=[this.aVertexPosition,this.aTextureCoord,this.aTextureIndex],this.translationMatrix=t.getUniformLocation(e,"translationMatrix"),this.alpha=t.getUniformLocation(e,"alpha"),this.program=e},s.StripShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attribute=null},s.PrimitiveShader=function(t){this._UID=Phaser._UID++,this.gl=t,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","attribute vec4 aColor;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform float alpha;","uniform float flipY;","uniform vec3 tint;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);","   vColor = aColor * vec4(tint * alpha, alpha);","}"],this.init()},s.PrimitiveShader.prototype.constructor=s.PrimitiveShader,s.PrimitiveShader.prototype.init=function(){var t=this.gl,e=s.compileProgram(t,this.vertexSrc,this.fragmentSrc);t.useProgram(e),this.projectionVector=t.getUniformLocation(e,"projectionVector"),this.offsetVector=t.getUniformLocation(e,"offsetVector"),this.tintColor=t.getUniformLocation(e,"tint"),this.flipY=t.getUniformLocation(e,"flipY"),this.aVertexPosition=t.getAttribLocation(e,"aVertexPosition"),this.colorAttribute=t.getAttribLocation(e,"aColor"),this.attributes=[this.aVertexPosition,this.colorAttribute],this.translationMatrix=t.getUniformLocation(e,"translationMatrix"),this.alpha=t.getUniformLocation(e,"alpha"),this.program=e},s.PrimitiveShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attributes=null},s.ComplexPrimitiveShader=function(t){this._UID=Phaser._UID++,this.gl=t,this.program=null,this.fragmentSrc=["precision mediump float;","varying vec4 vColor;","void main(void) {","   gl_FragColor = vColor;","}"],this.vertexSrc=["attribute vec2 aVertexPosition;","uniform mat3 translationMatrix;","uniform vec2 projectionVector;","uniform vec2 offsetVector;","uniform vec3 tint;","uniform float alpha;","uniform vec3 color;","uniform float flipY;","varying vec4 vColor;","void main(void) {","   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);","   v -= offsetVector.xyx;","   gl_Position = vec4( v.x / projectionVector.x -1.0, (v.y / projectionVector.y * -flipY) + flipY , 0.0, 1.0);","   vColor = vec4(color * alpha * tint, alpha);","}"],this.init()},s.ComplexPrimitiveShader.prototype.constructor=s.ComplexPrimitiveShader,s.ComplexPrimitiveShader.prototype.init=function(){var t=this.gl,e=s.compileProgram(t,this.vertexSrc,this.fragmentSrc);t.useProgram(e),this.projectionVector=t.getUniformLocation(e,"projectionVector"),this.offsetVector=t.getUniformLocation(e,"offsetVector"),this.tintColor=t.getUniformLocation(e,"tint"),this.color=t.getUniformLocation(e,"color"),this.flipY=t.getUniformLocation(e,"flipY"),this.aVertexPosition=t.getAttribLocation(e,"aVertexPosition"),this.attributes=[this.aVertexPosition,this.colorAttribute],this.translationMatrix=t.getUniformLocation(e,"translationMatrix"),this.alpha=t.getUniformLocation(e,"alpha"),this.program=e},s.ComplexPrimitiveShader.prototype.destroy=function(){this.gl.deleteProgram(this.program),this.uniforms=null,this.gl=null,this.attribute=null},s.glContexts=[],s.instances=[],s._enableMultiTextureToggle=!1,s.WebGLRenderer=function(t,e){this.game=t,s.defaultRenderer||(s.defaultRenderer=this),this.extensions={},this.type=Phaser.WEBGL,this.resolution=t.resolution,this.transparent=t.transparent,this.autoResize=!1,this.preserveDrawingBuffer=t.preserveDrawingBuffer,this.clearBeforeRender=t.clearBeforeRender,this.width=t.width,this.height=t.height,this.view=t.canvas,this._contextOptions={alpha:this.transparent,antialias:t.antialias,failIfMajorPerformanceCaveat:e.failIfMajorPerformanceCaveat,premultipliedAlpha:this.transparent&&"notMultiplied"!==this.transparent,stencil:!0,preserveDrawingBuffer:this.preserveDrawingBuffer},this.projection=new s.Point,this.offset=new s.Point,this.shaderManager=new s.WebGLShaderManager,this.spriteBatch=new s.WebGLSpriteBatch(t),this.maskManager=new s.WebGLMaskManager,this.filterManager=new s.WebGLFilterManager,this.stencilManager=new s.WebGLStencilManager,this.blendModeManager=new s.WebGLBlendModeManager,this.renderSession={},this.currentBatchedTextures=[],this.renderSession.game=this.game,this.renderSession.gl=this.gl,this.renderSession.drawCount=0,this.renderSession.shaderManager=this.shaderManager,this.renderSession.maskManager=this.maskManager,this.renderSession.filterManager=this.filterManager,this.renderSession.blendModeManager=this.blendModeManager,this.renderSession.spriteBatch=this.spriteBatch,this.renderSession.stencilManager=this.stencilManager,this.renderSession.renderer=this,this.renderSession.resolution=this.resolution,this.renderSession.roundPixels=e.roundPixels||!1,this.renderSession.maxTextureAvailableSpace=null,this.initContext(),this.mapBlendModes()},s.WebGLRenderer.prototype.constructor=s.WebGLRenderer,s.WebGLRenderer.prototype.initContext=function(){var t=this.view.getContext("webgl",this._contextOptions)||this.view.getContext("experimental-webgl",this._contextOptions);if(this.gl=t,!t)throw new Error("This browser does not support webGL. Try using the canvas renderer");this.maxTextures=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),this.maxTextureSize=this.gl.getParameter(t.MAX_TEXTURE_SIZE),this.glContextId=t.id=s.WebGLRenderer.glContextId++,s.glContexts[this.glContextId]=t,s.instances[this.glContextId]=this,t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.enable(t.BLEND),this.shaderManager.setContext(t),this.spriteBatch.setContext(t),this.maskManager.setContext(t),this.filterManager.setContext(t),this.blendModeManager.setContext(t),this.stencilManager.setContext(t),this.renderSession.gl=this.gl,this.resize(this.width,this.height),this.extensions.compression={};var e=t.getExtension("WEBGL_compressed_texture_etc1")||t.getExtension("WEBKIT_WEBGL_compressed_texture_etc1"),i=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),n=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");e&&(this.extensions.compression.ETC1=e),i&&(this.extensions.compression.PVRTC=i),n&&(this.extensions.compression.S3TC=n)},s.WebGLRenderer.prototype.setTexturePriority=function(t){if(s._enableMultiTextureToggle){for(var e=function(t){return--t,t|=t>>1,t|=t>>2,t|=t>>4,t|=t>>8,t|=t>>16,++t},i=this.gl,n=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),r=i.getParameter(i.MAX_TEXTURE_SIZE),o=this.game.cache._cache.image,a=null,h=0;h<this.currentBatchedTextures.length;h++)(a=this.currentBatchedTextures[h])in o?o[a].base.textureIndex=0:console.warn('setTexturePriority: There is no image "%s" in the image cache.',a);var u=r-e(Math.max(this.width,this.height));this.currentBatchedTextures.length=0;for(var l=0;l<t.length;++l)if((a=t[l])in o){var c=o[a].base;(u-=e(Math.max(c.width,c.height)))<=0?(c.textureIndex=0,console.warn('setTexturePriority: Image "%s" was given textureIndex=0 because there is no available texture space (%s).',a,u)):c.textureIndex=1+l%(n-1),this.currentBatchedTextures.push(a)}else console.warn('setTexturePriority: There is no image "%s" in the image cache.',a);return this.renderSession.maxTextureAvailableSpace=u,this.currentBatchedTextures}console.warn("setTexturePriority error: Multi Texture support hasn't been enabled in the Phaser Game Config.")},s.WebGLRenderer.prototype.render=function(t){if(!this.contextLost){var e=this.gl;e.viewport(0,0,this.width,this.height),e.bindFramebuffer(e.FRAMEBUFFER,null),this.game.clearBeforeRender&&(e.clearColor(t._bgColor.r,t._bgColor.g,t._bgColor.b,t._bgColor.a),e.clear(e.COLOR_BUFFER_BIT)),this.offset.x=this.game.camera._shake.x,this.offset.y=this.game.camera._shake.y,this.renderDisplayObject(t,this.projection)}},s.WebGLRenderer.prototype.renderDisplayObject=function(t,e,i,n){this.renderSession.blendModeManager.setBlendMode(s.blendModes.NORMAL),this.renderSession.drawCount=0,this.renderSession.flipY=i?-1:1,this.renderSession.projection=e,this.renderSession.offset=this.offset,this.spriteBatch.begin(this.renderSession),this.filterManager.begin(this.renderSession,i),t._renderWebGL(this.renderSession,n),this.spriteBatch.end()},s.WebGLRenderer.prototype.resize=function(t,e){this.width=t*this.resolution,this.height=e*this.resolution,this.view.width=this.width,this.view.height=this.height,this.autoResize&&(this.view.style.width=this.width/this.resolution+"px",this.view.style.height=this.height/this.resolution+"px"),this.gl.viewport(0,0,this.width,this.height),this.projection.x=this.width/2/this.resolution,this.projection.y=-this.height/2/this.resolution},s.WebGLRenderer.prototype.updateCompressedTexture=function(t){if(!t.hasLoaded)return!1;var e=this.gl,i=t.source;return t._glTextures[e.id]||(t._glTextures[e.id]=e.createTexture()),e.activeTexture(e.TEXTURE0+t.textureIndex),e.bindTexture(e.TEXTURE_2D,t._glTextures[e.id]),e.compressedTexImage2D(e.TEXTURE_2D,0,i.glExtensionFormat,i.width,i.height,0,i.textureData),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,t.scaleMode===s.scaleModes.LINEAR?e.LINEAR:e.NEAREST),t.mipmap&&Phaser.Math.isPowerOfTwo(t.width,t.height)?(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t.scaleMode===s.scaleModes.LINEAR?e.LINEAR_MIPMAP_LINEAR:e.NEAREST_MIPMAP_NEAREST),e.generateMipmap(e.TEXTURE_2D)):e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t.scaleMode===s.scaleModes.LINEAR?e.LINEAR:e.NEAREST),t._powerOf2?(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT)):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),t._dirty[e.id]=!1,!0},s.WebGLRenderer.prototype.updateTexture=function(t){if(!t.hasLoaded)return!1;if(t.source.compressionAlgorithm)return this.updateCompressedTexture(t);var e=this.gl;return t._glTextures[e.id]||(t._glTextures[e.id]=e.createTexture()),e.activeTexture(e.TEXTURE0+t.textureIndex),e.bindTexture(e.TEXTURE_2D,t._glTextures[e.id]),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultipliedAlpha),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t.source),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,t.scaleMode===s.scaleModes.LINEAR?e.LINEAR:e.NEAREST),t.mipmap&&Phaser.Math.isPowerOfTwo(t.width,t.height)?(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t.scaleMode===s.scaleModes.LINEAR?e.LINEAR_MIPMAP_LINEAR:e.NEAREST_MIPMAP_NEAREST),e.generateMipmap(e.TEXTURE_2D)):e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t.scaleMode===s.scaleModes.LINEAR?e.LINEAR:e.NEAREST),t._powerOf2?(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT)):(e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),t._dirty[e.id]=!1,!0},s.WebGLRenderer.prototype.destroy=function(){s.glContexts[this.glContextId]=null,this.projection=null,this.offset=null,this.shaderManager.destroy(),this.spriteBatch.destroy(),this.maskManager.destroy(),this.filterManager.destroy(),this.shaderManager=null,this.spriteBatch=null,this.maskManager=null,this.filterManager=null,this.gl=null,this.renderSession=null,Phaser.CanvasPool.remove(this),s.instances[this.glContextId]=null,s.WebGLRenderer.glContextId--},s.WebGLRenderer.prototype.mapBlendModes=function(){var t=this.gl;if(!s.blendModesWebGL){var e=[],i=s.blendModes;e[i.NORMAL]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.ADD]=[t.SRC_ALPHA,t.DST_ALPHA],e[i.MULTIPLY]=[t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA],e[i.SCREEN]=[t.SRC_ALPHA,t.ONE],e[i.OVERLAY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.DARKEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.LIGHTEN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.COLOR_DODGE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.COLOR_BURN]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.HARD_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.SOFT_LIGHT]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.DIFFERENCE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.EXCLUSION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.HUE]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.SATURATION]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.COLOR]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],e[i.LUMINOSITY]=[t.ONE,t.ONE_MINUS_SRC_ALPHA],s.blendModesWebGL=e}},s.WebGLRenderer.prototype.getMaxTextureUnit=function(){var t=this.gl;return t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)},s.enableMultiTexture=function(){s._enableMultiTextureToggle=!0},s.WebGLRenderer.glContextId=0,s.WebGLRenderer.textureArray=[],s.WebGLBlendModeManager=function(){this.currentBlendMode=99999},s.WebGLBlendModeManager.prototype.constructor=s.WebGLBlendModeManager,s.WebGLBlendModeManager.prototype.setContext=function(t){this.gl=t},s.WebGLBlendModeManager.prototype.setBlendMode=function(t){if(this.currentBlendMode===t)return!1;this.currentBlendMode=t;var e=s.blendModesWebGL[this.currentBlendMode];return e&&this.gl.blendFunc(e[0],e[1]),!0},s.WebGLBlendModeManager.prototype.destroy=function(){this.gl=null},s.WebGLMaskManager=function(){},s.WebGLMaskManager.prototype.constructor=s.WebGLMaskManager,s.WebGLMaskManager.prototype.setContext=function(t){this.gl=t},s.WebGLMaskManager.prototype.pushMask=function(t,e){var i=e.gl;t.dirty&&s.WebGLGraphics.updateGraphics(t,i),void 0!==t._webGL[i.id]&&void 0!==t._webGL[i.id].data&&0!==t._webGL[i.id].data.length&&e.stencilManager.pushStencil(t,t._webGL[i.id].data[0],e)},s.WebGLMaskManager.prototype.popMask=function(t,e){var i=this.gl;void 0!==t._webGL[i.id]&&void 0!==t._webGL[i.id].data&&0!==t._webGL[i.id].data.length&&e.stencilManager.popStencil(t,t._webGL[i.id].data[0],e)},s.WebGLMaskManager.prototype.destroy=function(){this.gl=null},s.WebGLStencilManager=function(){this.stencilStack=[],this.reverse=!0,this.count=0},s.WebGLStencilManager.prototype.setContext=function(t){this.gl=t},s.WebGLStencilManager.prototype.pushStencil=function(t,e,i){var s=this.gl;this.bindGraphics(t,e,i),0===this.stencilStack.length&&(s.enable(s.STENCIL_TEST),s.clear(s.STENCIL_BUFFER_BIT),this.reverse=!0,this.count=0),this.stencilStack.push(e);var n=this.count;s.colorMask(!1,!1,!1,!1),s.stencilFunc(s.ALWAYS,0,255),s.stencilOp(s.KEEP,s.KEEP,s.INVERT),1===e.mode?(s.drawElements(s.TRIANGLE_FAN,e.indices.length-4,s.UNSIGNED_SHORT,0),this.reverse?(s.stencilFunc(s.EQUAL,255-n,255),s.stencilOp(s.KEEP,s.KEEP,s.DECR)):(s.stencilFunc(s.EQUAL,n,255),s.stencilOp(s.KEEP,s.KEEP,s.INCR)),s.drawElements(s.TRIANGLE_FAN,4,s.UNSIGNED_SHORT,2*(e.indices.length-4)),this.reverse?s.stencilFunc(s.EQUAL,255-(n+1),255):s.stencilFunc(s.EQUAL,n+1,255),this.reverse=!this.reverse):(this.reverse?(s.stencilFunc(s.EQUAL,n,255),s.stencilOp(s.KEEP,s.KEEP,s.INCR)):(s.stencilFunc(s.EQUAL,255-n,255),s.stencilOp(s.KEEP,s.KEEP,s.DECR)),s.drawElements(s.TRIANGLE_STRIP,e.indices.length,s.UNSIGNED_SHORT,0),this.reverse?s.stencilFunc(s.EQUAL,n+1,255):s.stencilFunc(s.EQUAL,255-(n+1),255)),s.colorMask(!0,!0,!0,!0),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),this.count++},s.WebGLStencilManager.prototype.bindGraphics=function(t,e,i){this._currentGraphics=t;var s,n=this.gl,r=i.projection,o=i.offset;1===e.mode?(s=i.shaderManager.complexPrimitiveShader,i.shaderManager.setShader(s),n.uniform1f(s.flipY,i.flipY),n.uniformMatrix3fv(s.translationMatrix,!1,t.worldTransform.toArray(!0)),n.uniform2f(s.projectionVector,r.x,-r.y),n.uniform2f(s.offsetVector,-o.x,-o.y),n.uniform3fv(s.tintColor,Phaser.Color.hexToRGBArray(t.tint)),n.uniform3fv(s.color,e.color),n.uniform1f(s.alpha,t.worldAlpha*e.alpha),n.bindBuffer(n.ARRAY_BUFFER,e.buffer),n.vertexAttribPointer(s.aVertexPosition,2,n.FLOAT,!1,8,0),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.indexBuffer)):(s=i.shaderManager.primitiveShader,i.shaderManager.setShader(s),n.uniformMatrix3fv(s.translationMatrix,!1,t.worldTransform.toArray(!0)),n.uniform1f(s.flipY,i.flipY),n.uniform2f(s.projectionVector,r.x,-r.y),n.uniform2f(s.offsetVector,-o.x,-o.y),n.uniform3fv(s.tintColor,Phaser.Color.hexToRGBArray(t.tint)),n.uniform1f(s.alpha,t.worldAlpha),n.bindBuffer(n.ARRAY_BUFFER,e.buffer),n.vertexAttribPointer(s.aVertexPosition,2,n.FLOAT,!1,24,0),n.vertexAttribPointer(s.colorAttribute,4,n.FLOAT,!1,24,8),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.indexBuffer))},s.WebGLStencilManager.prototype.popStencil=function(t,e,i){var s=this.gl;if(this.stencilStack.pop(),this.count--,0===this.stencilStack.length)s.disable(s.STENCIL_TEST);else{var n=this.count;this.bindGraphics(t,e,i),s.colorMask(!1,!1,!1,!1),1===e.mode?(this.reverse=!this.reverse,this.reverse?(s.stencilFunc(s.EQUAL,255-(n+1),255),s.stencilOp(s.KEEP,s.KEEP,s.INCR)):(s.stencilFunc(s.EQUAL,n+1,255),s.stencilOp(s.KEEP,s.KEEP,s.DECR)),s.drawElements(s.TRIANGLE_FAN,4,s.UNSIGNED_SHORT,2*(e.indices.length-4)),s.stencilFunc(s.ALWAYS,0,255),s.stencilOp(s.KEEP,s.KEEP,s.INVERT),s.drawElements(s.TRIANGLE_FAN,e.indices.length-4,s.UNSIGNED_SHORT,0),this.reverse?s.stencilFunc(s.EQUAL,n,255):s.stencilFunc(s.EQUAL,255-n,255)):(this.reverse?(s.stencilFunc(s.EQUAL,n+1,255),s.stencilOp(s.KEEP,s.KEEP,s.DECR)):(s.stencilFunc(s.EQUAL,255-(n+1),255),s.stencilOp(s.KEEP,s.KEEP,s.INCR)),s.drawElements(s.TRIANGLE_STRIP,e.indices.length,s.UNSIGNED_SHORT,0),this.reverse?s.stencilFunc(s.EQUAL,n,255):s.stencilFunc(s.EQUAL,255-n,255)),s.colorMask(!0,!0,!0,!0),s.stencilOp(s.KEEP,s.KEEP,s.KEEP)}},s.WebGLStencilManager.prototype.destroy=function(){this.stencilStack=null,this.gl=null},s.WebGLShaderManager=function(){this.maxAttibs=10,this.attribState=[],this.tempAttribState=[];for(var t=0;t<this.maxAttibs;t++)this.attribState[t]=!1;this.stack=[]},s.WebGLShaderManager.prototype.constructor=s.WebGLShaderManager,s.WebGLShaderManager.prototype.setContext=function(t){this.gl=t,this.primitiveShader=new s.PrimitiveShader(t),this.complexPrimitiveShader=new s.ComplexPrimitiveShader(t),this.defaultShader=new s.PixiShader(t),this.fastShader=new s.PixiFastShader(t),this.stripShader=new s.StripShader(t),this.creatureShader=s.CreatureShader?new s.CreatureShader(t):null,this.setShader(this.defaultShader)},s.WebGLShaderManager.prototype.setAttribs=function(t){var e;for(e=0;e<this.tempAttribState.length;e++)this.tempAttribState[e]=!1;for(e=0;e<t.length;e++){var i=t[e];this.tempAttribState[i]=!0}var s=this.gl;for(e=0;e<this.attribState.length;e++)this.attribState[e]!==this.tempAttribState[e]&&(this.attribState[e]=this.tempAttribState[e],this.tempAttribState[e]?s.enableVertexAttribArray(e):s.disableVertexAttribArray(e))},s.WebGLShaderManager.prototype.setShader=function(t){return this._currentId!==t._UID&&(this._currentId=t._UID,this.currentShader=t,this.gl.useProgram(t.program),this.setAttribs(t.attributes),!0)},s.WebGLShaderManager.prototype.destroy=function(){this.attribState=null,this.tempAttribState=null,this.primitiveShader.destroy(),this.complexPrimitiveShader.destroy(),this.defaultShader.destroy(),this.fastShader.destroy(),this.stripShader.destroy(),this.creatureShader&&this.creatureShader.destroy(),this.gl=null},s.WebGLSpriteBatch=function(t){this.game=t,this.vertSize=5,this.size=2e3,this.vertexSize=24;var e=this.vertexSize*this.size*4,i=6*this.size;this.vertices=new ArrayBuffer(e),this.positions=new Float32Array(this.vertices),this.colors=new Uint32Array(this.vertices),this.indices=new Uint16Array(i),this.lastIndexCount=0;for(var s=0,n=0;s<i;s+=6,n+=4)this.indices[s+0]=n+0,this.indices[s+1]=n+1,this.indices[s+2]=n+2,this.indices[s+3]=n+0,this.indices[s+4]=n+2,this.indices[s+5]=n+3;this.drawing=!1,this.currentBatchSize=0,this.currentBaseTexture=null,this.dirty=!0,this.textures=[],this.blendModes=[],this.shaders=[],this.sprites=[],this.defaultShader=null},s.WebGLSpriteBatch.prototype.setContext=function(t){if(this.MAX_TEXTURES=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),this.gl=t,s._enableMultiTextureToggle){for(var e="\tif (vTextureIndex == 0.0) {gl_FragColor = texture2D(uSamplerArray[0], vTextureCoord) * vColor;return;}\n",i=1;i<this.MAX_TEXTURES;++i)e+="\tif (vTextureIndex == "+i+".0) {gl_FragColor = texture2D(uSamplerArray["+i+"], vTextureCoord) * vColor;return;}\n";this.defaultShader=new Phaser.Filter(this.game,void 0,["//WebGLSpriteBatch Fragment Shader.","precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","varying float vTextureIndex;","uniform sampler2D uSamplerArray["+this.MAX_TEXTURES+"];","void main(void) {",e,"\tgl_FragColor = texture2D(uSamplerArray[0], vTextureCoord) * vColor;","}"])}else this.defaultShader=new Phaser.Filter(this.game,void 0,["//WebGLSpriteBatch Fragment Shader.","precision lowp float;","varying vec2 vTextureCoord;","varying vec4 vColor;","varying float vTextureIndex;","uniform sampler2D uSampler;","void main(void) {","   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;","}"]);this.vertexBuffer=t.createBuffer(),this.indexBuffer=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.indices,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bufferData(t.ARRAY_BUFFER,this.vertices,t.DYNAMIC_DRAW),this.currentBlendMode=99999;var n=new s.PixiShader(t);n.fragmentSrc=this.defaultShader.fragmentSrc,n.uniforms={},n.init(),this.defaultShader.shaders[t.id]=n},s.WebGLSpriteBatch.prototype.begin=function(t){this.renderSession=t,this.shader=this.renderSession.shaderManager.defaultShader,this.start()},s.WebGLSpriteBatch.prototype.end=function(){this.flush()},s.WebGLSpriteBatch.prototype.render=function(t,e){var i=t.texture,n=i.baseTexture,r=this.gl;s.WebGLRenderer.textureArray[n.textureIndex]!=n&&(this.flush(),r.activeTexture(r.TEXTURE0+n.textureIndex),r.bindTexture(r.TEXTURE_2D,n._glTextures[r.id]),s.WebGLRenderer.textureArray[n.textureIndex]=n);var o=t.worldTransform;e&&(o=e),this.currentBatchSize>=this.size&&(this.flush(),this.currentBaseTexture=i.baseTexture);var a=i._uvs;if(a){var h,u,l,c,d=t.anchor.x,p=t.anchor.y;if(i.trim){var f=i.trim;h=(u=f.x-d*f.width)+i.crop.width,l=(c=f.y-p*f.height)+i.crop.height}else h=i.frame.width*(1-d),u=i.frame.width*-d,l=i.frame.height*(1-p),c=i.frame.height*-p;var g=this.currentBatchSize*this.vertexSize,m=(this.currentBatchSize,i.baseTexture.resolution),y=i.baseTexture.textureIndex,v=o.a/m,x=o.b/m,_=o.c/m,b=o.d/m,T=o.tx,w=o.ty,C=(i.crop.width,i.crop.height);if(i.rotated){var S=o.a,P=o.b,E=o.c,A=o.d,R=u,M=h;T=o.c*C+T,w=o.d*C+w,v=6.123233995736766e-17*S-E,x=6.123233995736766e-17*P-A,_=S+6.123233995736766e-17*E,b=P+6.123233995736766e-17*A,i._updateUvsInverted(),h=l,u=c,l=M,c=R}var I=this.colors,L=this.positions,O=t.tint,k=(O>>16)+(65280&O)+((255&O)<<16)+(255*t.worldAlpha<<24);this.renderSession.roundPixels?(L[g++]=v*u+_*c+T|0,L[g++]=b*c+x*u+w|0,L[g++]=a.x0,L[g++]=a.y0,I[g++]=k,L[g++]=y,L[g++]=v*h+_*c+T|0,L[g++]=b*c+x*h+w|0,L[g++]=a.x1,L[g++]=a.y1,I[g++]=k,L[g++]=y,L[g++]=v*h+_*l+T|0,L[g++]=b*l+x*h+w|0,L[g++]=a.x2,L[g++]=a.y2,I[g++]=k,L[g++]=y,L[g++]=v*u+_*l+T|0,L[g++]=b*l+x*u+w|0,L[g++]=a.x3,L[g++]=a.y3,I[g++]=k,L[g++]=y):(L[g++]=v*u+_*c+T,L[g++]=b*c+x*u+w,L[g++]=a.x0,L[g++]=a.y0,I[g++]=k,L[g++]=y,L[g++]=v*h+_*c+T,L[g++]=b*c+x*h+w,L[g++]=a.x1,L[g++]=a.y1,I[g++]=k,L[g++]=y,L[g++]=v*h+_*l+T,L[g++]=b*l+x*h+w,L[g++]=a.x2,L[g++]=a.y2,I[g++]=k,L[g++]=y,L[g++]=v*u+_*l+T,L[g++]=b*l+x*u+w,L[g++]=a.x3,L[g++]=a.y3,I[g++]=k,L[g++]=y),this.sprites[this.currentBatchSize++]=t}},s.WebGLSpriteBatch.prototype.renderTilingSprite=function(t){var e=t.tilingTexture,i=e.baseTexture,n=this.gl,r=t.texture.baseTexture.textureIndex;s.WebGLRenderer.textureArray[r]!=i&&(this.flush(),n.activeTexture(n.TEXTURE0+r),n.bindTexture(n.TEXTURE_2D,i._glTextures[n.id]),s.WebGLRenderer.textureArray[r]=i),this.currentBatchSize>=this.size&&(this.flush(),this.currentBaseTexture=e.baseTexture),t._uvs||(t._uvs=new s.TextureUvs);var o=t._uvs,a=e.baseTexture.width,h=e.baseTexture.height;t.tilePosition.x%=a*t.tileScaleOffset.x,t.tilePosition.y%=h*t.tileScaleOffset.y;var u=t.tilePosition.x/(a*t.tileScaleOffset.x),l=t.tilePosition.y/(h*t.tileScaleOffset.y),c=t.width/a/(t.tileScale.x*t.tileScaleOffset.x),d=t.height/h/(t.tileScale.y*t.tileScaleOffset.y);o.x0=0-u,o.y0=0-l,o.x1=1*c-u,o.y1=0-l,o.x2=1*c-u,o.y2=1*d-l,o.x3=0-u,o.y3=1*d-l;var p=t.tint,f=(p>>16)+(65280&p)+((255&p)<<16)+(255*t.worldAlpha<<24),g=this.positions,m=this.colors,y=t.width,v=t.height,x=t.anchor.x,_=t.anchor.y,b=y*(1-x),T=y*-x,w=v*(1-_),C=v*-_,S=this.currentBatchSize*this.vertexSize,P=e.baseTexture.resolution,E=t.worldTransform,A=E.a/P,R=E.b/P,M=E.c/P,I=E.d/P,L=E.tx,O=E.ty;g[S++]=A*T+M*C+L,g[S++]=I*C+R*T+O,g[S++]=o.x0,g[S++]=o.y0,m[S++]=f,g[S++]=r,g[S++]=A*b+M*C+L,g[S++]=I*C+R*b+O,g[S++]=o.x1,g[S++]=o.y1,m[S++]=f,g[S++]=r,g[S++]=A*b+M*w+L,g[S++]=I*w+R*b+O,g[S++]=o.x2,g[S++]=o.y2,m[S++]=f,g[S++]=r,g[S++]=A*T+M*w+L,g[S++]=I*w+R*T+O,g[S++]=o.x3,g[S++]=o.y3,m[S++]=f,g[S++]=r,this.sprites[this.currentBatchSize++]=t},s.WebGLSpriteBatch.prototype.flush=function(){if(0!==this.currentBatchSize){var t,e=this.gl;if(this.dirty){this.dirty=!1,t=this.defaultShader.shaders[e.id],e.activeTexture(e.TEXTURE0),e.bindBuffer(e.ARRAY_BUFFER,this.vertexBuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var i=this.vertexSize;e.vertexAttribPointer(t.aVertexPosition,2,e.FLOAT,!1,i,0),e.vertexAttribPointer(t.aTextureCoord,2,e.FLOAT,!1,i,8),e.vertexAttribPointer(t.colorAttribute,4,e.UNSIGNED_BYTE,!0,i,16),e.vertexAttribPointer(t.aTextureIndex,1,e.FLOAT,!1,i,20)}if(this.currentBatchSize>.5*this.size)e.bufferSubData(e.ARRAY_BUFFER,0,this.vertices);else{e.bindBuffer(e.ARRAY_BUFFER,this.vertexBuffer);var n=this.positions.subarray(0,this.currentBatchSize*this.vertexSize);e.bufferSubData(e.ARRAY_BUFFER,0,n)}for(var r,o,a,h,u=0,l=0,c=null,d=this.renderSession.blendModeManager.currentBlendMode,p=null,f=!1,g=!1,m=0,y=this.currentBatchSize;m<y;m++){r=(h=this.sprites[m]).tilingTexture?h.tilingTexture.baseTexture:h.texture.baseTexture,f=d!==(o=h.blendMode),g=p!==(a=h.shader||this.defaultShader);var v=r.skipRender;if(v&&h.children.length>0&&(v=!1),(f||g)&&(this.renderBatch(c,u,l),l=m,u=0,c=r,f&&(d=o,this.renderSession.blendModeManager.setBlendMode(d)),g)){(t=(p=a).shaders[e.id])||((t=new s.PixiShader(e)).fragmentSrc=p.fragmentSrc,t.uniforms=p.uniforms,t.init(),p.shaders[e.id]=t),this.renderSession.shaderManager.setShader(t),t.dirty&&t.syncUniforms();var x=this.renderSession.projection;e.uniform2f(t.projectionVector,x.x,x.y);var _=this.renderSession.offset;e.uniform2f(t.offsetVector,_.x,_.y)}u++}this.renderBatch(c,u,l),this.currentBatchSize=0}},s.WebGLSpriteBatch.prototype.renderBatch=function(t,e,i){if(0!==e){var s=this.gl;if(t._dirty[s.id]){if(!this.renderSession.renderer.updateTexture(t))return}else s.bindTexture(s.TEXTURE_2D,t._glTextures[s.id]);s.drawElements(s.TRIANGLES,6*e,s.UNSIGNED_SHORT,6*i*2),this.renderSession.drawCount++}},s.WebGLSpriteBatch.prototype.stop=function(){this.flush(),this.dirty=!0},s.WebGLSpriteBatch.prototype.start=function(){this.dirty=!0},s.WebGLSpriteBatch.prototype.destroy=function(){this.vertices=null,this.indices=null,this.gl.deleteBuffer(this.vertexBuffer),this.gl.deleteBuffer(this.indexBuffer),this.currentBaseTexture=null,this.gl=null},s.WebGLFastSpriteBatch=function(t){this.vertSize=11,this.maxSize=6e3,this.size=this.maxSize;var e=4*this.size*this.vertSize,i=6*this.maxSize;this.vertices=new Float32Array(e),this.indices=new Uint16Array(i),this.vertexBuffer=null,this.indexBuffer=null,this.lastIndexCount=0;for(var s=0,n=0;s<i;s+=6,n+=4)this.indices[s+0]=n+0,this.indices[s+1]=n+1,this.indices[s+2]=n+2,this.indices[s+3]=n+0,this.indices[s+4]=n+2,this.indices[s+5]=n+3;this.drawing=!1,this.currentBatchSize=0,this.currentBaseTexture=null,this.currentBlendMode=0,this.renderSession=null,this.shader=null,this.matrix=null,this.setContext(t)},s.WebGLFastSpriteBatch.prototype.constructor=s.WebGLFastSpriteBatch,s.WebGLFastSpriteBatch.prototype.setContext=function(t){this.gl=t,this.vertexBuffer=t.createBuffer(),this.indexBuffer=t.createBuffer(),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.indices,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bufferData(t.ARRAY_BUFFER,this.vertices,t.DYNAMIC_DRAW)},s.WebGLFastSpriteBatch.prototype.begin=function(t,e){this.renderSession=e,this.shader=this.renderSession.shaderManager.fastShader,this.matrix=t.worldTransform.toArray(!0),this.start()},s.WebGLFastSpriteBatch.prototype.end=function(){this.flush()},s.WebGLFastSpriteBatch.prototype.render=function(t){var e=t.children,i=e[0];if(i.texture._uvs){this.currentBaseTexture=i.texture.baseTexture,i.blendMode!==this.renderSession.blendModeManager.currentBlendMode&&(this.flush(),this.renderSession.blendModeManager.setBlendMode(i.blendMode));for(var s=0,n=e.length;s<n;s++)this.renderSprite(e[s]);this.flush()}},s.WebGLFastSpriteBatch.prototype.renderSprite=function(t){var e=t.texture.baseTexture,i=this.gl,n=t.texture.baseTexture.textureIndex;if((s.WebGLRenderer.textureArray[n]==e||!e._glTextures[i.id]||t.texture.baseTexture.skipRender||(this.flush(),i.activeTexture(i.TEXTURE0+n),i.bindTexture(i.TEXTURE_2D,e._glTextures[i.id]),s.WebGLRenderer.textureArray[n]=e,t.texture._uvs))&&t.visible){var r,o,a,h,u,l,c=this.vertices;if(r=t.texture._uvs,t.texture.frame.width,t.texture.frame.height,t.texture.trim){var d=t.texture.trim;o=(a=d.x-t.anchor.x*d.width)+t.texture.crop.width,h=(u=d.y-t.anchor.y*d.height)+t.texture.crop.height}else o=t.texture.frame.width*(1-t.anchor.x),a=t.texture.frame.width*-t.anchor.x,h=t.texture.frame.height*(1-t.anchor.y),u=t.texture.frame.height*-t.anchor.y;l=4*this.currentBatchSize*this.vertSize,c[l++]=a,c[l++]=u,c[l++]=t.position.x,c[l++]=t.position.y,c[l++]=t.scale.x,c[l++]=t.scale.y,c[l++]=t.rotation,c[l++]=r.x0,c[l++]=r.y1,c[l++]=t.alpha,c[l++]=n,c[l++]=o,c[l++]=u,c[l++]=t.position.x,c[l++]=t.position.y,c[l++]=t.scale.x,c[l++]=t.scale.y,c[l++]=t.rotation,c[l++]=r.x1,c[l++]=r.y1,c[l++]=t.alpha,c[l++]=n,c[l++]=o,c[l++]=h,c[l++]=t.position.x,c[l++]=t.position.y,c[l++]=t.scale.x,c[l++]=t.scale.y,c[l++]=t.rotation,c[l++]=r.x2,c[l++]=r.y2,c[l++]=t.alpha,c[l++]=n,c[l++]=a,c[l++]=h,c[l++]=t.position.x,c[l++]=t.position.y,c[l++]=t.scale.x,c[l++]=t.scale.y,c[l++]=t.rotation,c[l++]=r.x3,c[l++]=r.y3,c[l++]=t.alpha,c[l++]=n,++this.currentBatchSize>=this.size&&this.flush()}},s.WebGLFastSpriteBatch.prototype.flush=function(){if(0!==this.currentBatchSize){var t=this.gl;if(this.currentBaseTexture._glTextures[t.id]){if(this.currentBatchSize>.5*this.size)t.bufferSubData(t.ARRAY_BUFFER,0,this.vertices);else{var e=this.vertices.subarray(0,4*this.currentBatchSize*this.vertSize);t.bufferSubData(t.ARRAY_BUFFER,0,e)}t.drawElements(t.TRIANGLES,6*this.currentBatchSize,t.UNSIGNED_SHORT,0),this.currentBatchSize=0,this.renderSession.drawCount++}else this.renderSession.renderer.updateTexture(this.currentBaseTexture,t)}},s.WebGLFastSpriteBatch.prototype.stop=function(){this.flush()},s.WebGLFastSpriteBatch.prototype.start=function(){var t=this.gl;t.activeTexture(t.TEXTURE0),t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer);var e=this.renderSession.projection;t.uniform2f(this.shader.projectionVector,e.x,e.y),t.uniformMatrix3fv(this.shader.uMatrix,!1,this.matrix);var i=4*this.vertSize;t.vertexAttribPointer(this.shader.aVertexPosition,2,t.FLOAT,!1,i,0),t.vertexAttribPointer(this.shader.aPositionCoord,2,t.FLOAT,!1,i,8),t.vertexAttribPointer(this.shader.aScale,2,t.FLOAT,!1,i,16),t.vertexAttribPointer(this.shader.aRotation,1,t.FLOAT,!1,i,24),t.vertexAttribPointer(this.shader.aTextureCoord,2,t.FLOAT,!1,i,28),t.vertexAttribPointer(this.shader.colorAttribute,1,t.FLOAT,!1,i,36),t.vertexAttribPointer(this.shader.aTextureIndex,1,t.FLOAT,!1,i,40)},s.WebGLFilterManager=function(){this.filterStack=[],this.offsetX=0,this.offsetY=0},s.WebGLFilterManager.prototype.constructor=s.WebGLFilterManager,s.WebGLFilterManager.prototype.setContext=function(t){this.gl=t,this.texturePool=[],this.initShaderBuffers()},s.WebGLFilterManager.prototype.begin=function(t,e){this.renderSession=t,this.defaultShader=t.shaderManager.defaultShader;var i=this.renderSession.projection;this.width=2*i.x,this.height=2*-i.y,this.buffer=e},s.WebGLFilterManager.prototype.pushFilter=function(t){var e=this.gl,i=this.renderSession.projection,n=this.renderSession.offset;t._filterArea=t.target.filterArea||t.target.getBounds(),t._previous_stencil_mgr=this.renderSession.stencilManager,this.renderSession.stencilManager=new s.WebGLStencilManager,this.renderSession.stencilManager.setContext(e),e.disable(e.STENCIL_TEST),this.filterStack.push(t);var r=t.filterPasses[0];this.offsetX+=t._filterArea.x,this.offsetY+=t._filterArea.y;var o=this.texturePool.pop();o?o.resize(this.width*this.renderSession.resolution,this.height*this.renderSession.resolution):o=new s.FilterTexture(this.gl,this.width*this.renderSession.resolution,this.height*this.renderSession.resolution),e.bindTexture(e.TEXTURE_2D,o.texture);var a=t._filterArea,h=r.padding;a.x-=h,a.y-=h,a.width+=2*h,a.height+=2*h,a.x<0&&(a.x=0),a.width>this.width&&(a.width=this.width),a.y<0&&(a.y=0),a.height>this.height&&(a.height=this.height),e.bindFramebuffer(e.FRAMEBUFFER,o.frameBuffer),e.viewport(0,0,a.width*this.renderSession.resolution,a.height*this.renderSession.resolution),i.x=a.width/2,i.y=-a.height/2,n.x=-a.x,n.y=-a.y,e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),t._glFilterTexture=o},s.WebGLFilterManager.prototype.popFilter=function(){var t=this.gl,e=this.filterStack.pop(),i=e._filterArea,n=e._glFilterTexture,r=this.renderSession.projection,o=this.renderSession.offset;if(e.filterPasses.length>1){t.viewport(0,0,i.width*this.renderSession.resolution,i.height*this.renderSession.resolution),t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),this.vertexArray[0]=0,this.vertexArray[1]=i.height,this.vertexArray[2]=i.width,this.vertexArray[3]=i.height,this.vertexArray[4]=0,this.vertexArray[5]=0,this.vertexArray[6]=i.width,this.vertexArray[7]=0,t.bufferSubData(t.ARRAY_BUFFER,0,this.vertexArray),t.bindBuffer(t.ARRAY_BUFFER,this.uvBuffer),this.uvArray[2]=i.width/this.width,this.uvArray[5]=i.height/this.height,this.uvArray[6]=i.width/this.width,this.uvArray[7]=i.height/this.height,t.bufferSubData(t.ARRAY_BUFFER,0,this.uvArray);var a=n,h=this.texturePool.pop();h||(h=new s.FilterTexture(this.gl,this.width*this.renderSession.resolution,this.height*this.renderSession.resolution)),h.resize(this.width*this.renderSession.resolution,this.height*this.renderSession.resolution),t.bindFramebuffer(t.FRAMEBUFFER,h.frameBuffer),t.clear(t.COLOR_BUFFER_BIT),t.disable(t.BLEND);for(var u=0;u<e.filterPasses.length-1;u++){var l=e.filterPasses[u];t.bindFramebuffer(t.FRAMEBUFFER,h.frameBuffer),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,a.texture),this.applyFilterPass(l,i,i.width,i.height);var c=a;a=h,h=c}t.enable(t.BLEND),n=a,this.texturePool.push(h)}var d=e.filterPasses[e.filterPasses.length-1];this.offsetX-=i.x,this.offsetY-=i.y;var p=this.width,f=this.height,g=0,m=0,y=this.buffer;if(0===this.filterStack.length)t.colorMask(!0,!0,!0,!0);else{var v=this.filterStack[this.filterStack.length-1];p=(i=v._filterArea).width,f=i.height,g=i.x,m=i.y,y=v._glFilterTexture.frameBuffer}r.x=p/2,r.y=-f/2,o.x=g,o.y=m;var x=(i=e._filterArea).x-g,_=i.y-m;t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),this.vertexArray[0]=x,this.vertexArray[1]=_+i.height,this.vertexArray[2]=x+i.width,this.vertexArray[3]=_+i.height,this.vertexArray[4]=x,this.vertexArray[5]=_,this.vertexArray[6]=x+i.width,this.vertexArray[7]=_,t.bufferSubData(t.ARRAY_BUFFER,0,this.vertexArray),t.bindBuffer(t.ARRAY_BUFFER,this.uvBuffer),this.uvArray[2]=i.width/this.width,this.uvArray[5]=i.height/this.height,this.uvArray[6]=i.width/this.width,this.uvArray[7]=i.height/this.height,t.bufferSubData(t.ARRAY_BUFFER,0,this.uvArray),t.viewport(0,0,p*this.renderSession.resolution,f*this.renderSession.resolution),t.bindFramebuffer(t.FRAMEBUFFER,y),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,n.texture),this.renderSession.stencilManager&&this.renderSession.stencilManager.destroy(),this.renderSession.stencilManager=e._previous_stencil_mgr,e._previous_stencil_mgr=null,this.renderSession.stencilManager.count>0?t.enable(t.STENCIL_TEST):t.disable(t.STENCIL_TEST),this.applyFilterPass(d,i,p,f),this.texturePool.push(n),e._glFilterTexture=null},s.WebGLFilterManager.prototype.applyFilterPass=function(t,e,i,n){var r=this.gl,o=t.shaders[r.id];o||((o=new s.PixiShader(r)).fragmentSrc=t.fragmentSrc,o.uniforms=t.uniforms,o.init(!0),t.shaders[r.id]=o),this.renderSession.shaderManager.setShader(o),r.uniform2f(o.projectionVector,i/2,-n/2),r.uniform2f(o.offsetVector,0,0),t.uniforms.dimensions&&(t.uniforms.dimensions.value[0]=this.width,t.uniforms.dimensions.value[1]=this.height,t.uniforms.dimensions.value[2]=this.vertexArray[0],t.uniforms.dimensions.value[3]=this.vertexArray[5]),o.syncUniforms(),r.bindBuffer(r.ARRAY_BUFFER,this.vertexBuffer),r.vertexAttribPointer(o.aVertexPosition,2,r.FLOAT,!1,0,0),r.bindBuffer(r.ARRAY_BUFFER,this.uvBuffer),r.vertexAttribPointer(o.aTextureCoord,2,r.FLOAT,!1,0,0),r.bindBuffer(r.ARRAY_BUFFER,this.colorBuffer),r.vertexAttribPointer(o.colorAttribute,2,r.FLOAT,!1,0,0),r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,this.indexBuffer),r.drawElements(r.TRIANGLES,6,r.UNSIGNED_SHORT,0),this.renderSession.drawCount++},s.WebGLFilterManager.prototype.initShaderBuffers=function(){var t=this.gl;this.vertexBuffer=t.createBuffer(),this.uvBuffer=t.createBuffer(),this.colorBuffer=t.createBuffer(),this.indexBuffer=t.createBuffer(),this.vertexArray=new Float32Array([0,0,1,0,0,1,1,1]),t.bindBuffer(t.ARRAY_BUFFER,this.vertexBuffer),t.bufferData(t.ARRAY_BUFFER,this.vertexArray,t.STATIC_DRAW),this.uvArray=new Float32Array([0,0,1,0,0,1,1,1]),t.bindBuffer(t.ARRAY_BUFFER,this.uvBuffer),t.bufferData(t.ARRAY_BUFFER,this.uvArray,t.STATIC_DRAW),this.colorArray=new Float32Array([1,16777215,1,16777215,1,16777215,1,16777215]),t.bindBuffer(t.ARRAY_BUFFER,this.colorBuffer),t.bufferData(t.ARRAY_BUFFER,this.colorArray,t.STATIC_DRAW),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,1,3,2]),t.STATIC_DRAW)},s.WebGLFilterManager.prototype.destroy=function(){var t=this.gl;this.filterStack=null,this.offsetX=0,this.offsetY=0;for(var e=0;e<this.texturePool.length;e++)this.texturePool[e].destroy();this.texturePool=null,t.deleteBuffer(this.vertexBuffer),t.deleteBuffer(this.uvBuffer),t.deleteBuffer(this.colorBuffer),t.deleteBuffer(this.indexBuffer)};var n={36054:"Incomplete attachment",36055:"Missing attachment",36057:"Incomplete dimensions",36061:"Framebuffer unsupported"};return s.FilterTexture=function(t,i,n,r,o){o="number"==typeof o?o:0,this.gl=t,this.frameBuffer=e(t,i,n,r||s.scaleModes.DEFAULT,o),this.texture=this.frameBuffer.targetTexture,this.width=i,this.height=n,this.renderBuffer=this.frameBuffer.renderBuffer},s.FilterTexture.prototype.constructor=s.FilterTexture,s.FilterTexture.prototype.clear=function(){var t=this.gl;t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT)},s.FilterTexture.prototype.resize=function(t,e){if(this.width!==t||this.height!==e){this.width=t,this.height=e;var i=this.gl;i.bindTexture(i.TEXTURE_2D,this.texture),i.texImage2D(i.TEXTURE_2D,0,i.RGBA,t,e,0,i.RGBA,i.UNSIGNED_BYTE,null),i.bindRenderbuffer(i.RENDERBUFFER,this.renderBuffer),i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,t,e)}},s.FilterTexture.prototype.destroy=function(){var t=this.gl;t.deleteFramebuffer(this.frameBuffer),t.deleteTexture(this.texture),this.frameBuffer=null,this.texture=null},s.CanvasBuffer=function(t,e){this.width=t,this.height=e,this.canvas=Phaser.CanvasPool.create(this,this.width,this.height),this.context=this.canvas.getContext("2d"),this.canvas.width=t,this.canvas.height=e},s.CanvasBuffer.prototype.constructor=s.CanvasBuffer,s.CanvasBuffer.prototype.clear=function(){this.context.setTransform(1,0,0,1,0,0),this.context.clearRect(0,0,this.width,this.height)},s.CanvasBuffer.prototype.resize=function(t,e){this.width=this.canvas.width=t,this.height=this.canvas.height=e},s.CanvasBuffer.prototype.destroy=function(){Phaser.CanvasPool.remove(this)},s.CanvasMaskManager=function(){},s.CanvasMaskManager.prototype.constructor=s.CanvasMaskManager,s.CanvasMaskManager.prototype.pushMask=function(t,e){var i=e.context;i.save();var n=t.alpha,r=t.worldTransform,o=e.resolution;i.setTransform(r.a*o,r.b*o,r.c*o,r.d*o,r.tx*o,r.ty*o),s.CanvasGraphics.renderGraphicsMask(t,i),i.clip(),t.worldAlpha=n},s.CanvasMaskManager.prototype.popMask=function(t){t.context.restore()},s.CanvasTinter=function(){},s.CanvasTinter.getTintedTexture=function(t,e){var i=t.tintedTexture||Phaser.CanvasPool.create(this);return s.CanvasTinter.tintMethod(t.texture,e,i),i},s.CanvasTinter.tintWithMultiply=function(t,e,i){var s=i.getContext("2d"),n=t.crop,r=n.width,o=n.height;t.rotated&&(r=o,o=n.width),i.width===r&&i.height===o||(i.width=r,i.height=o),s.clearRect(0,0,r,o),s.fillStyle="#"+("00000"+(0|e).toString(16)).substr(-6),s.fillRect(0,0,r,o),s.globalCompositeOperation="multiply",s.drawImage(t.baseTexture.source,n.x,n.y,r,o,0,0,r,o),s.globalCompositeOperation="destination-atop",s.drawImage(t.baseTexture.source,n.x,n.y,r,o,0,0,r,o)},s.CanvasTinter.tintWithPerPixel=function(t,e,i){var n=i.getContext("2d"),r=t.crop,o=r.width,a=r.height;t.rotated&&(o=a,a=r.width),i.width===o&&i.height===a||(i.width=o,i.height=a),n.globalCompositeOperation="copy",n.drawImage(t.baseTexture.source,r.x,r.y,o,a,0,0,o,a);for(var h=Phaser.Color.hexToRGBArray(e),u=h[0],l=h[1],c=h[2],d=n.getImageData(0,0,o,a),p=d.data,f=0;f<p.length;f+=4)if(p[f+0]*=u,p[f+1]*=l,p[f+2]*=c,!s.CanvasTinter.canHandleAlpha){var g=p[f+3];p[f+0]/=255/g,p[f+1]/=255/g,p[f+2]/=255/g}n.putImageData(d,0,0)},s.CanvasRenderer=function(t,e){this.game=t,s.defaultRenderer||(s.defaultRenderer=this),this.type=Phaser.CANVAS,this.resolution=t.resolution,this.clearBeforeRender=t.clearBeforeRender,this.transparent=t.transparent,this.autoResize=!1,this.width=t.width*this.resolution,this.height=t.height*this.resolution,this.view=t.canvas,this.context=this.view.getContext("2d",{alpha:this.transparent}),this.refresh=!0,this.count=0,this.maskManager=new s.CanvasMaskManager,this.renderSession={context:this.context,maskManager:this.maskManager,scaleMode:null,smoothProperty:Phaser.Canvas.getSmoothingPrefix(this.context),roundPixels:e.roundPixels||!1},this.mapBlendModes(),this.resize(this.width,this.height)},s.CanvasRenderer.prototype.constructor=s.CanvasRenderer,s.CanvasRenderer.prototype.render=function(t){this.context.setTransform(1,0,0,1,0,0),this.context.globalAlpha=1,this.renderSession.currentBlendMode=0,this.renderSession.shakeX=this.game.camera._shake.x,this.renderSession.shakeY=this.game.camera._shake.y,this.context.globalCompositeOperation="source-over",navigator.isCocoonJS&&this.view.screencanvas&&(this.context.fillStyle="black",this.context.clear()),this.clearBeforeRender&&(this.transparent?this.context.clearRect(0,0,this.width,this.height):t._bgColor&&(this.context.fillStyle=t._bgColor.rgba,this.context.fillRect(0,0,this.width,this.height))),this.renderDisplayObject(t)},s.CanvasRenderer.prototype.setTexturePriority=function(t){},s.CanvasRenderer.prototype.destroy=function(t){void 0===t&&(t=!0),t&&this.view.parent&&this.view.parent.removeChild(this.view),this.view=null,this.context=null,this.maskManager=null,this.renderSession=null},s.CanvasRenderer.prototype.resize=function(t,e){this.width=t*this.resolution,this.height=e*this.resolution,this.view.width=this.width,this.view.height=this.height,this.autoResize&&(this.view.style.width=this.width/this.resolution+"px",this.view.style.height=this.height/this.resolution+"px"),this.renderSession.smoothProperty&&(this.context[this.renderSession.smoothProperty]=this.renderSession.scaleMode===s.scaleModes.LINEAR)},s.CanvasRenderer.prototype.renderDisplayObject=function(t,e,i){this.renderSession.context=e||this.context,this.renderSession.resolution=this.resolution,t._renderCanvas(this.renderSession,i)},s.CanvasRenderer.prototype.mapBlendModes=function(){if(!s.blendModesCanvas){var t=[],e=s.blendModes,i=this.game.device.canUseMultiply;t[e.NORMAL]="source-over",t[e.ADD]="lighter",t[e.MULTIPLY]=i?"multiply":"source-over",t[e.SCREEN]=i?"screen":"source-over",t[e.OVERLAY]=i?"overlay":"source-over",t[e.DARKEN]=i?"darken":"source-over",t[e.LIGHTEN]=i?"lighten":"source-over",t[e.COLOR_DODGE]=i?"color-dodge":"source-over",t[e.COLOR_BURN]=i?"color-burn":"source-over",t[e.HARD_LIGHT]=i?"hard-light":"source-over",t[e.SOFT_LIGHT]=i?"soft-light":"source-over",t[e.DIFFERENCE]=i?"difference":"source-over",t[e.EXCLUSION]=i?"exclusion":"source-over",t[e.HUE]=i?"hue":"source-over",t[e.SATURATION]=i?"saturation":"source-over",t[e.COLOR]=i?"color":"source-over",t[e.LUMINOSITY]=i?"luminosity":"source-over",s.blendModesCanvas=t}},s.BaseTexture=function(t,e,i){this.resolution=i||1,this.width=100,this.height=100,this.scaleMode=e||s.scaleModes.DEFAULT,this.hasLoaded=!1,this.source=t,this.premultipliedAlpha=!0,this._glTextures=[],this.mipmap=!1,this.textureIndex=0,this._dirty=[!0,!0,!0,!0],t&&((this.source.complete||this.source.getContext)&&this.source.width&&this.source.height&&(this.hasLoaded=!0,this.width=this.source.naturalWidth||this.source.width,this.height=this.source.naturalHeight||this.source.height,this.dirty()),this.skipRender=!1,this._powerOf2=!1)},s.BaseTexture.prototype.constructor=s.BaseTexture,s.BaseTexture.prototype.forceLoaded=function(t,e){this.hasLoaded=!0,this.width=t,this.height=e,this.dirty()},s.BaseTexture.prototype.destroy=function(){this.source&&Phaser.CanvasPool.removeByCanvas(this.source),this.source=null,this.unloadFromGPU()},s.BaseTexture.prototype.dirty=function(){for(var t=0;t<this._glTextures.length;t++)this._dirty[t]=!0},s.BaseTexture.prototype.unloadFromGPU=function(){this.dirty();for(var t=this._glTextures.length-1;t>=0;t--){var e=this._glTextures[t],i=s.glContexts[t];i&&e&&i.deleteTexture(e)}this._glTextures.length=0,this.dirty()},s.BaseTexture.fromCanvas=function(t,e,i){return 0===t.width&&(t.width=1),0===t.height&&(t.height=1),i=i||1,new s.BaseTexture(t,e,i)},s.TextureSilentFail=!1,s.Texture=function(t,e,i,n){this.noFrame=!1,e||(this.noFrame=!0,e=new s.Rectangle(0,0,1,1)),t instanceof s.Texture&&(t=t.baseTexture),this.baseTexture=t,this.frame=e,this.trim=n,this.valid=!1,this.isTiling=!1,this.requiresUpdate=!1,this.requiresReTint=!1,this._uvs=null,this.width=0,this.height=0,this.crop=i||new s.Rectangle(0,0,1,1),this.rotated=!1,t.hasLoaded&&(this.noFrame&&(e=new s.Rectangle(0,0,t.width,t.height)),this.setFrame(e))},s.Texture.prototype.constructor=s.Texture,s.Texture.prototype.onBaseTextureLoaded=function(){var t=this.baseTexture;this.noFrame&&(this.frame=new s.Rectangle(0,0,t.width,t.height)),this.setFrame(this.frame)},s.Texture.prototype.destroy=function(t){t&&this.baseTexture.destroy(),this.valid=!1},s.Texture.prototype.setFrame=function(t){if(this.noFrame=!1,this.frame=t,this.width=t.width,this.height=t.height,this.crop.x=t.x,this.crop.y=t.y,this.crop.width=t.width,this.crop.height=t.height,this.trim||!(t.x+t.width>this.baseTexture.width||t.y+t.height>this.baseTexture.height))this.valid=t&&t.width&&t.height&&this.baseTexture.source&&this.baseTexture.hasLoaded,this.trim&&(this.width=this.trim.width,this.height=this.trim.height,this.frame.width=this.trim.width,this.frame.height=this.trim.height),this.valid&&this._updateUvs();else{if(!s.TextureSilentFail)throw new Error("Texture Error: frame does not fit inside the base Texture dimensions "+this);this.valid=!1}},s.Texture.prototype._updateUvs=function(){this._uvs||(this._uvs=new s.TextureUvs);var t=this.crop,e=this.baseTexture.width,i=this.baseTexture.height;this._uvs.x0=t.x/e,this._uvs.y0=t.y/i,this._uvs.x1=(t.x+t.width)/e,this._uvs.y1=t.y/i,this._uvs.x2=(t.x+t.width)/e,this._uvs.y2=(t.y+t.height)/i,this._uvs.x3=t.x/e,this._uvs.y3=(t.y+t.height)/i},s.Texture.prototype._updateUvsInverted=function(){this._uvs||(this._uvs=new s.TextureUvs);var t=this.crop,e=this.baseTexture.width,i=this.baseTexture.height;this._uvs.x0=t.x/e,this._uvs.y0=t.y/i,this._uvs.x1=(t.x+t.height)/e,this._uvs.y1=t.y/i,this._uvs.x2=(t.x+t.height)/e,this._uvs.y2=(t.y+t.width)/i,this._uvs.x3=t.x/e,this._uvs.y3=(t.y+t.width)/i},s.Texture.fromCanvas=function(t,e){var i=s.BaseTexture.fromCanvas(t,e);return new s.Texture(i)},s.TextureUvs=function(){this.x0=0,this.y0=0,this.x1=0,this.y1=0,this.x2=0,this.y2=0,this.x3=0,this.y3=0},"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=s),exports.PIXI=s):"undefined"!=typeof define&&define.amd?define("PIXI",i.PIXI=s):i.PIXI=s,s}).call(this),function(){function t(t,e){this._scaleFactor=t,this._deltaMode=e,this.originalEvent=null}var e=this,i=i||{VERSION:"2.10.1",GAMES:[],AUTO:0,CANVAS:1,WEBGL:2,HEADLESS:3,WEBGL_MULTI:4,NONE:0,LEFT:1,RIGHT:2,UP:3,DOWN:4,SPRITE:0,BUTTON:1,IMAGE:2,GRAPHICS:3,TEXT:4,TILESPRITE:5,BITMAPTEXT:6,GROUP:7,RENDERTEXTURE:8,TILEMAP:9,TILEMAPLAYER:10,EMITTER:11,POLYGON:12,BITMAPDATA:13,CANVAS_FILTER:14,WEBGL_FILTER:15,ELLIPSE:16,SPRITEBATCH:17,RETROFONT:18,POINTER:19,ROPE:20,CIRCLE:21,RECTANGLE:22,LINE:23,MATRIX:24,POINT:25,ROUNDEDRECTANGLE:26,CREATURE:27,VIDEO:28,PENDING_ATLAS:-1,HORIZONTAL:0,VERTICAL:1,LANDSCAPE:0,PORTRAIT:1,ANGLE_UP:270,ANGLE_DOWN:90,ANGLE_LEFT:180,ANGLE_RIGHT:0,ANGLE_NORTH_EAST:315,ANGLE_NORTH_WEST:225,ANGLE_SOUTH_EAST:45,ANGLE_SOUTH_WEST:135,TOP_LEFT:0,TOP_CENTER:1,TOP_RIGHT:2,LEFT_TOP:3,LEFT_CENTER:4,LEFT_BOTTOM:5,CENTER:6,RIGHT_TOP:7,RIGHT_CENTER:8,RIGHT_BOTTOM:9,BOTTOM_LEFT:10,BOTTOM_CENTER:11,BOTTOM_RIGHT:12,blendModes:{NORMAL:0,ADD:1,MULTIPLY:2,SCREEN:3,OVERLAY:4,DARKEN:5,LIGHTEN:6,COLOR_DODGE:7,COLOR_BURN:8,HARD_LIGHT:9,SOFT_LIGHT:10,DIFFERENCE:11,EXCLUSION:12,HUE:13,SATURATION:14,COLOR:15,LUMINOSITY:16},scaleModes:{DEFAULT:0,LINEAR:0,NEAREST:1},PIXI:PIXI||{},_UID:0};if(Math.trunc||(Math.trunc=function(t){return t<0?Math.ceil(t):Math.floor(t)}),Function.prototype.bind||(Function.prototype.bind=function(){var t=Array.prototype.slice;return function(e){function i(){var r=n.concat(t.call(arguments));s.apply(this instanceof i?this:e,r)}var s=this,n=t.call(arguments,1);if("function"!=typeof s)throw new TypeError;return i.prototype=function t(e){if(e&&(t.prototype=e),!(this instanceof t))return new t}(s.prototype),i}}()),Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),Array.prototype.forEach||(Array.prototype.forEach=function(t){"use strict";if(void 0===this||null===this)throw new TypeError;var e=Object(this),i=e.length>>>0;if("function"!=typeof t)throw new TypeError;for(var s=arguments.length>=2?arguments[1]:void 0,n=0;n<i;n++)n in e&&t.call(s,e[n],n,e)}),"function"!=typeof window.Uint32Array&&"object"!=typeof window.Uint32Array){var s=function(t){var e=new Array;window[t]=function(t){if("number"==typeof t){Array.call(this,t),this.length=t;for(e=0;e<this.length;e++)this[e]=0}else{Array.call(this,t.length),this.length=t.length;for(var e=0;e<this.length;e++)this[e]=t[e]}},window[t].prototype=e,window[t].constructor=window[t]};s("Float32Array"),s("Uint32Array"),s("Uint16Array"),s("Int16Array"),s("ArrayBuffer")}window.console||(window.console={},window.console.log=window.console.assert=function(){},window.console.warn=window.console.assert=function(){}),Object.assign||(Object.assign=function(t,e){"use strict";if(null==t)throw new TypeError("Cannot convert undefined or null to object");for(var i=Object(t),s=Object.prototype.hasOwnProperty,n=1;n<arguments.length;n++){var r=arguments[n];if(null!=r)for(var o in r)s.call(r,o)&&(i[o]=r[o])}return i}),i.Utils={reverseString:function(t){return t.split("").reverse().join("")},getProperty:function(t,e){var i=e.split(".");switch(i.length){case 1:return t[e];case 2:return t[i[0]][i[1]];case 3:return t[i[0]][i[1]][i[2]];case 4:return t[i[0]][i[1]][i[2]][i[3]];default:return this._getProperty(t,e)}},setProperties:function(t,e){for(var i in e)this.setProperty(t,i,e[i]);return t},setProperty:function(t,e,i){var s=e.split(".");switch(s.length){case 1:t[e]=i;break;case 2:t[s[0]][s[1]]=i;break;case 3:t[s[0]][s[1]][s[2]]=i;break;case 4:t[s[0]][s[1]][s[2]][s[3]]=i;break;default:this._setProperty(t,e,i)}},_getProperty:function(t,e){for(var i=e.split("."),s=i.length,n=0,r=t;n<s;){var o=i[n];if(null==r)return;r=r[o],n++}return r},_setProperty:function(t,e,i){var s=e.split("."),n=s.length,r=0,o=t,a=s[0];if(1===n)t[e]=i;else{for(;r<n-1;)o=o[a],a=s[++r];o[a]=i}return t},chanceRoll:function(t){return void 0===t&&(t=50),t>0&&100*Math.random()<=t},randomChoice:function(t,e){return Math.random()<.5?t:e},parseDimension:function(t,e){var i=0,s=0;return"string"==typeof t?"%"===t.substr(-1)?(i=parseInt(t,10)/100,s=0===e?window.innerWidth*i:window.innerHeight*i):s=parseInt(t,10):s=t,s},pad:function(t,e,i,s){if(void 0===e)var e=0;if(void 0===i)var i=" ";if(void 0===s)var s=3;var n=0;if(e+1>=(t=t.toString()).length)switch(s){case 1:t=new Array(e+1-t.length).join(i)+t;break;case 3:var r=Math.ceil((n=e-t.length)/2),o=n-r;t=new Array(o+1).join(i)+t+new Array(r+1).join(i);break;default:t+=new Array(e+1-t.length).join(i)}return t},isPlainObject:function(t){if("object"!=typeof t||t.nodeType||t===t.window)return!1;try{if(t.constructor&&!{}.hasOwnProperty.call(t.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},extend:function(){var t,e,s,n,r,o,a=arguments[0]||{},h=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[1]||{},h=2),u===h&&(a=this,--h);h<u;h++)if(null!=(t=arguments[h]))for(e in t)s=a[e],a!==(n=t[e])&&(l&&n&&(i.Utils.isPlainObject(n)||(r=Array.isArray(n)))?(r?(r=!1,o=s&&Array.isArray(s)?s:[]):o=s&&i.Utils.isPlainObject(s)?s:{},a[e]=i.Utils.extend(l,o,n)):void 0!==n&&(a[e]=n));return a},mixinPrototype:function(t,e,i){void 0===i&&(i=!1);for(var s=Object.keys(e),n=0;n<s.length;n++){var r=s[n],o=e[r];!i&&r in t||(!o||"function"!=typeof o.get&&"function"!=typeof o.set?t[r]=o:"function"==typeof o.clone?t[r]=o.clone():Object.defineProperty(t,r,o))}},mixin:function(t,e){if(!t||"object"!=typeof t)return e;for(var s in t){var n=t[s];if(!n.childNodes&&!n.cloneNode){var r=typeof t[s];t[s]&&"object"===r?typeof e[s]===r?e[s]=i.Utils.mixin(t[s],e[s]):e[s]=i.Utils.mixin(t[s],new n.constructor):e[s]=t[s]}}return e}},i.Circle=function(t,e,s){t=t||0,e=e||0,s=s||0,this.x=t,this.y=e,this._diameter=s,this._radius=0,s>0&&(this._radius=.5*s),this.type=i.CIRCLE},i.Circle.prototype={circumference:function(){return Math.PI*this._radius*2},random:function(t){void 0===t&&(t=new i.Point);var e=2*Math.PI*Math.random(),s=Math.random()+Math.random(),n=s>1?2-s:s,r=n*Math.cos(e),o=n*Math.sin(e);return t.x=this.x+r*this.radius,t.y=this.y+o*this.radius,t},getBounds:function(){return new i.Rectangle(this.x-this.radius,this.y-this.radius,this.diameter,this.diameter)},setTo:function(t,e,i){return this.x=t,this.y=e,this._diameter=i,this._radius=.5*i,this},copyFrom:function(t){return this.setTo(t.x,t.y,t.diameter)},copyTo:function(t){return t.x=this.x,t.y=this.y,t.diameter=this._diameter,t},distance:function(t,e){var s=i.Math.distance(this.x,this.y,t.x,t.y);return e?Math.round(s):s},clone:function(t){return void 0===t||null===t?t=new i.Circle(this.x,this.y,this.diameter):t.setTo(this.x,this.y,this.diameter),t},contains:function(t,e){return i.Circle.contains(this,t,e)},circumferencePoint:function(t,e,s){return i.Circle.circumferencePoint(this,t,e,s)},sample:function(t,e,s,n,r){t||(t=60),null==e&&(e=0),null==s&&(s=i.Math.PI2),r||(r=[]);for(var o=0;o<t;)this.circumferencePoint(i.Math.linear(e,s,o/t),n,r[o]||(r[o]=new i.Point)),o+=1;return r},offset:function(t,e){return this.x+=t,this.y+=e,this},offsetPoint:function(t){return this.offset(t.x,t.y)},toString:function(){return"[{Phaser.Circle (x="+this.x+" y="+this.y+" diameter="+this.diameter+" radius="+this.radius+")}]"}},i.Circle.prototype.constructor=i.Circle,Object.defineProperty(i.Circle.prototype,"diameter",{get:function(){return this._diameter},set:function(t){t>0&&(this._diameter=t,this._radius=.5*t)}}),Object.defineProperty(i.Circle.prototype,"radius",{get:function(){return this._radius},set:function(t){t>0&&(this._radius=t,this._diameter=2*t)}}),Object.defineProperty(i.Circle.prototype,"left",{get:function(){return this.x-this._radius},set:function(t){t>this.x?(this._radius=0,this._diameter=0):this.radius=this.x-t}}),Object.defineProperty(i.Circle.prototype,"right",{get:function(){return this.x+this._radius},set:function(t){t<this.x?(this._radius=0,this._diameter=0):this.radius=t-this.x}}),Object.defineProperty(i.Circle.prototype,"top",{get:function(){return this.y-this._radius},set:function(t){t>this.y?(this._radius=0,this._diameter=0):this.radius=this.y-t}}),Object.defineProperty(i.Circle.prototype,"bottom",{get:function(){return this.y+this._radius},set:function(t){t<this.y?(this._radius=0,this._diameter=0):this.radius=t-this.y}}),Object.defineProperty(i.Circle.prototype,"area",{get:function(){return this._radius>0?Math.PI*this._radius*this._radius:0}}),Object.defineProperty(i.Circle.prototype,"empty",{get:function(){return 0===this._diameter},set:function(t){!0===t&&this.setTo(0,0,0)}}),i.Circle.contains=function(t,e,i){return t.radius>0&&e>=t.left&&e<=t.right&&i>=t.top&&i<=t.bottom&&(t.x-e)*(t.x-e)+(t.y-i)*(t.y-i)<=t.radius*t.radius},i.Circle.equals=function(t,e){return t.x===e.x&&t.y===e.y&&t.diameter===e.diameter},i.Circle.intersects=function(t,e){return i.Math.distance(t.x,t.y,e.x,e.y)<=t.radius+e.radius},i.Circle.circumferencePoint=function(t,e,s,n){return void 0===s&&(s=!1),void 0===n&&(n=new i.Point),!0===s&&(e=i.Math.degToRad(e)),n.x=t.x+t.radius*Math.cos(e),n.y=t.y+t.radius*Math.sin(e),n},i.Circle.intersectsRectangle=function(t,e){var i=Math.abs(t.x-e.x-e.halfWidth);if(i>e.halfWidth+t.radius)return!1;var s=Math.abs(t.y-e.y-e.halfHeight);if(s>e.halfHeight+t.radius)return!1;if(i<=e.halfWidth||s<=e.halfHeight)return!0;var n=i-e.halfWidth,r=s-e.halfHeight;return n*n+r*r<=t.radius*t.radius},i.Circle.intersectsLine=function(t,e,s){var n=t.x,r=t.y,o=(e.end.y-e.start.y)/(e.end.x-e.start.x),a=e.end.y-o*e.end.x,h=t.radius,u=t.radius,l=a+o*n,c=(n*(u*u)-o*(h*h)*(a-r)+h*u*Math.sqrt(h*h*(o*o)+u*u-l*l-r*r+2*l*r))/(h*h*(o*o)+u*u),d=(n*(u*u)-o*(h*h)*(a-r)-h*u*Math.sqrt(h*h*(o*o)+u*u-l*l-r*r+2*l*r))/(h*h*(o*o)+u*u),p=o*c+a,f=o*d+a,g=new i.Point(c,p),m=new i.Point(d,f),y=e.pointOnSegment(g.x,g.y,.01),v=e.pointOnSegment(m.x,m.y,.01);return y&&v?!s||[g,m]:y?!s||[g]:v?!s||[m]:!!s&&[]},PIXI.Circle=i.Circle,i.Ellipse=function(t,e,s,n){t=t||0,e=e||0,s=s||0,n=n||0,this.x=t,this.y=e,this.width=s,this.height=n,this.type=i.ELLIPSE},i.Ellipse.prototype={setTo:function(t,e,i,s){return this.x=t,this.y=e,this.width=i,this.height=s,this},getBounds:function(){return new i.Rectangle(this.x-this.width,this.y-this.height,this.width,this.height)},copyFrom:function(t){return this.setTo(t.x,t.y,t.width,t.height)},copyTo:function(t){return t.x=this.x,t.y=this.y,t.width=this.width,t.height=this.height,t},clone:function(t){return void 0===t||null===t?t=new i.Ellipse(this.x,this.y,this.width,this.height):t.setTo(this.x,this.y,this.width,this.height),t},contains:function(t,e){return i.Ellipse.contains(this,t,e)},random:function(t){void 0===t&&(t=new i.Point);var e=Math.random()*Math.PI*2,s=Math.random();return t.x=Math.sqrt(s)*Math.cos(e),t.y=Math.sqrt(s)*Math.sin(e),t.x=this.x+t.x*this.width/2,t.y=this.y+t.y*this.height/2,t},toString:function(){return"[{Phaser.Ellipse (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")}]"}},i.Ellipse.prototype.constructor=i.Ellipse,Object.defineProperty(i.Ellipse.prototype,"left",{get:function(){return this.x},set:function(t){this.x=t}}),Object.defineProperty(i.Ellipse.prototype,"right",{get:function(){return this.x+this.width},set:function(t){t<this.x?this.width=0:this.width=t-this.x}}),Object.defineProperty(i.Ellipse.prototype,"top",{get:function(){return this.y},set:function(t){this.y=t}}),Object.defineProperty(i.Ellipse.prototype,"bottom",{get:function(){return this.y+this.height},set:function(t){t<this.y?this.height=0:this.height=t-this.y}}),Object.defineProperty(i.Ellipse.prototype,"empty",{get:function(){return 0===this.width||0===this.height},set:function(t){!0===t&&this.setTo(0,0,0,0)}}),i.Ellipse.contains=function(t,e,i){if(t.width<=0||t.height<=0)return!1;var s=(e-t.x)/t.width-.5,n=(i-t.y)/t.height-.5;return s*=s,n*=n,s+n<.25},i.Ellipse.intersectsLine=function(t,e,s){var n=t.x,r=t.y,o=(e.end.y-e.start.y)/(e.end.x-e.start.x),a=e.end.y-o*e.end.x,h=t.width/2,u=t.height/2,l=a+o*n,c=(n*(u*u)-o*(h*h)*(a-r)+h*u*Math.sqrt(h*h*(o*o)+u*u-l*l-r*r+2*l*r))/(h*h*(o*o)+u*u),d=(n*(u*u)-o*(h*h)*(a-r)-h*u*Math.sqrt(h*h*(o*o)+u*u-l*l-r*r+2*l*r))/(h*h*(o*o)+u*u),p=o*c+a,f=o*d+a,g=new i.Point(c,p),m=new i.Point(d,f),y=e.pointOnSegment(g.x,g.y,.01),v=e.pointOnSegment(m.x,m.y,.01);return y&&v?!s||[g,m]:y?!s||[g]:v?!s||[m]:!!s&&[]},PIXI.Ellipse=i.Ellipse,i.Line=function(t,e,s,n){t=t||0,e=e||0,s=s||0,n=n||0,this.start=new i.Point(t,e),this.end=new i.Point(s,n),this.type=i.LINE},i.Line.prototype={setTo:function(t,e,i,s){return this.start.setTo(t,e),this.end.setTo(i,s),this},fromPoints:function(t,e){return this.setTo(t.x,t.y,e.x,e.y),this},fromSprite:function(t,e,i){return void 0===i&&(i=!1),i?this.setTo(t.centerX,t.centerY,e.centerX,e.centerY):this.fromPoints(t,e)},fromAngle:function(t,e,i,s){return this.start.setTo(t,e),this.end.setTo(t+Math.cos(i)*s,e+Math.sin(i)*s),this},rotate:function(t,e){var i=(this.start.x+this.end.x)/2,s=(this.start.y+this.end.y)/2;return this.start.rotate(i,s,t,e),this.end.rotate(i,s,t,e),this},rotateAround:function(t,e,i,s){return this.start.rotate(t,e,i,s),this.end.rotate(t,e,i,s),this},intersects:function(t,e,s){return i.Line.intersectsPoints(this.start,this.end,t.start,t.end,e,s)},reflect:function(t){return i.Line.reflect(this,t)},midPoint:function(t){return void 0===t&&(t=new i.Point),t.x=(this.start.x+this.end.x)/2,t.y=(this.start.y+this.end.y)/2,t},centerOn:function(t,e){var i=t-(this.start.x+this.end.x)/2,s=e-(this.start.y+this.end.y)/2;this.start.add(i,s),this.end.add(i,s)},pointOnLine:function(t,e,s){return i.Math.fuzzyEqual((t-this.start.x)*(this.end.y-this.start.y),(this.end.x-this.start.x)*(e-this.start.y),s||0)},pointOnSegment:function(t,e,i){var s=Math.min(this.start.x,this.end.x),n=Math.max(this.start.x,this.end.x),r=Math.min(this.start.y,this.end.y),o=Math.max(this.start.y,this.end.y);return this.pointOnLine(t,e,i)&&t>=s&&t<=n&&e>=r&&e<=o},random:function(t){void 0===t&&(t=new i.Point);var e=Math.random();return t.x=this.start.x+e*(this.end.x-this.start.x),t.y=this.start.y+e*(this.end.y-this.start.y),t},coordinatesOnLine:function(t,e){void 0===t&&(t=1),void 0===e&&(e=[]);var i=Math.round(this.start.x),s=Math.round(this.start.y),n=Math.round(this.end.x),r=Math.round(this.end.y),o=Math.abs(n-i),a=Math.abs(r-s),h=i<n?1:-1,u=s<r?1:-1,l=o-a;e.push([i,s]);for(var c=1;i!==n||s!==r;){var d=l<<1;d>-a&&(l-=a,i+=h),d<o&&(l+=o,s+=u),c%t==0&&e.push([i,s]),c++}return e},clone:function(t){return void 0===t||null===t?t=new i.Line(this.start.x,this.start.y,this.end.x,this.end.y):t.setTo(this.start.x,this.start.y,this.end.x,this.end.y),t}},Object.defineProperty(i.Line.prototype,"length",{get:function(){return Math.sqrt((this.end.x-this.start.x)*(this.end.x-this.start.x)+(this.end.y-this.start.y)*(this.end.y-this.start.y))}}),Object.defineProperty(i.Line.prototype,"angle",{get:function(){return i.Point.angle(this.end,this.start)}}),Object.defineProperty(i.Line.prototype,"slope",{get:function(){return(this.end.y-this.start.y)/(this.end.x-this.start.x)}}),Object.defineProperty(i.Line.prototype,"perpSlope",{get:function(){return-(this.end.x-this.start.x)/(this.end.y-this.start.y)}}),Object.defineProperty(i.Line.prototype,"x",{get:function(){return Math.min(this.start.x,this.end.x)}}),Object.defineProperty(i.Line.prototype,"y",{get:function(){return Math.min(this.start.y,this.end.y)}}),Object.defineProperty(i.Line.prototype,"left",{get:function(){return Math.min(this.start.x,this.end.x)}}),Object.defineProperty(i.Line.prototype,"right",{get:function(){return Math.max(this.start.x,this.end.x)}}),Object.defineProperty(i.Line.prototype,"top",{get:function(){return Math.min(this.start.y,this.end.y)}}),Object.defineProperty(i.Line.prototype,"bottom",{get:function(){return Math.max(this.start.y,this.end.y)}}),Object.defineProperty(i.Line.prototype,"width",{get:function(){return Math.abs(this.start.x-this.end.x)}}),Object.defineProperty(i.Line.prototype,"height",{get:function(){return Math.abs(this.start.y-this.end.y)}}),Object.defineProperty(i.Line.prototype,"normalX",{get:function(){return Math.cos(this.angle-1.5707963267948966)}}),Object.defineProperty(i.Line.prototype,"normalY",{get:function(){return Math.sin(this.angle-1.5707963267948966)}}),Object.defineProperty(i.Line.prototype,"normalAngle",{get:function(){return i.Math.wrap(this.angle-1.5707963267948966,-Math.PI,Math.PI)}}),i.Line.intersectsPoints=function(t,e,s,n,r,o){void 0===r&&(r=!0),void 0===o&&(o=new i.Point);var a=e.y-t.y,h=n.y-s.y,u=t.x-e.x,l=s.x-n.x,c=e.x*t.y-t.x*e.y,d=n.x*s.y-s.x*n.y,p=a*l-h*u;if(0===p)return null;if(o.x=(u*d-l*c)/p,o.y=(h*c-a*d)/p,r){var f=(n.y-s.y)*(e.x-t.x)-(n.x-s.x)*(e.y-t.y),g=((n.x-s.x)*(t.y-s.y)-(n.y-s.y)*(t.x-s.x))/f,m=((e.x-t.x)*(t.y-s.y)-(e.y-t.y)*(t.x-s.x))/f;return g>=0&&g<=1&&m>=0&&m<=1?o:null}return o},i.Line.intersects=function(t,e,s,n){return i.Line.intersectsPoints(t.start,t.end,e.start,e.end,s,n)},i.Line.intersectsRectangle=function(t,e){if(0===t.length||e.empty)return!1;var i=t.start.x,s=t.start.y,n=t.end.x,r=t.end.y,o=e.x,a=e.y,h=e.right,u=e.bottom,l=0;if(i>=o&&i<=h&&s>=a&&s<=u||n>=o&&n<=h&&r>=a&&r<=u)return!0;if(i<o&&n>=o){if((l=s+(r-s)*(o-i)/(n-i))>a&&l<=u)return!0}else if(i>h&&n<=h&&(l=s+(r-s)*(h-i)/(n-i))>=a&&l<=u)return!0;if(s<a&&r>=a){if((l=i+(n-i)*(a-s)/(r-s))>=o&&l<=h)return!0}else if(s>u&&r<=u&&(l=i+(n-i)*(u-s)/(r-s))>=o&&l<=h)return!0;return!1},i.Line.intersectionWithRectangle=function(t,e,s){var n=i.Line.intersectionWithRectangle;s||(s=new i.Point),n.edges||(n.edges=[new i.Line,new i.Line,new i.Line,new i.Line]),n.edgeIntersection||(n.edgeIntersection=new i.Point);var r=n.edges,o=n.edgeIntersection.set(0),a=e.x,h=e.y,u=e.right,l=e.bottom,c=1/0;r[0].setTo(a,h,u,h),r[1].setTo(a,l,u,l),r[2].setTo(a,h,a,l),r[3].setTo(u,h,u,l);for(var d,p=0;d=r[p];p++)if(t.intersects(d,!0,o)){var f=t.start.distance(o);f<c&&(c=f,s.copyFrom(o))}return null!=f?s:null},i.Line.reflect=function(t,e){return 2*e.normalAngle-3.141592653589793-t.angle},i.Matrix=function(t,e,s,n,r,o){void 0!==t&&null!==t||(t=1),void 0!==e&&null!==e||(e=0),void 0!==s&&null!==s||(s=0),void 0!==n&&null!==n||(n=1),void 0!==r&&null!==r||(r=0),void 0!==o&&null!==o||(o=0),this.a=t,this.b=e,this.c=s,this.d=n,this.tx=r,this.ty=o,this.type=i.MATRIX},i.Matrix.prototype={fromArray:function(t){return this.setTo(t[0],t[1],t[3],t[4],t[2],t[5])},setTo:function(t,e,i,s,n,r){return this.a=t,this.b=e,this.c=i,this.d=s,this.tx=n,this.ty=r,this},clone:function(t){return void 0===t||null===t?t=new i.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty):(t.a=this.a,t.b=this.b,t.c=this.c,t.d=this.d,t.tx=this.tx,t.ty=this.ty),t},copyTo:function(t){return t.copyFrom(this),t},copyFrom:function(t){return this.a=t.a,this.b=t.b,this.c=t.c,this.d=t.d,this.tx=t.tx,this.ty=t.ty,this},toArray:function(t,e){return void 0===e&&(e=new Float32Array(9)),t?(e[0]=this.a,e[1]=this.b,e[2]=0,e[3]=this.c,e[4]=this.d,e[5]=0,e[6]=this.tx,e[7]=this.ty,e[8]=1):(e[0]=this.a,e[1]=this.c,e[2]=this.tx,e[3]=this.b,e[4]=this.d,e[5]=this.ty,e[6]=0,e[7]=0,e[8]=1),e},apply:function(t,e){return void 0===e&&(e=new i.Point),e.x=this.a*t.x+this.c*t.y+this.tx,e.y=this.b*t.x+this.d*t.y+this.ty,e},applyInverse:function(t,e){void 0===e&&(e=new i.Point);var s=1/(this.a*this.d+this.c*-this.b),n=t.x,r=t.y;return e.x=this.d*s*n+-this.c*s*r+(this.ty*this.c-this.tx*this.d)*s,e.y=this.a*s*r+-this.b*s*n+(-this.ty*this.a+this.tx*this.b)*s,e},translate:function(t,e){return this.tx+=t,this.ty+=e,this},scale:function(t,e){return this.a*=t,this.d*=e,this.c*=t,this.b*=e,this.tx*=t,this.ty*=e,this},rotate:function(t){var e=Math.cos(t),i=Math.sin(t),s=this.a,n=this.c,r=this.tx;return this.a=s*e-this.b*i,this.b=s*i+this.b*e,this.c=n*e-this.d*i,this.d=n*i+this.d*e,this.tx=r*e-this.ty*i,this.ty=r*i+this.ty*e,this},append:function(t){var e=this.a,i=this.b,s=this.c,n=this.d;return this.a=t.a*e+t.b*s,this.b=t.a*i+t.b*n,this.c=t.c*e+t.d*s,this.d=t.c*i+t.d*n,this.tx=t.tx*e+t.ty*s+this.tx,this.ty=t.tx*i+t.ty*n+this.ty,this},identity:function(){return this.setTo(1,0,0,1,0,0)}},i.identityMatrix=new i.Matrix,i.Point=function(t,e){t=t||0,e=e||0,this.x=t,this.y=e,this.type=i.POINT},i.Point.prototype={copyFrom:function(t){return this.setTo(t.x,t.y)},invert:function(){return this.setTo(this.y,this.x)},setTo:function(t,e){return i.Point.set(this,t,e)},set:function(t,e){return i.Point.set(this,t,e)},setToPolar:function(t,e,s){return null==e&&(e=1),s&&(t=i.Math.degToRad(t)),this.setTo(Math.cos(t)*e,Math.sin(t)*e)},add:function(t,e){return this.x+=t,this.y+=e,this},subtract:function(t,e){return this.x-=t,this.y-=e,this},multiply:function(t,e){return this.x*=t,this.y*=e,this},divide:function(t,e){return this.x/=t,this.y/=e,this},clampX:function(t,e){return this.x=i.Math.clamp(this.x,t,e),this},clampY:function(t,e){return this.y=i.Math.clamp(this.y,t,e),this},clamp:function(t,e){return this.x=i.Math.clamp(this.x,t,e),this.y=i.Math.clamp(this.y,t,e),this},clip:function(t){var e=t.left,i=t.top,s=t.right,n=t.bottom;return this.x<e?this.x=e:this.x>s&&(this.x=s),this.y<i?this.y=i:this.y>n&&(this.y=n),this},clone:function(t){return void 0===t||null===t?t=new i.Point(this.x,this.y):t.setTo(this.x,this.y),t},copyTo:function(t){return t.x=this.x,t.y=this.y,t},distance:function(t,e){return i.Point.distance(this,t,e)},equals:function(t){return t.x===this.x&&t.y===this.y},equalsXY:function(t,e){return this.x===t&&this.y===e},fuzzyEquals:function(t,e){return i.Point.fuzzyEquals(this,t,e)},fuzzyEqualsXY:function(t,e,s){return i.Point.fuzzyEqualsXY(this,t,e,s)},angle:function(t,e){return this.angleXY(t.x,t.y,e)},angleXY:function(t,e,s){var n=Math.atan2(e-this.y,t-this.x);return s?i.Math.radToDeg(n):n},atan:function(t){var e=Math.atan2(this.y,this.x);return t?i.Math.radToDeg(e):e},rotate:function(t,e,s,n,r){return i.Point.rotate(this,t,e,s,n,r)},getMagnitude:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},getMagnitudeSq:function(){return this.x*this.x+this.y*this.y},setMagnitude:function(t){return this.normalize().multiply(t,t)},normalize:function(){if(!this.isZero()){var t=this.getMagnitude();this.x/=t,this.y/=t}return this},limit:function(t){return this.getMagnitudeSq()>t*t&&this.setMagnitude(t),this},expand:function(t){return this.getMagnitudeSq()<t*t&&this.setMagnitude(t),this},isZero:function(){return 0===this.x&&0===this.y},dot:function(t){return this.x*t.x+this.y*t.y},cross:function(t){return this.x*t.y-this.y*t.x},perp:function(){return this.setTo(-this.y,this.x)},rperp:function(){return this.setTo(this.y,-this.x)},normalRightHand:function(){return this.setTo(-1*this.y,this.x)},floor:function(){return this.setTo(Math.floor(this.x),Math.floor(this.y))},ceil:function(){return this.setTo(Math.ceil(this.x),Math.ceil(this.y))},round:function(){return this.setTo(Math.round(this.x),Math.round(this.y))},toString:function(){return"[{Point (x="+this.x+" y="+this.y+")}]"}},i.Point.prototype.constructor=i.Point,i.Point.add=function(t,e,s){return void 0===s&&(s=new i.Point),s.x=t.x+e.x,s.y=t.y+e.y,s},i.Point.subtract=function(t,e,s){return void 0===s&&(s=new i.Point),s.x=t.x-e.x,s.y=t.y-e.y,s},i.Point.multiply=function(t,e,s){return void 0===s&&(s=new i.Point),s.x=t.x*e.x,s.y=t.y*e.y,s},i.Point.divide=function(t,e,s){return void 0===s&&(s=new i.Point),s.x=t.x/e.x,s.y=t.y/e.y,s},i.Point.equals=function(t,e){return t.x===e.x&&t.y===e.y},i.Point.equalsXY=function(t,e,i){return t.x===e&&t.y===i},i.Point.fuzzyEquals=function(t,e,s){return i.Math.fuzzyEquals(t.x,e.x,s)&&i.Math.fuzzyEquals(t.y,e.y,s)},i.Point.fuzzyEqualsXY=function(t,e,s,n){return i.Math.fuzzyEquals(t.x,e,n)&&i.Math.fuzzyEquals(t.y,s,n)},i.Point.angle=function(t,e){return Math.atan2(t.y-e.y,t.x-e.x)},i.Point.negative=function(t,e){return void 0===e&&(e=new i.Point),e.setTo(-t.x,-t.y)},i.Point.multiplyAdd=function(t,e,s,n){return void 0===n&&(n=new i.Point),n.setTo(t.x+e.x*s,t.y+e.y*s)},i.Point.interpolate=function(t,e,s,n){return void 0===n&&(n=new i.Point),n.setTo(t.x+(e.x-t.x)*s,t.y+(e.y-t.y)*s)},i.Point.perp=function(t,e){return void 0===e&&(e=new i.Point),e.setTo(-t.y,t.x)},i.Point.rperp=function(t,e){return void 0===e&&(e=new i.Point),e.setTo(t.y,-t.x)},i.Point.distance=function(t,e,s){var n=i.Math.distance(t.x,t.y,e.x,e.y);return s?Math.round(n):n},i.Point.project=function(t,e,s){void 0===s&&(s=new i.Point);var n=t.dot(e)/e.getMagnitudeSq();return 0!==n&&s.setTo(n*e.x,n*e.y),s},i.Point.projectUnit=function(t,e,s){void 0===s&&(s=new i.Point);var n=t.dot(e);return 0!==n&&s.setTo(n*e.x,n*e.y),s},i.Point.normalRightHand=function(t,e){return void 0===e&&(e=new i.Point),e.setTo(-1*t.y,t.x)},i.Point.normalize=function(t,e){void 0===e&&(e=new i.Point);var s=t.getMagnitude();return 0!==s&&e.setTo(t.x/s,t.y/s),e},i.Point.rotate=function(t,e,s,n,r,o){if(r&&(n=i.Math.degToRad(n)),void 0===o){t.subtract(e,s);var a=Math.sin(n),h=Math.cos(n),u=h*t.x-a*t.y,l=a*t.x+h*t.y;t.x=u+e,t.y=l+s}else{var c=n+Math.atan2(t.y-s,t.x-e);t.x=e+o*Math.cos(c),t.y=s+o*Math.sin(c)}return t},i.Point.centroid=function(t,e){if(void 0===e&&(e=new i.Point),"[object Array]"!==Object.prototype.toString.call(t))throw new Error("Phaser.Point. Parameter 'points' must be an array");var s=t.length;if(s<1)throw new Error("Phaser.Point. Parameter 'points' array must not be empty");if(1===s)return e.copyFrom(t[0]),e;for(var n=0;n<s;n++)i.Point.add(e,t[n],e);return e.divide(s,s),e},i.Point.parse=function(t,e,s){e=e||"x",s=s||"y";var n=new i.Point;return t[e]&&(n.x=parseInt(t[e],10)),t[s]&&(n.y=parseInt(t[s],10)),n},i.Point.isPoint=function(t){return null!=t&&"number"==typeof t.x&&"number"==typeof t.y},i.Point.set=function(t,e,i){return t.x=e||0,t.y=i||(0!==i?t.x:0),t},i.Point.sortClockwise=function(t,e){e||(e=this.centroid(t));var i=e.x,s=e.y;return t.sort(function(t,e){if(t.x-i>=0&&e.x-i<0)return-1;if(t.x-i<0&&e.x-i>=0)return 1;if(t.x-i==0&&e.x-i==0)return t.y-s>=0||e.y-s>=0?t.y>e.y?1:-1:e.y>t.y?1:-1;var n=(t.x-i)*-(e.y-s)-(e.x-i)*-(t.y-s);return n<0?-1:n>0?1:(t.x-i)*(t.x-i)+(t.y-s)*(t.y-s)>(e.x-i)*(e.x-i)+(e.y-s)*(e.y-s)?-1:1})},PIXI.Point=i.Point,i.Polygon=function(){this.area=0,this._points=[],arguments.length>0&&this.setTo.apply(this,arguments),this.closed=!0,this.flattened=!1,this.type=i.POLYGON},i.Polygon.prototype={toNumberArray:function(t){void 0===t&&(t=[]);for(var e=0;e<this._points.length;e++)"number"==typeof this._points[e]?(t.push(this._points[e]),t.push(this._points[e+1]),e++):(t.push(this._points[e].x),t.push(this._points[e].y));return t},flatten:function(){return this._points=this.toNumberArray(),this.flattened=!0,this},clone:function(t){var e=this._points.slice();return void 0===t||null===t?t=new i.Polygon(e):t.setTo(e),t},contains:function(t,e){var i=!1;if(this.flattened)for(var s=-2,n=this._points.length-2;(s+=2)<this._points.length;n=s){var r=this._points[s],o=this._points[s+1],a=this._points[n],h=this._points[n+1];(o<=e&&e<h||h<=e&&e<o)&&t<(a-r)*(e-o)/(h-o)+r&&(i=!i)}else for(var s=-1,n=this._points.length-1;++s<this._points.length;n=s){var r=this._points[s].x,o=this._points[s].y,a=this._points[n].x,h=this._points[n].y;(o<=e&&e<h||h<=e&&e<o)&&t<(a-r)*(e-o)/(h-o)+r&&(i=!i)}return i},setTo:function(t){if(this.area=0,this._points=[],arguments.length>0){Array.isArray(t)||(t=Array.prototype.slice.call(arguments));for(var e=Number.MAX_VALUE,i=0,s=t.length;i<s;i++){if("number"==typeof t[i]){n=new PIXI.Point(t[i],t[i+1]);i++}else if(Array.isArray(t[i]))n=new PIXI.Point(t[i][0],t[i][1]);else var n=new PIXI.Point(t[i].x,t[i].y);this._points.push(n),n.y<e&&(e=n.y)}this.calculateArea(e)}return this},calculateArea:function(t){for(var e,i,s,n,r=0,o=this._points.length;r<o;r++)e=this._points[r],i=r===o-1?this._points[0]:this._points[r+1],s=(e.y-t+(i.y-t))/2,n=e.x-i.x,this.area+=s*n;return this.area}},i.Polygon.prototype.constructor=i.Polygon,Object.defineProperty(i.Polygon.prototype,"points",{get:function(){return this._points}}),PIXI.Polygon=i.Polygon,i.Rectangle=function(t,e,s,n){t=t||0,e=e||0,s=s||0,n=n||0,this.x=t,this.y=e,this.width=s,this.height=n,this.type=i.RECTANGLE},i.Rectangle.prototype={offset:function(t,e){return this.x+=t,this.y+=e,this},offsetPoint:function(t){return this.offset(t.x,t.y)},setTo:function(t,e,i,s){return this.x=t,this.y=e,this.width=i,this.height=s,this},scale:function(t,e){return void 0===e&&(e=t),this.width*=t,this.height*=e,this},centerOn:function(t,e){return this.centerX=t,this.centerY=e,this},floor:function(){this.x=Math.floor(this.x),this.y=Math.floor(this.y)},floorAll:function(){this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.width=Math.floor(this.width),this.height=Math.floor(this.height)},ceil:function(){this.x=Math.ceil(this.x),this.y=Math.ceil(this.y)},ceilAll:function(){this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.width=Math.ceil(this.width),this.height=Math.ceil(this.height)},copyFrom:function(t){return this.setTo(t.x,t.y,t.width,t.height)},copyFromBounds:function(t){return this.setTo(t.left,t.top,t.width,t.height)},copyTo:function(t){return t.x=this.x,t.y=this.y,t.width=this.width,t.height=this.height,t},inflate:function(t,e){return i.Rectangle.inflate(this,t,e)},size:function(t){return i.Rectangle.size(this,t)},resize:function(t,e){return this.width=t,this.height=e,this},clone:function(t){return i.Rectangle.clone(this,t)},contains:function(t,e){return i.Rectangle.contains(this,t,e)},containsRect:function(t){return i.Rectangle.containsRect(t,this)},equals:function(t){return i.Rectangle.equals(this,t)},intersection:function(t,e){return i.Rectangle.intersection(this,t,e)},intersects:function(t){return i.Rectangle.intersects(this,t)},intersectsRaw:function(t,e,s,n,r){return i.Rectangle.intersectsRaw(this,t,e,s,n,r)},union:function(t,e){return i.Rectangle.union(this,t,e)},random:function(t){return void 0===t&&(t=new i.Point),t.x=this.randomX,t.y=this.randomY,t},getPoint:function(t,e){switch(void 0===e&&(e=new i.Point),t){default:case i.TOP_LEFT:return e.set(this.x,this.y);case i.TOP_CENTER:return e.set(this.centerX,this.y);case i.TOP_RIGHT:return e.set(this.right,this.y);case i.LEFT_CENTER:return e.set(this.x,this.centerY);case i.CENTER:return e.set(this.centerX,this.centerY);case i.RIGHT_CENTER:return e.set(this.right,this.centerY);case i.BOTTOM_LEFT:return e.set(this.x,this.bottom);case i.BOTTOM_CENTER:return e.set(this.centerX,this.bottom);case i.BOTTOM_RIGHT:return e.set(this.right,this.bottom)}},sides:function(t,e,s,n){arguments.length||(t=new i.Line,e=new i.Line,s=new i.Line,n=new i.Line);var r=this.x,o=this.y,a=this.right,h=this.bottom;return t.setTo(r,o,a,o),e.setTo(a,o,a,h),s.setTo(r,h,a,h),n.setTo(r,o,r,h),arguments.length?null:[t,e,s,n]},toString:function(){return"[{Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+" empty="+this.empty+")}]"}},Object.defineProperty(i.Rectangle.prototype,"halfWidth",{get:function(){return Math.round(this.width/2)}}),Object.defineProperty(i.Rectangle.prototype,"halfHeight",{get:function(){return Math.round(this.height/2)}}),Object.defineProperty(i.Rectangle.prototype,"bottom",{get:function(){return this.y+this.height},set:function(t){t<=this.y?this.height=0:this.height=t-this.y}}),Object.defineProperty(i.Rectangle.prototype,"bottomLeft",{get:function(){return new i.Point(this.x,this.bottom)},set:function(t){this.x=t.x,this.bottom=t.y}}),Object.defineProperty(i.Rectangle.prototype,"bottomRight",{get:function(){return new i.Point(this.right,this.bottom)},set:function(t){this.right=t.x,this.bottom=t.y}}),Object.defineProperty(i.Rectangle.prototype,"left",{get:function(){return this.x},set:function(t){t>=this.right?this.width=0:this.width=this.right-t,this.x=t}}),Object.defineProperty(i.Rectangle.prototype,"right",{get:function(){return this.x+this.width},set:function(t){t<=this.x?this.width=0:this.width=t-this.x}}),Object.defineProperty(i.Rectangle.prototype,"volume",{get:function(){return this.width*this.height}}),Object.defineProperty(i.Rectangle.prototype,"perimeter",{get:function(){return 2*this.width+2*this.height}}),Object.defineProperty(i.Rectangle.prototype,"centerX",{get:function(){return this.x+this.halfWidth},set:function(t){this.x=t-this.halfWidth}}),Object.defineProperty(i.Rectangle.prototype,"centerY",{get:function(){return this.y+this.halfHeight},set:function(t){this.y=t-this.halfHeight}}),Object.defineProperty(i.Rectangle.prototype,"randomX",{get:function(){return this.x+Math.random()*this.width}}),Object.defineProperty(i.Rectangle.prototype,"randomY",{get:function(){return this.y+Math.random()*this.height}}),Object.defineProperty(i.Rectangle.prototype,"top",{get:function(){return this.y},set:function(t){t>=this.bottom?(this.height=0,this.y=t):this.height=this.bottom-t}}),Object.defineProperty(i.Rectangle.prototype,"topLeft",{get:function(){return new i.Point(this.x,this.y)},set:function(t){this.x=t.x,this.y=t.y}}),Object.defineProperty(i.Rectangle.prototype,"topRight",{get:function(){return new i.Point(this.x+this.width,this.y)},set:function(t){this.right=t.x,this.y=t.y}}),Object.defineProperty(i.Rectangle.prototype,"empty",{get:function(){return!this.width||!this.height},set:function(t){!0===t&&this.setTo(0,0,0,0)}}),i.Rectangle.prototype.constructor=i.Rectangle,i.Rectangle.inflate=function(t,e,i){return t.x-=e,t.width+=2*e,t.y-=i,t.height+=2*i,t},i.Rectangle.inflatePoint=function(t,e){return i.Rectangle.inflate(t,e.x,e.y)},i.Rectangle.size=function(t,e){return void 0===e||null===e?e=new i.Point(t.width,t.height):e.setTo(t.width,t.height),e},i.Rectangle.clone=function(t,e){return void 0===e||null===e?e=new i.Rectangle(t.x,t.y,t.width,t.height):e.setTo(t.x,t.y,t.width,t.height),e},i.Rectangle.createFromBounds=function(t,e){return void 0!==e&&null!==e||(e=new i.Rectangle(t.x,t.y,t.width,t.height)),e.copyFromBounds(t)},i.Rectangle.contains=function(t,e,i){return!(t.width<=0||t.height<=0)&&(e>=t.x&&e<t.right&&i>=t.y&&i<t.bottom)},i.Rectangle.containsRaw=function(t,e,i,s,n,r){return n>=t&&n<t+i&&r>=e&&r<e+s},i.Rectangle.containsPoint=function(t,e){return i.Rectangle.contains(t,e.x,e.y)},i.Rectangle.containsRect=function(t,e){return!(t.volume>e.volume)&&(t.x>=e.x&&t.y>=e.y&&t.right<e.right&&t.bottom<e.bottom)},i.Rectangle.equals=function(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height},i.Rectangle.sameDimensions=function(t,e){return t.width===e.width&&t.height===e.height},i.Rectangle.intersection=function(t,e,s){return void 0===s&&(s=new i.Rectangle),i.Rectangle.intersects(t,e)&&(s.x=Math.max(t.x,e.x),s.y=Math.max(t.y,e.y),s.width=Math.min(t.right,e.right)-s.x,s.height=Math.min(t.bottom,e.bottom)-s.y),s},i.Rectangle.intersects=function(t,e){return!(t.width<=0||t.height<=0||e.width<=0||e.height<=0)&&!(t.right<e.x||t.bottom<e.y||t.x>e.right||t.y>e.bottom)},i.Rectangle.intersectsRaw=function(t,e,i,s,n,r){return void 0===r&&(r=0),!(e>t.right+r||i<t.left-r||s>t.bottom+r||n<t.top-r)},i.Rectangle.union=function(t,e,s){return void 0===s&&(s=new i.Rectangle),s.setTo(Math.min(t.x,e.x),Math.min(t.y,e.y),Math.max(t.right,e.right)-Math.min(t.left,e.left),Math.max(t.bottom,e.bottom)-Math.min(t.top,e.top))},i.Rectangle.aabb=function(t,e){void 0===e&&(e=new i.Rectangle);var s=Number.NEGATIVE_INFINITY,n=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,o=Number.POSITIVE_INFINITY;return t.forEach(function(t){t.x>s&&(s=t.x),t.x<n&&(n=t.x),t.y>r&&(r=t.y),t.y<o&&(o=t.y)}),e.setTo(n,o,s-n,r-o),e},PIXI.Rectangle=i.Rectangle,PIXI.EmptyRectangle=new i.Rectangle(0,0,0,0),i.RoundedRectangle=function(t,e,s,n,r){void 0===t&&(t=0),void 0===e&&(e=0),void 0===s&&(s=0),void 0===n&&(n=0),void 0===r&&(r=20),this.x=t,this.y=e,this.width=s,this.height=n,this.radius=r||20,this.type=i.ROUNDEDRECTANGLE},i.RoundedRectangle.prototype={clone:function(){return new i.RoundedRectangle(this.x,this.y,this.width,this.height,this.radius)},contains:function(t,e){if(this.width<=0||this.height<=0)return!1;var i=this.x;if(t>=i&&t<=i+this.width){var s=this.y;if(e>=s&&e<=s+this.height)return!0}return!1}},i.RoundedRectangle.prototype.constructor=i.RoundedRectangle,PIXI.RoundedRectangle=i.RoundedRectangle,i.Camera=function(t,e,s,n,r,o){this.game=t,this.world=t.world,this.id=0,this.view=new i.Rectangle(s,n,r,o),this.bounds=new i.Rectangle(s,n,r,o),this.deadzone=null,this.visible=!0,this.roundPx=!0,this.atLimit={x:!1,y:!1},this.target=null,this.displayObject=null,this.scale=null,this.totalInView=0,this.lerp=new i.Point(1,1),this.onShakeComplete=new i.Signal,this.onFlashComplete=new i.Signal,this.onFadeComplete=new i.Signal,this.fx=null,this._targetPosition=new i.Point,this._edge=0,this._position=new i.Point,this._shake={intensity:0,duration:0,horizontal:!1,vertical:!1,shakeBounds:!0,x:0,y:0},this._fxDuration=0,this._fxType=0,this._fixedView=new i.Rectangle},i.Camera.FOLLOW_LOCKON=0,i.Camera.FOLLOW_PLATFORMER=1,i.Camera.FOLLOW_TOPDOWN=2,i.Camera.FOLLOW_TOPDOWN_TIGHT=3,i.Camera.SHAKE_BOTH=4,i.Camera.SHAKE_HORIZONTAL=5,i.Camera.SHAKE_VERTICAL=6,i.Camera.ENABLE_FX=!0,i.Camera.prototype={boot:function(){this.displayObject=this.game.world,this.scale=this.game.world.scale,this.game.camera=this,i.Graphics&&i.Camera.ENABLE_FX&&(this.fx=new i.Graphics(this.game),this.game.stage.addChild(this.fx))},preUpdate:function(){this.totalInView=0},follow:function(t,e,s,n){void 0===e&&(e=i.Camera.FOLLOW_LOCKON),void 0===s&&(s=1),void 0===n&&(n=1),this.target=t,this.lerp.set(s,n);var r;switch(e){case i.Camera.FOLLOW_PLATFORMER:var o=this.width/8,a=this.height/3;this.deadzone=new i.Rectangle((this.width-o)/2,(this.height-a)/2-.25*a,o,a);break;case i.Camera.FOLLOW_TOPDOWN:r=Math.max(this.width,this.height)/4,this.deadzone=new i.Rectangle((this.width-r)/2,(this.height-r)/2,r,r);break;case i.Camera.FOLLOW_TOPDOWN_TIGHT:r=Math.max(this.width,this.height)/8,this.deadzone=new i.Rectangle((this.width-r)/2,(this.height-r)/2,r,r);break;case i.Camera.FOLLOW_LOCKON:default:this.deadzone=null}},unfollow:function(){this.target=null},focusOn:function(t){this.setPosition(Math.round(t.x-this.view.halfWidth),Math.round(t.y-this.view.halfHeight))},focusOnXY:function(t,e){this.setPosition(Math.round(t-this.view.halfWidth),Math.round(e-this.view.halfHeight))},shake:function(t,e,s,n,r){return void 0===t&&(t=.05),void 0===e&&(e=500),void 0===s&&(s=!0),void 0===n&&(n=i.Camera.SHAKE_BOTH),void 0===r&&(r=!0),!(!s&&this._shake.duration>0)&&(this._shake.intensity=t,this._shake.duration=e,this._shake.shakeBounds=r,this._shake.x=0,this._shake.y=0,this._shake.horizontal=n===i.Camera.SHAKE_BOTH||n===i.Camera.SHAKE_HORIZONTAL,this._shake.vertical=n===i.Camera.SHAKE_BOTH||n===i.Camera.SHAKE_VERTICAL,!0)},flash:function(t,e,i,s){return void 0===t&&(t=16777215),void 0===e&&(e=500),void 0===i&&(i=!1),void 0===s&&(s=1),!(!this.fx||!i&&this._fxDuration>0)&&(this.fx.clear(),this.fx.beginFill(t,s),this.fx.drawRect(0,0,this.width,this.height),this.fx.endFill(),this.fx.alpha=1,this._fxDuration=e,this._fxType=0,!0)},fade:function(t,e,i,s){return void 0===t&&(t=0),void 0===e&&(e=500),void 0===i&&(i=!1),void 0===s&&(s=1),!(!this.fx||!i&&this._fxDuration>0)&&(this.fx.clear(),this.fx.beginFill(t,s),this.fx.drawRect(0,0,this.width,this.height),this.fx.endFill(),this.fx.alpha=0,this._fxDuration=e,this._fxType=1,!0)},update:function(){this._fxDuration>0&&this.updateFX(),this._shake.duration>0&&this.updateShake(),this.bounds&&this.checkBounds(),this.roundPx&&(this.view.floor(),this._shake.x=Math.floor(this._shake.x),this._shake.y=Math.floor(this._shake.y)),this.displayObject.position.x=-this.view.x,this.displayObject.position.y=-this.view.y},updateFX:function(){0===this._fxType?(this.fx.alpha-=this.game.time.elapsedMS/this._fxDuration,this.fx.alpha<=0&&(this._fxDuration=0,this.fx.alpha=0,this.onFlashComplete.dispatch())):(this.fx.alpha+=this.game.time.elapsedMS/this._fxDuration,this.fx.alpha>=1&&(this._fxDuration=0,this.fx.alpha=1,this.onFadeComplete.dispatch()))},updateShake:function(){this._shake.duration-=this.game.time.elapsedMS,this._shake.duration<=0?(this.onShakeComplete.dispatch(),this._shake.x=0,this._shake.y=0):(this._shake.horizontal&&(this._shake.x=this.game.rnd.frac()*this._shake.intensity*this.view.width*2-this._shake.intensity*this.view.width),this._shake.vertical&&(this._shake.y=this.game.rnd.frac()*this._shake.intensity*this.view.height*2-this._shake.intensity*this.view.height))},updateTarget:function(){this._targetPosition.x=this.view.x+this.target.worldPosition.x,this._targetPosition.y=this.view.y+this.target.worldPosition.y,this.deadzone?(this._edge=this._targetPosition.x-this.view.x,this._edge<this.deadzone.left?this.view.x=this.game.math.linear(this.view.x,this._targetPosition.x-this.deadzone.left,this.lerp.x):this._edge>this.deadzone.right&&(this.view.x=this.game.math.linear(this.view.x,this._targetPosition.x-this.deadzone.right,this.lerp.x)),this._edge=this._targetPosition.y-this.view.y,this._edge<this.deadzone.top?this.view.y=this.game.math.linear(this.view.y,this._targetPosition.y-this.deadzone.top,this.lerp.y):this._edge>this.deadzone.bottom&&(this.view.y=this.game.math.linear(this.view.y,this._targetPosition.y-this.deadzone.bottom,this.lerp.y))):(this.view.x=this.game.math.linear(this.view.x,this._targetPosition.x-this.view.halfWidth,this.lerp.x),this.view.y=this.game.math.linear(this.view.y,this._targetPosition.y-this.view.halfHeight,this.lerp.y)),this.bounds&&this.checkBounds(),this.roundPx&&this.view.floor(),this.displayObject.position.x=-this.view.x,this.displayObject.position.y=-this.view.y},setBoundsToWorld:function(){this.bounds&&this.bounds.copyFrom(this.game.world.bounds)},checkBounds:function(){this.atLimit.x=!1,this.atLimit.y=!1;var t=this.view.x+this._shake.x,e=this.view.right+this._shake.x,i=this.view.y+this._shake.y,s=this.view.bottom+this._shake.y;t<=this.bounds.x*this.scale.x?(this.atLimit.x=!0,this.view.x=this.bounds.x*this.scale.x,this._shake.shakeBounds||(this._shake.x=0)):e>=this.bounds.right*this.scale.x&&(this.atLimit.x=!0,this.view.x=this.bounds.right*this.scale.x-this.width,this._shake.shakeBounds||(this._shake.x=0)),i<=this.bounds.top*this.scale.y?(this.atLimit.y=!0,this.view.y=this.bounds.top*this.scale.y,this._shake.shakeBounds||(this._shake.y=0)):s>=this.bounds.bottom*this.scale.y&&(this.atLimit.y=!0,this.view.y=this.bounds.bottom*this.scale.y-this.height,this._shake.shakeBounds||(this._shake.y=0))},setPosition:function(t,e){this.view.x=t,this.view.y=e,this.bounds&&this.checkBounds()},setSize:function(t,e){this.view.width=t,this.view.height=e},reset:function(){this.target=null,this.view.x=0,this.view.y=0,this._shake.duration=0,this._shake.x=0,this._shake.y=0,this.resetFX()},resetFX:function(){this.fx&&(this.fx.clear(),this.fx.alpha=0),this._fxDuration=0}},i.Camera.prototype.constructor=i.Camera,Object.defineProperty(i.Camera.prototype,"x",{get:function(){return this.view.x},set:function(t){this.view.x=t,this.bounds&&this.checkBounds()}}),Object.defineProperty(i.Camera.prototype,"y",{get:function(){return this.view.y},set:function(t){this.view.y=t,this.bounds&&this.checkBounds()}}),Object.defineProperty(i.Camera.prototype,"position",{get:function(){return this._position.set(this.view.x,this.view.y),this._position},set:function(t){void 0!==t.x&&(this.view.x=t.x),void 0!==t.y&&(this.view.y=t.y),this.bounds&&this.checkBounds()}}),Object.defineProperty(i.Camera.prototype,"width",{get:function(){return this.view.width},set:function(t){this.view.width=t}}),Object.defineProperty(i.Camera.prototype,"height",{get:function(){return this.view.height},set:function(t){this.view.height=t}}),Object.defineProperty(i.Camera.prototype,"shakeIntensity",{get:function(){return this._shake.intensity},set:function(t){this._shake.intensity=t}}),Object.defineProperty(i.Camera.prototype,"fixedView",{get:function(){return this._fixedView.setTo(0,0,this.view.width,this.view.height),this._fixedView}}),i.State=function(){this.game=null,this.key="",this.add=null,this.make=null,this.camera=null,this.cache=null,this.input=null,this.load=null,this.math=null,this.sound=null,this.scale=null,this.stage=null,this.state=null,this.time=null,this.tweens=null,this.world=null,this.particles=null,this.physics=null,this.rnd=null},i.State.prototype={init:function(){},preload:function(){},loadUpdate:function(){},loadRender:function(){},create:function(){},update:function(){},preRender:function(){},render:function(){},resize:function(){},paused:function(){},resumed:function(){},pauseUpdate:function(){},shutdown:function(){}},i.State.prototype.constructor=i.State,i.StateManager=function(t,e){this.game=t,this.states={},this._pendingState=null,void 0!==e&&null!==e&&(this._pendingState=e),this._clearWorld=!1,this._clearCache=!1,this._created=!1,this._args=[],this.current="",this.onStateChange=new i.Signal,this.onInitCallback=null,this.onPreloadCallback=null,this.onCreateCallback=null,this.onUpdateCallback=null,this.onRenderCallback=null,this.onResizeCallback=null,this.onPreRenderCallback=null,this.onLoadUpdateCallback=null,this.onLoadRenderCallback=null,this.onPausedCallback=null,this.onResumedCallback=null,this.onPauseUpdateCallback=null,this.onShutDownCallback=null},i.StateManager.prototype={boot:function(){this.game.onPause.add(this.pause,this),this.game.onResume.add(this.resume,this),null!==this._pendingState&&"string"!=typeof this._pendingState&&this.add("default",this._pendingState,!0)},add:function(t,e,s){void 0===s&&(s=!1);var n;return e instanceof i.State?n=e:"object"==typeof e?(n=e).game=this.game:"function"==typeof e&&(n=new e(this.game)),this.states[t]=n,s&&(this.game.isBooted?this.start(t):this._pendingState=t),n},remove:function(t){this.current===t&&(this.callbackContext=null,this.onInitCallback=null,this.onShutDownCallback=null,this.onPreloadCallback=null,this.onLoadRenderCallback=null,this.onLoadUpdateCallback=null,this.onCreateCallback=null,this.onUpdateCallback=null,this.onPreRenderCallback=null,this.onRenderCallback=null,this.onResizeCallback=null,this.onPausedCallback=null,this.onResumedCallback=null,this.onPauseUpdateCallback=null),delete this.states[t]},start:function(t,e,i){void 0===e&&(e=!0),void 0===i&&(i=!1),this.checkState(t)&&(this._pendingState=t,this._clearWorld=e,this._clearCache=i,arguments.length>3&&(this._args=Array.prototype.splice.call(arguments,3)))},restart:function(t,e){void 0===t&&(t=!0),void 0===e&&(e=!1),this._pendingState=this.current,this._clearWorld=t,this._clearCache=e,arguments.length>2&&(this._args=Array.prototype.slice.call(arguments,2))},dummy:function(){},preUpdate:function(){if(this._pendingState&&this.game.isBooted){var t=this.current;if(this.clearCurrentState(),this.setCurrentState(this._pendingState),this.onStateChange.dispatch(this.current,t),this.current!==this._pendingState)return;this._pendingState=null,this.onPreloadCallback?(this.game.load.reset(!0),this.onPreloadCallback.call(this.callbackContext,this.game),0===this.game.load.totalQueuedFiles()&&0===this.game.load.totalQueuedPacks()?this.loadComplete():this.game.load.start()):this.loadComplete()}},clearCurrentState:function(){this.current&&(this.onShutDownCallback&&this.onShutDownCallback.call(this.callbackContext,this.game),this.game.tweens.removeAll(),this.game.camera.reset(),this.game.input.reset(!0),this.game.physics.clear(),this.game.time.removeAll(),this.game.scale.reset(this._clearWorld),this.game.debug&&this.game.debug.reset(),this._clearWorld&&(this.game.world.shutdown(),this._clearCache&&this.game.cache.destroy()))},checkState:function(t){var e=this.states[t];return e?!!(e.preload||e.create||e.update||e.render)||(console.warn("Invalid Phaser State object given. Must contain at least one of the required functions: preload, create, update or render"),!1):(console.warn("Phaser.StateManager - No state found with the key: "+t),!1)},link:function(t){var e=this.states[t];e.game=this.game,e.add=this.game.add,e.make=this.game.make,e.camera=this.game.camera,e.cache=this.game.cache,e.input=this.game.input,e.load=this.game.load,e.math=this.game.math,e.sound=this.game.sound,e.scale=this.game.scale,e.state=this,e.stage=this.game.stage,e.time=this.game.time,e.tweens=this.game.tweens,e.world=this.game.world,e.particles=this.game.particles,e.rnd=this.game.rnd,e.physics=this.game.physics,e.key=t},unlink:function(t){var e=this.states[t];e&&(e.game=null,e.add=null,e.make=null,e.camera=null,e.cache=null,e.input=null,e.load=null,e.math=null,e.sound=null,e.scale=null,e.state=null,e.stage=null,e.time=null,e.tweens=null,e.world=null,e.particles=null,e.rnd=null,e.physics=null)},setCurrentState:function(t){var e=this.states[t];this.callbackContext=e,this.link(t),this.onInitCallback=e.init||this.dummy,this.onPreloadCallback=e.preload||null,this.onLoadRenderCallback=e.loadRender||null,this.onLoadUpdateCallback=e.loadUpdate||null,this.onCreateCallback=e.create||null,this.onUpdateCallback=e.update||null,this.onPreRenderCallback=e.preRender||null,this.onRenderCallback=e.render||null,this.onResizeCallback=e.resize||null,this.onPausedCallback=e.paused||null,this.onResumedCallback=e.resumed||null,this.onPauseUpdateCallback=e.pauseUpdate||null,this.onShutDownCallback=e.shutdown||this.dummy,""!==this.current&&this.game.physics.reset(),this.current=t,this._created=!1,this.onInitCallback.apply(this.callbackContext,this._args),t===this._pendingState&&(this._args=[]),this.game._kickstart=!0},getCurrentState:function(){return this.states[this.current]},loadComplete:function(){!1===this._created&&this.onCreateCallback?(this._created=!0,this.onCreateCallback.call(this.callbackContext,this.game)):this._created=!0},loadUpdate:function(){!1===this._created&&this.onLoadUpdateCallback&&this.onLoadUpdateCallback.call(this.callbackContext,this.game)},pause:function(){this._created&&this.onPausedCallback&&this.onPausedCallback.call(this.callbackContext,this.game)},resume:function(){this._created&&this.onResumedCallback&&this.onResumedCallback.call(this.callbackContext,this.game)},update:function(){this._created?this.onUpdateCallback&&this.onUpdateCallback.call(this.callbackContext,this.game):this.onLoadUpdateCallback&&this.onLoadUpdateCallback.call(this.callbackContext,this.game)},pauseUpdate:function(){this._created?this.onPauseUpdateCallback&&this.onPauseUpdateCallback.call(this.callbackContext,this.game):this.onLoadUpdateCallback&&this.onLoadUpdateCallback.call(this.callbackContext,this.game)},preRender:function(t){this._created&&this.onPreRenderCallback&&this.onPreRenderCallback.call(this.callbackContext,this.game,t)},resize:function(t,e){this.onResizeCallback&&this.onResizeCallback.call(this.callbackContext,t,e)},render:function(){this._created?this.onRenderCallback&&(this.game.renderType===i.CANVAS?(this.game.context.save(),this.game.context.setTransform(1,0,0,1,0,0),this.onRenderCallback.call(this.callbackContext,this.game),this.game.context.restore()):this.onRenderCallback.call(this.callbackContext,this.game)):this.onLoadRenderCallback&&this.onLoadRenderCallback.call(this.callbackContext,this.game)},destroy:function(){this._clearWorld=!0,this._clearCache=!0,this.clearCurrentState(),this.callbackContext=null,this.onInitCallback=null,this.onShutDownCallback=null,this.onPreloadCallback=null,this.onLoadRenderCallback=null,this.onLoadUpdateCallback=null,this.onCreateCallback=null,this.onUpdateCallback=null,this.onRenderCallback=null,this.onPausedCallback=null,this.onResumedCallback=null,this.onPauseUpdateCallback=null,this.game=null,this.states={},this._pendingState=null,this.current=""}},i.StateManager.prototype.constructor=i.StateManager,Object.defineProperty(i.StateManager.prototype,"created",{get:function(){return this._created}}),i.Signal=function(){},i.Signal.prototype={_bindings:null,_prevParams:null,memorize:!1,_shouldPropagate:!0,active:!0,_boundDispatch:!1,validateListener:function(t,e){if("function"!=typeof t)throw new Error("Phaser.Signal: listener is a required param of {fn}() and should be a Function.".replace("{fn}",e))},_registerListener:function(t,e,s,n,r){var o,a=this._indexOfListener(t,s);if(-1!==a){if((o=this._bindings[a]).isOnce()!==e)throw new Error("You cannot add"+(e?"":"Once")+"() then add"+(e?"Once":"")+"() the same listener without removing the relationship first.")}else o=new i.SignalBinding(this,t,e,s,n,r),this._addBinding(o);return this.memorize&&this._prevParams&&o.execute(this._prevParams),o},_addBinding:function(t){this._bindings||(this._bindings=[]);var e=this._bindings.length;do{e--}while(this._bindings[e]&&t._priority<=this._bindings[e]._priority);this._bindings.splice(e+1,0,t)},_indexOfListener:function(t,e){if(!this._bindings)return-1;void 0===e&&(e=null);for(var i,s=this._bindings.length;s--;)if((i=this._bindings[s])._listener===t&&i.context===e)return s;return-1},has:function(t,e){return-1!==this._indexOfListener(t,e)},add:function(t,e,i){this.validateListener(t,"add");var s=[];if(arguments.length>3)for(var n=3;n<arguments.length;n++)s.push(arguments[n]);return this._registerListener(t,!1,e,i,s)},addOnce:function(t,e,i){this.validateListener(t,"addOnce");var s=[];if(arguments.length>3)for(var n=3;n<arguments.length;n++)s.push(arguments[n]);return this._registerListener(t,!0,e,i,s)},remove:function(t,e){this.validateListener(t,"remove");var i=this._indexOfListener(t,e);return-1!==i&&(this._bindings[i]._destroy(),this._bindings.splice(i,1)),t},removeAll:function(t){if(void 0===t&&(t=null),this._bindings){for(var e=this._bindings.length;e--;)t?this._bindings[e].context===t&&(this._bindings[e]._destroy(),this._bindings.splice(e,1)):this._bindings[e]._destroy();t||(this._bindings.length=0)}},getNumListeners:function(){return this._bindings?this._bindings.length:0},halt:function(){this._shouldPropagate=!1},dispatch:function(){if(this.active&&this._bindings){var t,e=Array.prototype.slice.call(arguments),i=this._bindings.length;if(this.memorize&&(this._prevParams=e),i){t=this._bindings.slice(),this._shouldPropagate=!0;do{i--}while(t[i]&&this._shouldPropagate&&!1!==t[i].execute(e))}}},forget:function(){this._prevParams&&(this._prevParams=null)},dispose:function(){this.removeAll(),this._bindings=null,this._prevParams&&(this._prevParams=null)},toString:function(){return"[Phaser.Signal active:"+this.active+" numListeners:"+this.getNumListeners()+"]"}},Object.defineProperty(i.Signal.prototype,"boundDispatch",{get:function(){var t=this;return this._boundDispatch||(this._boundDispatch=function(){return t.dispatch.apply(t,arguments)})}}),i.Signal.prototype.constructor=i.Signal,i.SignalBinding=function(t,e,i,s,n,r){this._listener=e,i&&(this._isOnce=!0),null!=s&&(this.context=s),this._signal=t,n&&(this._priority=n),r&&r.length&&(this._args=r)},i.SignalBinding.prototype={context:null,_isOnce:!1,_priority:0,_args:null,callCount:0,active:!0,params:null,execute:function(t){var e,i;return this.active&&this._listener&&(i=this.params?this.params.concat(t):t,this._args&&(i=i.concat(this._args)),e=this._listener.apply(this.context,i),this.callCount++,this._isOnce&&this.detach()),e},detach:function(){return this.isBound()?this._signal.remove(this._listener,this.context):null},isBound:function(){return!!this._signal&&!!this._listener},isOnce:function(){return this._isOnce},getListener:function(){return this._listener},getSignal:function(){return this._signal},_destroy:function(){delete this._signal,delete this._listener,delete this.context},toString:function(){return"[Phaser.SignalBinding isOnce:"+this._isOnce+", isBound:"+this.isBound()+", active:"+this.active+"]"}},i.SignalBinding.prototype.constructor=i.SignalBinding,i.Filter=function(t,e,s){this.game=t,this.type=i.WEBGL_FILTER,this.passes=[this],this.shaders=[],this.dirty=!0,this.padding=0,this.prevPoint=new i.Point;var n=new Date;if(this.uniforms={resolution:{type:"2f",value:{x:256,y:256}},time:{type:"1f",value:0},mouse:{type:"2f",value:{x:0,y:0}},date:{type:"4fv",value:[n.getFullYear(),n.getMonth(),n.getDate(),60*n.getHours()*60+60*n.getMinutes()+n.getSeconds()]},sampleRate:{type:"1f",value:44100},iChannel0:{type:"sampler2D",value:null,textureData:{repeat:!0}},iChannel1:{type:"sampler2D",value:null,textureData:{repeat:!0}},iChannel2:{type:"sampler2D",value:null,textureData:{repeat:!0}},iChannel3:{type:"sampler2D",value:null,textureData:{repeat:!0}}},e)for(var r in e)this.uniforms[r]=e[r];"string"==typeof s&&(s=s.split("\n")),this.fragmentSrc=s||[]},i.Filter.prototype={init:function(){},setResolution:function(t,e){this.uniforms.resolution.value.x=t,this.uniforms.resolution.value.y=e},update:function(t){if(t){var e=t.x/this.game.width,i=1-t.y/this.game.height;e===this.prevPoint.x&&i===this.prevPoint.y||(this.uniforms.mouse.value.x=e.toFixed(2),this.uniforms.mouse.value.y=i.toFixed(2),this.prevPoint.set(e,i))}this.uniforms.time.value=this.game.time.totalElapsedSeconds()},addToWorld:function(t,e,s,n,r,o){void 0===r&&(r=0),void 0===o&&(o=0),void 0!==s&&null!==s?this.width=s:s=this.width,void 0!==n&&null!==n?this.height=n:n=this.height;var a=this.game.add.image(t,e,i.Cache.DEFAULT);return a.width=s,a.height=n,a.anchor.set(r,o),a.filters=[this],a},syncUniforms:function(){for(var t=0;t<this.shaders.length;t++)this.shaders[t].dirty=!0},destroy:function(){this.passes.length=0,this.shaders.length=0,this.fragmentSrc.length=0,this.game=null,this.uniforms=null,this.prevPoint=null}},i.Filter.prototype.constructor=i.Filter,Object.defineProperty(i.Filter.prototype,"width",{get:function(){return this.uniforms.resolution.value.x},set:function(t){this.uniforms.resolution.value.x=t}}),Object.defineProperty(i.Filter.prototype,"height",{get:function(){return this.uniforms.resolution.value.y},set:function(t){this.uniforms.resolution.value.y=t}}),i.Plugin=function(t,e){void 0===e&&(e=null),this.game=t,this.parent=e,this.active=!1,this.visible=!1,this.hasPreUpdate=!1,this.hasUpdate=!1,this.hasPostUpdate=!1,this.hasRender=!1,this.hasPostRender=!1},i.Plugin.prototype={preUpdate:function(){},update:function(){},render:function(){},postRender:function(){},destroy:function(){this.game=null,this.parent=null,this.active=!1,this.visible=!1}},i.Plugin.prototype.constructor=i.Plugin,i.PluginManager=function(t){this.game=t,this.plugins=[],this._len=0,this._i=0},i.PluginManager.prototype={add:function(t){var e=Array.prototype.slice.call(arguments,1),i=!1;return"function"==typeof t?t=new t(this.game,this):(t.game=this.game,t.parent=this),"function"==typeof t.preUpdate&&(t.hasPreUpdate=!0,i=!0),"function"==typeof t.update&&(t.hasUpdate=!0,i=!0),"function"==typeof t.postUpdate&&(t.hasPostUpdate=!0,i=!0),"function"==typeof t.render&&(t.hasRender=!0,i=!0),"function"==typeof t.postRender&&(t.hasPostRender=!0,i=!0),i?((t.hasPreUpdate||t.hasUpdate||t.hasPostUpdate)&&(t.active=!0),(t.hasRender||t.hasPostRender)&&(t.visible=!0),this._len=this.plugins.push(t),"function"==typeof t.init&&t.init.apply(t,e),t):null},remove:function(t,e){for(void 0===e&&(e=!0),this._i=this._len;this._i--;)if(this.plugins[this._i]===t)return e&&t.destroy(),this.plugins.splice(this._i,1),void this._len--},removeAll:function(){for(this._i=this._len;this._i--;)this.plugins[this._i].destroy();this.plugins.length=0,this._len=0},preUpdate:function(){for(this._i=this._len;this._i--;)this.plugins[this._i].active&&this.plugins[this._i].hasPreUpdate&&this.plugins[this._i].preUpdate()},update:function(){for(this._i=this._len;this._i--;)this.plugins[this._i].active&&this.plugins[this._i].hasUpdate&&this.plugins[this._i].update()},postUpdate:function(){for(this._i=this._len;this._i--;)this.plugins[this._i].active&&this.plugins[this._i].hasPostUpdate&&this.plugins[this._i].postUpdate()},render:function(){for(this._i=this._len;this._i--;)this.plugins[this._i].visible&&this.plugins[this._i].hasRender&&this.plugins[this._i].render()},postRender:function(){for(this._i=this._len;this._i--;)this.plugins[this._i].visible&&this.plugins[this._i].hasPostRender&&this.plugins[this._i].postRender()},destroy:function(){this.removeAll(),this.game=null}},i.PluginManager.prototype.constructor=i.PluginManager,i.Stage=function(t){this.game=t,PIXI.DisplayObjectContainer.call(this),this.name="_stage_root",this.disableVisibilityChange=!1,this.exists=!0,this.worldTransform=new i.Matrix,this.stage=this,this.currentRenderOrderID=0,this._hiddenVar="hidden",this._onChange=null,this._bgColor={r:0,g:0,b:0,a:0,color:0,rgba:"#000000"},this.game.transparent||(this._bgColor.a=1),t.config&&this.parseConfig(t.config)},i.Stage.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),i.Stage.prototype.constructor=i.Stage,i.Stage.prototype.parseConfig=function(t){t.disableVisibilityChange&&(this.disableVisibilityChange=t.disableVisibilityChange),t.backgroundColor&&this.setBackgroundColor(t.backgroundColor)},i.Stage.prototype.boot=function(){i.DOM.getOffset(this.game.canvas,this.offset),i.Canvas.setUserSelect(this.game.canvas,"none"),i.Canvas.setTouchAction(this.game.canvas,"none"),this.checkVisibility()},i.Stage.prototype.preUpdate=function(){this.currentRenderOrderID=0;for(var t=0;t<this.children.length;){var e=this.children[t];e.preUpdate(),this===e.parent&&t++}},i.Stage.prototype.update=function(){for(var t=this.children.length;t--;)this.children[t].update()},i.Stage.prototype.postUpdate=function(){this.game.camera.update(),this.game.camera.target&&(this.game.camera.target.postUpdate(),this.updateTransform(),this.game.camera.updateTarget());for(var t=0;t<this.children.length;t++)this.children[t].postUpdate();this.updateTransform()},i.Stage.prototype.updateTransform=function(){this.worldAlpha=1;for(var t=0;t<this.children.length;t++)this.children[t].updateTransform()},i.Stage.prototype.checkVisibility=function(){void 0!==document.hidden?this._hiddenVar="visibilitychange":void 0!==document.webkitHidden?this._hiddenVar="webkitvisibilitychange":void 0!==document.mozHidden?this._hiddenVar="mozvisibilitychange":void 0!==document.msHidden?this._hiddenVar="msvisibilitychange":this._hiddenVar=null;var t=this;this._onChange=function(e){return t.visibilityChange(e)},this._onClick=function(e){void 0===document.hasFocus||document.hasFocus()||t.visibilityChange(e)},this._hiddenVar&&document.addEventListener(this._hiddenVar,this._onChange,!1),window.onblur=this._onChange,window.onfocus=this._onChange,window.onpagehide=this._onChange,window.onpageshow=this._onChange,window.addEventListener("click",this._onClick),this.game.device.cocoonJSApp&&(CocoonJS.App.onSuspended.addEventListener(function(){i.Stage.prototype.visibilityChange.call(t,{type:"pause"})}),CocoonJS.App.onActivated.addEventListener(function(){i.Stage.prototype.visibilityChange.call(t,{type:"resume"})}))},i.Stage.prototype.visibilityChange=function(t){switch(t.type){case"blur":case"pagehide":return void this.game.focusLoss(t);case"click":case"focus":case"pageshow":return void this.game.focusGain(t)}this.disableVisibilityChange||(document.hidden||document.mozHidden||document.msHidden||document.webkitHidden||"pause"===t.type?this.game.gamePaused(t):this.game.gameResumed(t))},i.Stage.prototype.setBackgroundColor=function(t){this.game.transparent||(i.Color.valueToColor(t,this._bgColor),i.Color.updateColor(this._bgColor),this._bgColor.r/=255,this._bgColor.g/=255,this._bgColor.b/=255,this._bgColor.a=1)},i.Stage.prototype.destroy=function(){this._hiddenVar&&document.removeEventListener(this._hiddenVar,this._onChange,!1),window.onpagehide=null,window.onpageshow=null,window.onblur=null,window.onfocus=null,window.removeEventListener("click",this._onClick)},i.Stage.prototype.add=function(t,e,i){return t.parent===this?t:(t.body&&t.parent&&t.parent.hash&&t.parent.removeFromHash(t),void 0===i?this.addChild(t):this.addChildAt(t,i),t)},Object.defineProperty(i.Stage.prototype,"backgroundColor",{get:function(){return this._bgColor.color},set:function(t){this.setBackgroundColor(t)}}),Object.defineProperty(i.Stage.prototype,"smoothed",{get:function(){return PIXI.scaleModes.DEFAULT===PIXI.scaleModes.LINEAR},set:function(t){PIXI.scaleModes.DEFAULT=t?PIXI.scaleModes.LINEAR:PIXI.scaleModes.NEAREST}}),i.Group=function(t,e,s,n,r,o){void 0===n&&(n=!1),void 0===r&&(r=!1),void 0===o&&(o=i.Physics.ARCADE),this.game=t,void 0===e&&(e=t.world),this.name=s||"group",this.z=0,PIXI.DisplayObjectContainer.call(this),n?(this.game.stage.addChild(this),this.z=this.game.stage.children.length):e&&(e.addChild(this),this.z=e.children.length),this.type=i.GROUP,this.physicsType=i.GROUP,this.alive=!0,this.exists=!0,this.ignoreDestroy=!1,this.pendingDestroy=!1,this.classType=i.Sprite,this.cursor=null,this.inputEnableChildren=!1,this.updateOnlyExistingChildren=!1,this.onChildInputDown=new i.Signal,this.onChildInputUp=new i.Signal,this.onChildInputOver=new i.Signal,this.onChildInputOut=new i.Signal,this.enableBody=r,this.enableBodyDebug=!1,this.physicsBodyType=o,this.physicsSortDirection=null,this.onDestroy=new i.Signal,this.cursorIndex=0,this.fixedToCamera=!1,this.cameraOffset=new i.Point,this.hash=[],this._sortProperty="z"},i.Group.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),i.Group.prototype.constructor=i.Group,i.Group.RETURN_NONE=0,i.Group.RETURN_TOTAL=1,i.Group.RETURN_CHILD=2,i.Group.RETURN_ALL=3,i.Group.SORT_ASCENDING=-1,i.Group.SORT_DESCENDING=1,i.Group.prototype.add=function(t,e,i){return void 0===e&&(e=!1),t.parent===this?t:(t.body&&t.parent&&t.parent.hash&&t.parent.removeFromHash(t),void 0===i?(t.z=this.children.length,this.addChild(t)):(this.addChildAt(t,i),this.updateZ()),this.enableBody&&t.hasOwnProperty("body")&&null===t.body?this.game.physics.enable(t,this.physicsBodyType):t.body&&this.addToHash(t),!this.inputEnableChildren||t.input&&!t.inputEnabled||(t.inputEnabled=!0),!e&&t.events&&t.events.onAddedToGroup$dispatch(t,this),null===this.cursor&&(this.cursor=t),t)},i.Group.prototype.addAt=function(t,e,i){return this.add(t,i,e)},i.Group.prototype.addToHash=function(t){return t.parent===this&&-1===this.hash.indexOf(t)&&(this.hash.push(t),!0)},i.Group.prototype.removeFromHash=function(t){if(t){var e=this.hash.indexOf(t);if(-1!==e)return this.hash.splice(e,1),!0}return!1},i.Group.prototype.addMultiple=function(t,e){if(t instanceof i.Group)t.moveAll(this,e);else if(Array.isArray(t))for(var s=0;s<t.length;s++)this.add(t[s],e);return t},i.Group.prototype.getAt=function(t){return t<0||t>=this.children.length?-1:this.getChildAt(t)},i.Group.prototype.create=function(t,e,i,s,n,r){void 0===n&&(n=!0);var o=new this.classType(this.game,t,e,i,s);return o.exists=n,o.visible=n,o.alive=n,this.add(o,!1,r)},i.Group.prototype.createMultiple=function(t,e,i,s,n,r){void 0===i&&(i=0),void 0===s&&(s=!1),Array.isArray(e)||(e=[e]),Array.isArray(i)||(i=[i]);var o=this,a=[];return e.forEach(function(e){i.forEach(function(i){for(var h=0;h<t;h++){var u=o.create(0,0,e,i,s);n&&n.call(r||u,u,h),a.push(u)}})}),a},i.Group.prototype.updateZ=function(){for(var t=this.children.length;t--;)this.children[t].z=t},i.Group.prototype.align=function(t,e,s,n,r,o){if(void 0===r&&(r=i.TOP_LEFT),void 0===o&&(o=0),0===this.children.length||o>this.children.length||-1===t&&-1===e)return!1;for(var a=new i.Rectangle(0,0,s,n),h=t*s,u=e*n,l=o;l<this.children.length;l++){var c=this.children[l];if(c.alignIn)if(c.alignIn(a,r),-1===t)a.y+=n,a.y===u&&(a.x+=s,a.y=0);else if(-1===e)a.x+=s,a.x===h&&(a.x=0,a.y+=n);else if(a.x+=s,a.x===h&&(a.x=0,a.y+=n,a.y===u))return!0}return!0},i.Group.prototype.resetCursor=function(t){if(void 0===t&&(t=0),t>this.children.length-1&&(t=0),this.cursor)return this.cursorIndex=t,this.cursor=this.children[this.cursorIndex],this.cursor},i.Group.prototype.next=function(){if(this.cursor)return this.cursorIndex>=this.children.length-1?this.cursorIndex=0:this.cursorIndex++,this.cursor=this.children[this.cursorIndex],this.cursor},i.Group.prototype.previous=function(){if(this.cursor)return 0===this.cursorIndex?this.cursorIndex=this.children.length-1:this.cursorIndex--,this.cursor=this.children[this.cursorIndex],this.cursor},i.Group.prototype.swap=function(t,e){this.swapChildren(t,e),this.updateZ()},i.Group.prototype.bringToTop=function(t){return t.parent===this&&this.getIndex(t)<this.children.length&&(this.remove(t,!1,!0),this.add(t,!0)),t},i.Group.prototype.sendToBack=function(t){return t.parent===this&&this.getIndex(t)>0&&(this.remove(t,!1,!0),this.addAt(t,0,!0)),t},i.Group.prototype.moveUp=function(t){if(t.parent===this&&this.getIndex(t)<this.children.length-1){var e=this.getIndex(t),i=this.getAt(e+1);i&&this.swap(t,i)}return t},i.Group.prototype.moveDown=function(t){if(t.parent===this&&this.getIndex(t)>0){var e=this.getIndex(t),i=this.getAt(e-1);i&&this.swap(t,i)}return t},i.Group.prototype.xy=function(t,e,i){if(t<0||t>this.children.length)return-1;this.getChildAt(t).x=e,this.getChildAt(t).y=i},i.Group.prototype.reverse=function(){this.children.reverse(),this.updateZ()},i.Group.prototype.getIndex=function(t){return this.children.indexOf(t)},i.Group.prototype.getByName=function(t){for(var e=0;e<this.children.length;e++)if(this.children[e].name===t)return this.children[e];return null},i.Group.prototype.replace=function(t,e){var s=this.getIndex(t);if(-1!==s)return e.parent&&(e.parent instanceof i.Group?e.parent.remove(e):e.parent.removeChild(e)),this.remove(t),this.addAt(e,s),t},i.Group.prototype.hasProperty=function(t,e){var i=e.length;return 1===i&&e[0]in t||(2===i&&e[0]in t&&e[1]in t[e[0]]||(3===i&&e[0]in t&&e[1]in t[e[0]]&&e[2]in t[e[0]][e[1]]||4===i&&e[0]in t&&e[1]in t[e[0]]&&e[2]in t[e[0]][e[1]]&&e[3]in t[e[0]][e[1]][e[2]]))},i.Group.prototype.setProperty=function(t,e,i,s,n){if(void 0===n&&(n=!1),s=s||0,!this.hasProperty(t,e)&&(!n||s>0))return!1;var r=e.length;return 1===r?0===s?t[e[0]]=i:1===s?t[e[0]]+=i:2===s?t[e[0]]-=i:3===s?t[e[0]]*=i:4===s&&(t[e[0]]/=i):2===r?0===s?t[e[0]][e[1]]=i:1===s?t[e[0]][e[1]]+=i:2===s?t[e[0]][e[1]]-=i:3===s?t[e[0]][e[1]]*=i:4===s&&(t[e[0]][e[1]]/=i):3===r?0===s?t[e[0]][e[1]][e[2]]=i:1===s?t[e[0]][e[1]][e[2]]+=i:2===s?t[e[0]][e[1]][e[2]]-=i:3===s?t[e[0]][e[1]][e[2]]*=i:4===s&&(t[e[0]][e[1]][e[2]]/=i):4===r&&(0===s?t[e[0]][e[1]][e[2]][e[3]]=i:1===s?t[e[0]][e[1]][e[2]][e[3]]+=i:2===s?t[e[0]][e[1]][e[2]][e[3]]-=i:3===s?t[e[0]][e[1]][e[2]][e[3]]*=i:4===s&&(t[e[0]][e[1]][e[2]][e[3]]/=i)),!0},i.Group.prototype.checkProperty=function(t,e,s,n){if(void 0===n&&(n=!1),this!==t.parent)return!1;var r=i.Utils.getProperty(t,e);return!(void 0===r&&n||r!==s)},i.Group.prototype.set=function(t,e,i,s,n,r,o){if(void 0===o&&(o=!1),e=e.split("."),void 0===s&&(s=!1),void 0===n&&(n=!1),(!1===s||s&&t.alive)&&(!1===n||n&&t.visible))return this.setProperty(t,e,i,r,o)},i.Group.prototype.setAll=function(t,e,i,s,n,r){void 0===i&&(i=!1),void 0===s&&(s=!1),void 0===r&&(r=!1),t=t.split("."),n=n||0;for(var o=0;o<this.children.length;o++)(!i||i&&this.children[o].alive)&&(!s||s&&this.children[o].visible)&&this.setProperty(this.children[o],t,e,n,r)},i.Group.prototype.setAllChildren=function(t,e,s,n,r,o){void 0===s&&(s=!1),void 0===n&&(n=!1),void 0===o&&(o=!1),r=r||0;for(var a=0;a<this.children.length;a++)(!s||s&&this.children[a].alive)&&(!n||n&&this.children[a].visible)&&(this.children[a]instanceof i.Group?this.children[a].setAllChildren(t,e,s,n,r,o):this.setProperty(this.children[a],t.split("."),e,r,o))},i.Group.prototype.checkAll=function(t,e,i,s,n){void 0===i&&(i=!1),void 0===s&&(s=!1),void 0===n&&(n=!1);for(var r=0;r<this.children.length;r++){var o=this.children[r];if((!i||i&&o.alive)&&(!s||s&&o.visible)&&!this.checkProperty(o,t,e,n))return!1}return!0},i.Group.prototype.checkAny=function(t,e,i,s){void 0===i&&(i=!1),void 0===s&&(s=!1);for(var n=0;n<this.children.length;n++){var r=this.children[n];if((!i||i&&r.alive)&&(!s||s&&r.visible)&&this.checkProperty(r,t,e))return!0}return!1},i.Group.prototype.addAll=function(t,e,i,s){this.setAll(t,e,i,s,1)},i.Group.prototype.subAll=function(t,e,i,s){this.setAll(t,e,i,s,2)},i.Group.prototype.multiplyAll=function(t,e,i,s){this.setAll(t,e,i,s,3)},i.Group.prototype.divideAll=function(t,e,i,s){this.setAll(t,e,i,s,4)},i.Group.prototype.kill=function(){this.alive=!1,this.exists=!1,this.visible=!1},i.Group.prototype.killAll=function(){this.callAllExists("kill",!0)},i.Group.prototype.revive=function(){this.alive=!0,this.exists=!0,this.visible=!0},i.Group.prototype.reviveAll=function(){this.callAllExists("revive",!1)},i.Group.prototype.resetAll=function(t,e,i,s,n){this.forEach(this.resetChild,this,n,t,e,i,s)},i.Group.prototype.callAllExists=function(t,e){var i;if(arguments.length>2){i=[];for(s=2;s<arguments.length;s++)i.push(arguments[s])}for(var s=0;s<this.children.length;s++)this.children[s].exists===e&&this.children[s][t]&&this.children[s][t].apply(this.children[s],i)},i.Group.prototype.callbackFromArray=function(t,e,i){if(1===i){if(t[e[0]])return t[e[0]]}else if(2===i){if(t[e[0]][e[1]])return t[e[0]][e[1]]}else if(3===i){if(t[e[0]][e[1]][e[2]])return t[e[0]][e[1]][e[2]]}else if(4===i){if(t[e[0]][e[1]][e[2]][e[3]])return t[e[0]][e[1]][e[2]][e[3]]}else if(t[e])return t[e];return!1},i.Group.prototype.callAll=function(t,e){if(void 0!==t){var i=(t=t.split(".")).length;if(void 0===e||null===e||""===e)e=null;else if("string"==typeof e)var s=(e=e.split(".")).length;var n;if(arguments.length>2){n=[];for(a=2;a<arguments.length;a++)n.push(arguments[a])}for(var r=null,o=null,a=0;a<this.children.length;a++)r=this.callbackFromArray(this.children[a],t,i),e&&r?(o=this.callbackFromArray(this.children[a],e,s),r&&r.apply(o,n)):r&&r.apply(this.children[a],n)}},i.Group.prototype.preUpdate=function(){if(this.pendingDestroy)return this.destroy(),!1;if(!this.exists||!this.parent.exists)return this.renderOrderID=-1,!1;for(var t=0;t<this.children.length;){var e=this.children[t];e.preUpdate(),this===e.parent&&t++}return!0},i.Group.prototype.update=function(){for(var t=this.children.length;t--;){var e=this.children.length;t>=e&&(t=e-1);var i=this.children[t];this.updateOnlyExistingChildren&&!i.exists||i.update()}},i.Group.prototype.postUpdate=function(){this.fixedToCamera&&(this.x=(this.game.camera.view.x+this.cameraOffset.x)/this.game.camera.scale.x,this.y=(this.game.camera.view.y+this.cameraOffset.y)/this.game.camera.scale.y);for(var t=0;t<this.children.length;t++)this.children[t].postUpdate()},i.Group.prototype.filter=function(t,e){for(var s=-1,n=this.children.length,r=[];++s<n;){var o=this.children[s];(!e||e&&o.exists)&&t(o,s,this.children)&&r.push(o)}return new i.ArraySet(r)},i.Group.prototype.forEach=function(t,e,i){if(void 0===i&&(i=!1),arguments.length<=3)for(n=0;n<this.children.length;n++)(!i||i&&this.children[n].exists)&&t.call(e,this.children[n]);else{for(var s=[null],n=3;n<arguments.length;n++)s.push(arguments[n]);for(n=0;n<this.children.length;n++)(!i||i&&this.children[n].exists)&&(s[0]=this.children[n],t.apply(e,s))}},i.Group.prototype.forEachExists=function(t,e){var s;if(arguments.length>2){s=[null];for(var n=2;n<arguments.length;n++)s.push(arguments[n])}this.iterate("exists",!0,i.Group.RETURN_TOTAL,t,e,s)},i.Group.prototype.forEachAlive=function(t,e){var s;if(arguments.length>2){s=[null];for(var n=2;n<arguments.length;n++)s.push(arguments[n])}this.iterate("alive",!0,i.Group.RETURN_TOTAL,t,e,s)},i.Group.prototype.forEachDead=function(t,e){var s;if(arguments.length>2){s=[null];for(var n=2;n<arguments.length;n++)s.push(arguments[n])}this.iterate("alive",!1,i.Group.RETURN_TOTAL,t,e,s)},i.Group.prototype.sort=function(t,e){this.children.length<2||(void 0===t&&(t="z"),void 0===e&&(e=i.Group.SORT_ASCENDING),this._sortProperty=t,e===i.Group.SORT_ASCENDING?this.children.sort(this.ascendingSortHandler.bind(this)):this.children.sort(this.descendingSortHandler.bind(this)),this.updateZ())},i.Group.prototype.customSort=function(t,e){this.children.length<2||(this.children.sort(t.bind(e)),this.updateZ())},i.Group.prototype.ascendingSortHandler=function(t,e){return t[this._sortProperty]<e[this._sortProperty]?-1:t[this._sortProperty]>e[this._sortProperty]?1:t.z<e.z?-1:1},i.Group.prototype.descendingSortHandler=function(t,e){return t[this._sortProperty]<e[this._sortProperty]?1:t[this._sortProperty]>e[this._sortProperty]?-1:0},i.Group.prototype.iterate=function(t,e,s,n,r,o){if(0===this.children.length){if(s===i.Group.RETURN_TOTAL)return 0;if(s===i.Group.RETURN_ALL)return[]}var a=0;if(s===i.Group.RETURN_ALL)var h=[];for(var u=0;u<this.children.length;u++)if(this.children[u][t]===e){if(a++,n&&(o?(o[0]=this.children[u],n.apply(r,o)):n.call(r,this.children[u])),s===i.Group.RETURN_CHILD)return this.children[u];s===i.Group.RETURN_ALL&&h.push(this.children[u])}return s===i.Group.RETURN_TOTAL?a:s===i.Group.RETURN_ALL?h:null},i.Group.prototype.getFirst=function(t,e){return this.iterate(t,e,i.Group.RETURN_CHILD)},i.Group.prototype.getFirstExists=function(t,e,i,s,n,r){void 0===e&&(e=!1),"boolean"!=typeof t&&(t=!0);var o=this.getFirst("exists",t);return null===o&&e?this.create(i,s,n,r):this.resetChild(o,i,s,n,r)},i.Group.prototype.getFirstAlive=function(t,e,i,s,n){void 0===t&&(t=!1);var r=this.getFirst("alive",!0);return null===r&&t?this.create(e,i,s,n):this.resetChild(r,e,i,s,n)},i.Group.prototype.getFirstDead=function(t,e,i,s,n){void 0===t&&(t=!1);var r=this.getFirst("alive",!1);return null===r&&t?this.create(e,i,s,n):this.resetChild(r,e,i,s,n)},i.Group.prototype.resetChild=function(t,e,i,s,n){return null===t?null:(void 0===e&&(e=null),void 0===i&&(i=null),null!==e&&null!==i&&t.reset(e,i),void 0!==s&&t.loadTexture(s,n),t)},i.Group.prototype.getTop=function(){if(this.children.length>0)return this.children[this.children.length-1]},i.Group.prototype.getBottom=function(){if(this.children.length>0)return this.children[0]},i.Group.prototype.getClosestTo=function(t,e,s){for(var n=Number.MAX_VALUE,r=0,o=null,a=0;a<this.children.length;a++){var h=this.children[a];h.exists&&(r=Math.abs(i.Point.distance(t,h)))<n&&(!e||e.call(s,h,r))&&(n=r,o=h)}return o},i.Group.prototype.getFurthestFrom=function(t,e,s){for(var n=0,r=0,o=null,a=0;a<this.children.length;a++){var h=this.children[a];h.exists&&(r=Math.abs(i.Point.distance(t,h)))>n&&(!e||e.call(s,h,r))&&(n=r,o=h)}return o},i.Group.prototype.count=function(t,e){return this.iterate(t,e,i.Group.RETURN_TOTAL)},i.Group.prototype.countLiving=function(){return this.count("alive",!0)},i.Group.prototype.countDead=function(){return this.count("alive",!1)},i.Group.prototype.getRandom=function(t,e){return void 0===t&&(t=0),void 0===e&&(e=this.children.length),0===e?null:i.ArrayUtils.getRandomItem(this.children,t,e)},i.Group.prototype.getRandomExists=function(t,e){var i=this.getAll("exists",!0,t,e);return this.game.rnd.pick(i)},i.Group.prototype.getAll=function(t,e,i,s){void 0===i&&(i=0),void 0===s&&(s=this.children.length);for(var n=[],r=i;r<s;r++){var o=this.children[r];t?o[t]===e&&n.push(o):n.push(o)}return n},i.Group.prototype.remove=function(t,e,i){if(void 0===e&&(e=!1),void 0===i&&(i=!1),0===this.children.length||-1===this.children.indexOf(t))return!1;i||!t.events||t.destroyPhase||t.events.onRemovedFromGroup$dispatch(t,this);var s=this.removeChild(t);return this.removeFromHash(t),this.updateZ(),this.cursor===t&&this.next(),e&&s&&s.destroy(!0),!0},i.Group.prototype.moveAll=function(t,e){if(void 0===e&&(e=!1),this.children.length>0&&t instanceof i.Group){do{t.add(this.children[0],e)}while(this.children.length>0);this.hash=[],this.cursor=null}return t},i.Group.prototype.removeAll=function(t,e,i){if(void 0===t&&(t=!1),void 0===e&&(e=!1),void 0===i&&(i=!1),0!==this.children.length){do{!e&&this.children[0].events&&this.children[0].events.onRemovedFromGroup$dispatch(this.children[0],this);var s=this.removeChild(this.children[0]);this.removeFromHash(s),t&&s&&s.destroy(!0,i)}while(this.children.length>0);this.hash=[],this.cursor=null}},i.Group.prototype.removeBetween=function(t,e,i,s){if(void 0===e&&(e=this.children.length-1),void 0===i&&(i=!1),void 0===s&&(s=!1),0!==this.children.length){if(t>e||t<0||e>this.children.length)return!1;for(var n=e;n>=t;){!s&&this.children[n].events&&this.children[n].events.onRemovedFromGroup$dispatch(this.children[n],this);var r=this.removeChild(this.children[n]);this.removeFromHash(r),i&&r&&r.destroy(!0),this.cursor===this.children[n]&&(this.cursor=null),n--}this.updateZ()}},i.Group.prototype.scatter=function(t,e){null==t&&(t=this.game.world.bounds),this.forEach(function(e){e.position.set(t.randomX,t.randomY)},null,e)},i.Group.prototype.shuffle=function(){i.ArrayUtils.shuffle(this.children),this.updateZ()},i.Group.prototype.destroy=function(t,e){null===this.game||this.ignoreDestroy||(void 0===t&&(t=!0),void 0===e&&(e=!1),this.onDestroy.dispatch(this,t,e),this.removeAll(t),this.cursor=null,this.filters=null,this.pendingDestroy=!1,e||(this.parent&&this.parent.removeChild(this),this.game=null,this.exists=!1))},Object.defineProperty(i.Group.prototype,"total",{get:function(){return this.iterate("exists",!0,i.Group.RETURN_TOTAL)}}),Object.defineProperty(i.Group.prototype,"length",{get:function(){return this.children.length}}),Object.defineProperty(i.Group.prototype,"angle",{get:function(){return i.Math.radToDeg(this.rotation)},set:function(t){this.rotation=i.Math.degToRad(t)}}),Object.defineProperty(i.Group.prototype,"centerX",{get:function(){return this.getBounds(this.parent).centerX},set:function(t){var e=this.getBounds(this.parent),i=this.x-e.x;this.x=t+i-e.halfWidth}}),Object.defineProperty(i.Group.prototype,"centerY",{get:function(){return this.getBounds(this.parent).centerY},set:function(t){var e=this.getBounds(this.parent),i=this.y-e.y;this.y=t+i-e.halfHeight}}),Object.defineProperty(i.Group.prototype,"left",{get:function(){return this.getBounds(this.parent).left},set:function(t){var e=this.getBounds(this.parent),i=this.x-e.x;this.x=t+i}}),Object.defineProperty(i.Group.prototype,"right",{get:function(){return this.getBounds(this.parent).right},set:function(t){var e=this.getBounds(this.parent),i=this.x-e.x;this.x=t+i-e.width}}),Object.defineProperty(i.Group.prototype,"top",{get:function(){return this.getBounds(this.parent).top},set:function(t){var e=this.getBounds(this.parent),i=this.y-e.y;this.y=t+i}}),Object.defineProperty(i.Group.prototype,"bottom",{get:function(){return this.getBounds(this.parent).bottom},set:function(t){var e=this.getBounds(this.parent),i=this.y-e.y;this.y=t+i-e.height}}),i.World=function(t){i.Group.call(this,t,null,"__world",!1),this.bounds=new i.Rectangle(0,0,t.width,t.height),this.camera=null,this._definedSize=!1,this._width=t.width,this._height=t.height,this.game.state.onStateChange.add(this.stateChange,this)},i.World.prototype=Object.create(i.Group.prototype),i.World.prototype.constructor=i.World,i.World.prototype.boot=function(){this.camera=new i.Camera(this.game,0,0,0,this.game.width,this.game.height),this.game.stage.addChild(this),this.camera.boot()},i.World.prototype.stateChange=function(){this.x=0,this.y=0,this.camera.reset()},i.World.prototype.setBounds=function(t,e,i,s){this._definedSize=!0,this._width=i,this._height=s,this.bounds.setTo(t,e,i,s),this.x=t,this.y=e,this.camera.bounds&&this.camera.bounds.setTo(t,e,Math.max(i,this.game.width),Math.max(s,this.game.height)),this.game.physics.setBoundsToWorld()},i.World.prototype.resize=function(t,e){this._definedSize&&(t<this._width&&(t=this._width),e<this._height&&(e=this._height)),this.bounds.width=t,this.bounds.height=e,this.game.camera.setBoundsToWorld(),this.game.physics.setBoundsToWorld()},i.World.prototype.shutdown=function(){this.destroy(!0,!0)},i.World.prototype.wrap=function(t,e,i,s,n){void 0===e&&(e=0),void 0===i&&(i=!1),void 0===s&&(s=!0),void 0===n&&(n=!0),i?(t.getBounds(),s&&(t.x+t._currentBounds.width<this.bounds.x?t.x=this.bounds.right:t.x>this.bounds.right&&(t.x=this.bounds.left)),n&&(t.y+t._currentBounds.height<this.bounds.top?t.y=this.bounds.bottom:t.y>this.bounds.bottom&&(t.y=this.bounds.top))):(s&&t.x+e<this.bounds.x?t.x=this.bounds.right+e:s&&t.x-e>this.bounds.right&&(t.x=this.bounds.left-e),n&&t.y+e<this.bounds.top?t.y=this.bounds.bottom+e:n&&t.y-e>this.bounds.bottom&&(t.y=this.bounds.top-e))},i.World.prototype.wrapAll=function(t,e,i,s,n,r){t.forEach(this.wrap,this,e,i,s,n,r)},Object.defineProperty(i.World.prototype,"width",{get:function(){return this.bounds.width},set:function(t){t<this.game.width&&(t=this.game.width),this.bounds.width=t,this._width=t,this._definedSize=!0}}),Object.defineProperty(i.World.prototype,"height",{get:function(){return this.bounds.height},set:function(t){t<this.game.height&&(t=this.game.height),this.bounds.height=t,this._height=t,this._definedSize=!0}}),Object.defineProperty(i.World.prototype,"centerX",{get:function(){return this.bounds.halfWidth+this.bounds.x}}),Object.defineProperty(i.World.prototype,"centerY",{get:function(){return this.bounds.halfHeight+this.bounds.y}}),Object.defineProperty(i.World.prototype,"randomX",{get:function(){return this.bounds.x<0?this.game.rnd.between(this.bounds.x,this.bounds.width-Math.abs(this.bounds.x)):this.game.rnd.between(this.bounds.x,this.bounds.width)}}),Object.defineProperty(i.World.prototype,"randomY",{get:function(){return this.bounds.y<0?this.game.rnd.between(this.bounds.y,this.bounds.height-Math.abs(this.bounds.y)):this.game.rnd.between(this.bounds.y,this.bounds.height)}}),i.Game=function(t,e,s,n,r,o,a,h){return this.id=i.GAMES.push(this)-1,this.config=null,this.physicsConfig=h,this.parent="",this.width=800,this.height=600,this.resolution=1,this._width=800,this._height=600,this.transparent=!1,this.antialias=!0,this.multiTexture=!1,this.preserveDrawingBuffer=!1,this.clearBeforeRender=!0,this.renderer=null,this.renderType=i.AUTO,this.state=null,this.isBooted=!1,this.isRunning=!1,this.raf=null,this.add=null,this.make=null,this.cache=null,this.input=null,this.load=null,this.math=null,this.net=null,this.scale=null,this.sound=null,this.stage=null,this.time=null,this.tweens=null,this.world=null,this.physics=null,this.plugins=null,this.rnd=null,this.device=i.Device,this.camera=null,this.canvas=null,this.context=null,this.debug=null,this.particles=null,this.create=null,this.lockRender=!1,this.pendingDestroy=!1,this.stepping=!1,this.pendingStep=!1,this.stepCount=0,this.onPause=null,this.onResume=null,this.onBlur=null,this.onFocus=null,this._paused=!1,this._codePaused=!1,this.currentUpdateID=0,this.updatesThisFrame=1,this.rendersThisFrame=1,this._deltaTime=0,this._lastCount=0,this._spiraling=0,this._kickstart=!0,this.fpsProblemNotifier=new i.Signal,this.forceSingleUpdate=!0,this.forceSingleRender=!0,this.dropFrames=!1,this._nextFpsNotification=0,1===arguments.length&&"object"==typeof arguments[0]?this.parseConfig(arguments[0]):(this.config={enableDebug:!0},void 0!==t&&(this._width=t),void 0!==e&&(this._height=e),void 0!==s&&(this.renderType=s),void 0!==n&&(this.parent=n),void 0!==o&&(this.transparent=o),void 0!==a&&(this.antialias=a),this.rnd=new i.RandomDataGenerator([(Date.now()*Math.random()).toString()]),this.state=new i.StateManager(this,r)),this.device.whenReady(this.boot,this),this},i.Game.prototype={parseConfig:function(t){this.config=t,void 0===t.enableDebug&&(this.config.enableDebug=!0),t.width&&(this._width=t.width),t.height&&(this._height=t.height),t.renderer&&(this.renderType=t.renderer),t.parent&&(this.parent=t.parent),void 0!==t.transparent&&(this.transparent=t.transparent),void 0!==t.antialias&&(this.antialias=t.antialias),void 0!==t.multiTexture&&(this.multiTexture=t.multiTexture),t.resolution&&(this.resolution=t.resolution),void 0!==t.preserveDrawingBuffer&&(this.preserveDrawingBuffer=t.preserveDrawingBuffer),t.physicsConfig&&(this.physicsConfig=t.physicsConfig);var e=[(Date.now()*Math.random()).toString()];t.seed&&(e=t.seed),this.rnd=new i.RandomDataGenerator(e);var s=null;t.state&&(s=t.state),this.state=new i.StateManager(this,s)},boot:function(){this.isBooted||(this.onPause=new i.Signal,this.onResume=new i.Signal,this.onBlur=new i.Signal,this.onFocus=new i.Signal,this.isBooted=!0,PIXI.game=this,this.math=i.Math,this.scale=new i.ScaleManager(this,this._width,this._height),this.stage=new i.Stage(this),this.setUpRenderer(),this.world=new i.World(this),this.add=new i.GameObjectFactory(this),this.make=new i.GameObjectCreator(this),this.cache=new i.Cache(this),this.load=new i.Loader(this),this.time=new i.Time(this),this.tweens=new i.TweenManager(this),this.input=new i.Input(this),this.sound=new i.SoundManager(this),this.physics=new i.Physics(this,this.physicsConfig),this.particles=new i.Particles(this),this.create=new i.Create(this),this.plugins=new i.PluginManager(this),this.net=new i.Net(this),this.time.boot(),this.stage.boot(),this.world.boot(),this.scale.boot(),this.input.boot(),this.sound.boot(),this.state.boot(),this.config.enableDebug?(this.debug=new i.Utils.Debug(this),this.debug.boot()):this.debug={preUpdate:function(){},update:function(){},reset:function(){},isDisabled:!0},this.showDebugHeader(),this.isRunning=!0,this.config&&this.config.forceSetTimeOut?this.raf=new i.RequestAnimationFrame(this,this.config.forceSetTimeOut):this.raf=new i.RequestAnimationFrame(this,!1),this._kickstart=!0,window.focus&&(!window.PhaserGlobal||window.PhaserGlobal&&!window.PhaserGlobal.stopFocus)&&window.focus(),this.config.disableStart||(this.cache.isReady?this.raf.start():this.cache.onReady.addOnce(function(){this.raf.start()},this)))},showDebugHeader:function(){if(!window.PhaserGlobal||!window.PhaserGlobal.hideBanner){var t=i.VERSION,e="Canvas",s="HTML Audio",n=1;if(this.renderType===i.WEBGL?(e="WebGL",n++):this.renderType===i.HEADLESS&&(e="Headless"),this.device.webAudio&&(s="WebAudio",n++),this.device.ie)window.console&&console.log("Phaser v"+t+" | Pixi.js | "+e+" | "+s+" | http://phaser.io");else{for(var r=["%c %c %c Phaser CE v"+t+" | Pixi.js | "+e+" | "+s+"  %c %c %c http://phaser.io %c♥%c♥%c♥","background: #fb8cb3","background: #d44a52","color: #ffffff; background: #871905;","background: #d44a52","background: #fb8cb3","background: #ffffff"],o=0;o<3;o++)o<n?r.push("color: #ff2424; background: #fff"):r.push("color: #959595; background: #fff");console.log.apply(console,r)}}},setUpRenderer:function(){if(!this.device.canvas)throw new Error("Phaser.Game - Cannot create Canvas 2d context, aborting.");if(this.config.canvas?this.canvas=this.config.canvas:this.canvas=i.Canvas.create(this,this.width,this.height,this.config.canvasID,!0),this.config.canvasStyle?this.canvas.style=this.config.canvasStyle:this.canvas.style["-webkit-full-screen"]="width: 100%; height: 100%",this.config.crisp&&i.Canvas.setImageRenderingCrisp(this.canvas),this.renderType===i.WEBGL||this.renderType===i.WEBGL_MULTI||this.renderType===i.AUTO&&this.device.webGL){(this.multiTexture||this.renderType===i.WEBGL_MULTI)&&(PIXI.enableMultiTexture(),this.multiTexture=!0);try{this.renderer=new PIXI.WebGLRenderer(this,this.config),this.renderType=i.WEBGL,this.context=null,this.canvas.addEventListener("webglcontextlost",this.contextLost.bind(this),!1),this.canvas.addEventListener("webglcontextrestored",this.contextRestored.bind(this),!1)}catch(t){if(this.renderer=null,this.multiTexture=!1,PIXI._enableMultiTextureToggle=!1,this.renderType===i.WEBGL)throw t}}this.renderer||(this.renderer=new PIXI.CanvasRenderer(this,this.config),this.context=this.renderer.context,this.renderType===i.AUTO&&(this.renderType=i.CANVAS)),this.device.cocoonJS&&(this.canvas.screencanvas=this.renderType===i.CANVAS),this.renderType!==i.HEADLESS&&(this.stage.smoothed=this.antialias,i.Canvas.addToDOM(this.canvas,this.parent,!1),i.Canvas.setTouchAction(this.canvas))},contextLost:function(t){t.preventDefault(),this.renderer.contextLost=!0},contextRestored:function(){this.renderer.initContext(),this.cache.clearGLTextures(),this.renderer.contextLost=!1},update:function(t){if(this.pendingDestroy)this.destroy();else{if(this.time.update(t),this._kickstart)return this.updateLogic(this.time.desiredFpsMult),this.updateRender(this.time.slowMotion*this.time.desiredFps),void(this._kickstart=!1);if(this._spiraling>1&&!this.forceSingleUpdate)this.time.time>this._nextFpsNotification&&(this._nextFpsNotification=this.time.time+1e4,this.fpsProblemNotifier.dispatch()),this._deltaTime=0,this._spiraling=0,this.dropFrames?this.rendersThisFrame=0:(this.updateRender(this.time.slowMotion*this.time.desiredFps),this.rendersThisFrame=1);else{var e=1e3*this.time.slowMotion/this.time.desiredFps;this._deltaTime+=Math.max(Math.min(3*e,this.time.elapsed),0);var i=0;for(this.updatesThisFrame=Math.floor(this._deltaTime/e),this.forceSingleUpdate&&(this.updatesThisFrame=Math.min(1,this.updatesThisFrame)),this.forceSingleRender?this.rendersThisFrame=1:this.rendersThisFrame=Math.min(1,this.updatesThisFrame);this._deltaTime>=e&&(this._deltaTime-=e,this.currentUpdateID=i,this.updateLogic(this.time.desiredFpsMult),i++,!this.forceSingleUpdate||1!==i);)this.time.refresh();i>this._lastCount?this._spiraling++:i<this._lastCount&&(this._spiraling=0),this._lastCount=i,this.rendersThisFrame>0&&this.updateRender(this._deltaTime/e)}}},updateLogic:function(t){this._paused||this.pendingStep?(this.scale.pauseUpdate(),this.state.pauseUpdate(t),this.debug.preUpdate(),this.input.pauseUpdate()):(this.stepping&&(this.pendingStep=!0),this.time.countUpdate(),this.scale.preUpdate(),this.debug.preUpdate(),this.camera.preUpdate(),this.physics.preUpdate(),this.state.preUpdate(t),this.plugins.preUpdate(t),this.stage.preUpdate(),this.state.update(),this.stage.update(),this.tweens.update(),this.sound.update(),this.input.update(),this.physics.update(),this.plugins.update(),this.stage.postUpdate(),this.plugins.postUpdate()),this.stage.updateTransform()},updateRender:function(t){this.lockRender||(this.time.countRender(),this.state.preRender(t),this.renderType!==i.HEADLESS&&(this.renderer.render(this.stage),this.plugins.render(t),this.state.render(t)),this.plugins.postRender(t))},enableStep:function(){this.stepping=!0,this.pendingStep=!1,this.stepCount=0},disableStep:function(){this.stepping=!1,this.pendingStep=!1},step:function(){this.pendingStep=!1,this.stepCount++},destroy:function(){this.raf.stop(),this.debug.destroy&&this.debug.destroy(),this.state.destroy(),this.sound.destroy(),this.scale.destroy(),this.stage.destroy(),this.input.destroy(),this.physics.destroy(),this.plugins.destroy(),this.debug=null,this.state=null,this.sound=null,this.scale=null,this.stage=null,this.input=null,this.physics=null,this.plugins=null,this.cache=null,this.load=null,this.time=null,this.world=null,this.isBooted=!1,this.renderer.destroy(!1),i.Canvas.removeFromDOM(this.canvas),PIXI.defaultRenderer=null,i.GAMES[this.id]=null},gamePaused:function(t){this._paused||(this._paused=!0,this.time.gamePaused(),this.sound.muteOnPause&&this.sound.setMute(),this.onPause.dispatch(t),this.device.cordova&&this.device.iOS&&(this.lockRender=!0))},gameResumed:function(t){this._paused&&!this._codePaused&&(this._paused=!1,this.time.gameResumed(),this.input.reset(),this.sound.muteOnPause&&this.sound.unsetMute(),this.onResume.dispatch(t),this.device.cordova&&this.device.iOS&&(this.lockRender=!1))},focusLoss:function(t){this.onBlur.dispatch(t),this.stage.disableVisibilityChange||this.gamePaused(t)},focusGain:function(t){this.onFocus.dispatch(t),this.stage.disableVisibilityChange||this.gameResumed(t)}},i.Game.prototype.constructor=i.Game,Object.defineProperty(i.Game.prototype,"paused",{get:function(){return this._paused},set:function(t){!0===t?(!1===this._paused&&(this._paused=!0,this.sound.setMute(),this.time.gamePaused(),this.onPause.dispatch(this)),this._codePaused=!0):(this._paused&&(this._paused=!1,this.input.reset(),this.sound.unsetMute(),this.time.gameResumed(),this.onResume.dispatch(this)),this._codePaused=!1)}}),i.Input=function(t){this.game=t,this.hitCanvas=null,this.hitContext=null,this.moveCallbacks=[],this.customCandidateHandler=null,this.customCandidateHandlerContext=null,this.pollRate=0,this.enabled=!0,this.multiInputOverride=i.Input.MOUSE_TOUCH_COMBINE,this.position=null,this.speed=null,this.circle=null,this.scale=null,this.maxPointers=-1,this.tapRate=200,this.doubleTapRate=300,this.holdRate=2e3,this.justPressedRate=200,this.justReleasedRate=200,this.recordPointerHistory=!1,this.recordRate=100,this.recordLimit=100,this.touchLockCallbacks=[],this.pointer1=null,this.pointer2=null,this.pointer3=null,this.pointer4=null,this.pointer5=null,this.pointer6=null,this.pointer7=null,this.pointer8=null,this.pointer9=null,this.pointer10=null,this.pointers=[],this.activePointer=null,this.mousePointer=null,this.mouse=null,this.keyboard=null,this.touch=null,this.mspointer=null,this.gamepad=null,this.resetLocked=!1,this.onDown=null,this.onUp=null,this.onTap=null,this.onHold=null,this.minPriorityID=0,this.interactiveItems=new i.ArraySet,this._localPoint=new i.Point,this._pollCounter=0,this._oldPosition=null,this._x=0,this._y=0},i.Input.MOUSE_OVERRIDES_TOUCH=0,i.Input.TOUCH_OVERRIDES_MOUSE=1,i.Input.MOUSE_TOUCH_COMBINE=2,i.Input.MAX_POINTERS=10,i.Input.prototype={boot:function(){this.mousePointer=new i.Pointer(this.game,0,i.PointerMode.CURSOR),this.addPointer(),this.addPointer(),this.mouse=new i.Mouse(this.game),this.touch=new i.Touch(this.game),this.mspointer=new i.MSPointer(this.game),i.Keyboard&&(this.keyboard=new i.Keyboard(this.game)),i.Gamepad&&(this.gamepad=new i.Gamepad(this.game)),this.onDown=new i.Signal,this.onUp=new i.Signal,this.onTap=new i.Signal,this.onHold=new i.Signal,this.scale=new i.Point(1,1),this.speed=new i.Point,this.position=new i.Point,this._oldPosition=new i.Point,this.circle=new i.Circle(0,0,44),this.activePointer=this.mousePointer,this.hitCanvas=i.CanvasPool.create(this,1,1),this.hitContext=this.hitCanvas.getContext("2d"),this.mouse.start(),this.game.device.mspointer||this.touch.start(),this.mspointer.start(),this.mousePointer.active=!0,this.keyboard&&this.keyboard.start();var t=this;this._onClickTrampoline=function(e){t.onClickTrampoline(e)},this.game.canvas.addEventListener("click",this._onClickTrampoline,!1)},destroy:function(){this.mouse.stop(),this.touch.stop(),this.mspointer.stop(),this.keyboard&&this.keyboard.stop(),this.gamepad&&this.gamepad.stop(),this.moveCallbacks=[],i.CanvasPool.remove(this),this.game.canvas.removeEventListener("click",this._onClickTrampoline)},setInteractiveCandidateHandler:function(t,e){this.customCandidateHandler=t,this.customCandidateHandlerContext=e},addMoveCallback:function(t,e){this.moveCallbacks.push({callback:t,context:e})},addTouchLockCallback:function(t,e,i){void 0===i&&(i=!1),this.touchLockCallbacks.push({callback:t,context:e,onEnd:i})},removeTouchLockCallback:function(t,e){for(var i=this.touchLockCallbacks.length;i--;)if(this.touchLockCallbacks[i].callback===t&&this.touchLockCallbacks[i].context===e)return this.touchLockCallbacks.splice(i,1),!0;return!1},executeTouchLockCallbacks:function(t,e){for(var i=this.touchLockCallbacks.length;i--;){var s=this.touchLockCallbacks[i];s.onEnd===t&&s.callback.call(s.context,this,e)&&this.touchLockCallbacks.splice(i,1)}},deleteMoveCallback:function(t,e){for(var i=this.moveCallbacks.length;i--;)if(this.moveCallbacks[i].callback===t&&this.moveCallbacks[i].context===e)return void this.moveCallbacks.splice(i,1)},addPointer:function(){if(this.pointers.length>=i.Input.MAX_POINTERS)return console.warn("Phaser.Input.addPointer: Maximum limit of "+i.Input.MAX_POINTERS+" pointers reached."),null;var t=this.pointers.length+1,e=new i.Pointer(this.game,t,i.PointerMode.CONTACT);return this.pointers.push(e),this["pointer"+t]=e,e},update:function(){if(this.keyboard&&this.keyboard.update(),this.pollRate>0&&this._pollCounter<this.pollRate)this._pollCounter++;else{this.speed.x=this.position.x-this._oldPosition.x,this.speed.y=this.position.y-this._oldPosition.y,this._oldPosition.copyFrom(this.position),this.mousePointer.update(),this.gamepad&&this.gamepad.active&&this.gamepad.update();for(var t=0;t<this.pointers.length;t++)this.pointers[t].update();this._pollCounter=0}},pauseUpdate:function(){this.gamepad&&this.gamepad.active&&this.gamepad.update()},reset:function(t){if(this.game.isBooted&&!this.resetLocked){void 0===t&&(t=!1),this.mousePointer.reset(),this.keyboard&&this.keyboard.reset(t);for(var e=0;e<this.pointers.length;e++)this.pointers[e].reset();"none"!==this.game.canvas.style.cursor&&(this.game.canvas.style.cursor=""),t&&(this.onDown.dispose(),this.onUp.dispose(),this.onTap.dispose(),this.onHold.dispose(),this.onDown=new i.Signal,this.onUp=new i.Signal,this.onTap=new i.Signal,this.onHold=new i.Signal,this.moveCallbacks=[]),this._pollCounter=0}},resetSpeed:function(t,e){this._oldPosition.setTo(t,e),this.speed.setTo(0,0)},startPointer:function(t){if(this.maxPointers>=0&&this.countActivePointers(this.maxPointers)>=this.maxPointers)return null;if(!this.pointer1.active)return this.pointer1.start(t);if(!this.pointer2.active)return this.pointer2.start(t);for(var e=2;e<this.pointers.length;e++){var i=this.pointers[e];if(!i.active)return i.start(t)}return null},updatePointer:function(t){if(this.pointer1.active&&this.pointer1.identifier===t.identifier)return this.pointer1.move(t);if(this.pointer2.active&&this.pointer2.identifier===t.identifier)return this.pointer2.move(t);for(var e=2;e<this.pointers.length;e++){var i=this.pointers[e];if(i.active&&i.identifier===t.identifier)return i.move(t)}return null},stopPointer:function(t){if(this.pointer1.active&&this.pointer1.identifier===t.identifier)return this.pointer1.stop(t);if(this.pointer2.active&&this.pointer2.identifier===t.identifier)return this.pointer2.stop(t);for(var e=2;e<this.pointers.length;e++){var i=this.pointers[e];if(i.active&&i.identifier===t.identifier)return i.stop(t)}return null},countActivePointers:function(t){void 0===t&&(t=this.pointers.length);for(var e=t,i=0;i<this.pointers.length&&e>0;i++)this.pointers[i].active&&e--;return t-e},getPointer:function(t){void 0===t&&(t=!1);for(var e=0;e<this.pointers.length;e++){var i=this.pointers[e];if(i.active===t)return i}return null},getPointerFromIdentifier:function(t){for(var e=0;e<this.pointers.length;e++){var i=this.pointers[e];if(i.identifier===t)return i}return null},getPointerFromId:function(t){for(var e=0;e<this.pointers.length;e++){var i=this.pointers[e];if(i.pointerId===t)return i}return null},getLocalPosition:function(t,e,s){void 0===s&&(s=new i.Point);var n=t.worldTransform,r=1/(n.a*n.d+n.c*-n.b);return s.setTo(n.d*r*e.x+-n.c*r*e.y+(n.ty*n.c-n.tx*n.d)*r,n.a*r*e.y+-n.b*r*e.x+(-n.ty*n.a+n.tx*n.b)*r)},hitTest:function(t,e,s){if(!t.worldVisible)return!1;if(this.getLocalPosition(t,e,this._localPoint),s.copyFrom(this._localPoint),t.hitArea&&t.hitArea.contains)return t.hitArea.contains(this._localPoint.x,this._localPoint.y);if(i.Creature&&t instanceof i.Creature){var n=Math.abs(t.width),r=Math.abs(t.height),o=t.x-n*t.anchorX;if(this.game.camera.x+e.x>=o&&this.game.camera.x+e.x<o+n){a=t.y-r*t.anchorY;if(this.game.camera.y+e.y>=a&&this.game.camera.y+e.y<a+r)return!0}}else if(t instanceof i.TileSprite){var n=t.width,r=t.height,o=-n*t.anchor.x;if(this._localPoint.x>=o&&this._localPoint.x<o+n){a=-r*t.anchor.y;if(this._localPoint.y>=a&&this._localPoint.y<a+r)return!0}}else if(t instanceof PIXI.Sprite){var n=t.texture.frame.width/t.texture.baseTexture.resolution,r=t.texture.frame.height/t.texture.baseTexture.resolution,o=-n*t.anchor.x;if(this._localPoint.x>=o&&this._localPoint.x<o+n){var a=-r*t.anchor.y;if(this._localPoint.y>=a&&this._localPoint.y<a+r)return!0}}else if(t instanceof i.Graphics)for(u=0;u<t.graphicsData.length;u++){var h=t.graphicsData[u];if(h.fill&&(h.shape&&h.shape.contains(this._localPoint.x,this._localPoint.y)))return!0}for(var u=0;u<t.children.length;u++)if(this.hitTest(t.children[u],e,s))return!0;return!1},onClickTrampoline:function(){this.activePointer.processClickTrampolines()}},i.Input.prototype.constructor=i.Input,Object.defineProperty(i.Input.prototype,"x",{get:function(){return this._x},set:function(t){this._x=Math.floor(t)}}),Object.defineProperty(i.Input.prototype,"y",{get:function(){return this._y},set:function(t){this._y=Math.floor(t)}}),Object.defineProperty(i.Input.prototype,"pollLocked",{get:function(){return this.pollRate>0&&this._pollCounter<this.pollRate}}),Object.defineProperty(i.Input.prototype,"totalInactivePointers",{get:function(){return this.pointers.length-this.countActivePointers()}}),Object.defineProperty(i.Input.prototype,"totalActivePointers",{get:function(){return this.countActivePointers()}}),Object.defineProperty(i.Input.prototype,"worldX",{get:function(){return this.game.camera.view.x+this.x}}),Object.defineProperty(i.Input.prototype,"worldY",{get:function(){return this.game.camera.view.y+this.y}}),i.Mouse=function(t){this.game=t,this.input=t.input,this.callbackContext=this.game,this.mouseDownCallback=null,this.mouseUpCallback=null,this.mouseOutCallback=null,this.mouseOverCallback=null,this.mouseWheelCallback=null,this.capture=!1,this.button=-1,this.wheelDelta=0,this.enabled=!0,this.locked=!1,this.stopOnGameOut=!1,this.pointerLock=new i.Signal,this.event=null,this._onMouseDown=null,this._onMouseMove=null,this._onMouseUp=null,this._onMouseOut=null,this._onMouseOver=null,this._onMouseWheel=null,this._wheelEvent=null},i.Mouse.NO_BUTTON=-1,i.Mouse.LEFT_BUTTON=0,i.Mouse.MIDDLE_BUTTON=1,i.Mouse.RIGHT_BUTTON=2,i.Mouse.BACK_BUTTON=3,i.Mouse.FORWARD_BUTTON=4,i.Mouse.WHEEL_UP=1,i.Mouse.WHEEL_DOWN=-1,i.Mouse.prototype={start:function(){if((!this.game.device.android||!1!==this.game.device.chrome)&&null===this._onMouseDown){var e=this;this._onMouseDown=function(t){return e.onMouseDown(t)},this._onMouseMove=function(t){return e.onMouseMove(t)},this._onMouseUp=function(t){return e.onMouseUp(t)},this._onMouseUpGlobal=function(t){return e.onMouseUpGlobal(t)},this._onMouseOutGlobal=function(t){return e.onMouseOutGlobal(t)},this._onMouseOut=function(t){return e.onMouseOut(t)},this._onMouseOver=function(t){return e.onMouseOver(t)},this._onMouseWheel=function(t){return e.onMouseWheel(t)};var i=this.game.canvas;i.addEventListener("mousedown",this._onMouseDown,!0),i.addEventListener("mousemove",this._onMouseMove,!0),i.addEventListener("mouseup",this._onMouseUp,!0),this.game.device.cocoonJS||(window.addEventListener("mouseup",this._onMouseUpGlobal,!0),window.addEventListener("mouseout",this._onMouseOutGlobal,!0),i.addEventListener("mouseover",this._onMouseOver,!0),i.addEventListener("mouseout",this._onMouseOut,!0));var s=this.game.device.wheelEvent;s&&(i.addEventListener(s,this._onMouseWheel,!0),"mousewheel"===s?this._wheelEvent=new t(-.025,1):"DOMMouseScroll"===s&&(this._wheelEvent=new t(1,1)))}},onMouseDown:function(t){this.event=t,this.capture&&t.preventDefault(),this.mouseDownCallback&&this.mouseDownCallback.call(this.callbackContext,t),this.input.enabled&&this.enabled&&(t.identifier=0,this.input.mousePointer.start(t))},onMouseMove:function(t){this.event=t,this.capture&&t.preventDefault(),this.mouseMoveCallback&&this.mouseMoveCallback.call(this.callbackContext,t),this.input.enabled&&this.enabled&&(t.identifier=0,this.input.mousePointer.move(t))},onMouseUp:function(t){this.event=t,this.capture&&t.preventDefault(),this.mouseUpCallback&&this.mouseUpCallback.call(this.callbackContext,t),this.input.enabled&&this.enabled&&(t.identifier=0,this.input.mousePointer.stop(t))},onMouseUpGlobal:function(t){this.input.mousePointer.withinGame||(this.mouseUpCallback&&this.mouseUpCallback.call(this.callbackContext,t),t.identifier=0,this.input.mousePointer.stop(t))},onMouseOutGlobal:function(t){this.event=t,this.capture&&t.preventDefault(),this.input.mousePointer.withinGame=!1,this.input.enabled&&this.enabled&&(this.input.mousePointer.stop(t),this.input.mousePointer.resetButtons())},onMouseOut:function(t){if(this.event=t,this.capture&&t.preventDefault(),this.input.mousePointer.withinGame=!1,this.mouseOutCallback&&this.mouseOutCallback.call(this.callbackContext,t),this.input.enabled&&this.enabled){this.stopOnGameOut&&(t.identifier=0,this.input.mousePointer.stop(t));for(var e in this.input.interactiveItems.list)!0===this.input.interactiveItems.list[e].enabled&&this.input.interactiveItems.list[e]._pointerOutHandler(this.input.mousePointer)}},onMouseOver:function(t){this.event=t,this.capture&&t.preventDefault(),this.input.mousePointer.withinGame=!0,this.mouseOverCallback&&this.mouseOverCallback.call(this.callbackContext,t)},onMouseWheel:function(t){this._wheelEvent&&(t=this._wheelEvent.bindEvent(t)),this.event=t,this.capture&&t.preventDefault(),this.wheelDelta=i.Math.clamp(-t.deltaY,-1,1),this.mouseWheelCallback&&this.mouseWheelCallback.call(this.callbackContext,t)},requestPointerLock:function(){if(this.game.device.pointerLock){var t=this.game.canvas;t.requestPointerLock=t.requestPointerLock||t.mozRequestPointerLock||t.webkitRequestPointerLock,t.requestPointerLock();var e=this;this._pointerLockChange=function(t){return e.pointerLockChange(t)},document.addEventListener("pointerlockchange",this._pointerLockChange,!0),document.addEventListener("mozpointerlockchange",this._pointerLockChange,!0),document.addEventListener("webkitpointerlockchange",this._pointerLockChange,!0)}},pointerLockChange:function(t){var e=this.game.canvas;document.pointerLockElement===e||document.mozPointerLockElement===e||document.webkitPointerLockElement===e?(this.locked=!0,this.pointerLock.dispatch(!0,t)):(this.locked=!1,this.pointerLock.dispatch(!1,t))},releasePointerLock:function(){document.exitPointerLock=document.exitPointerLock||document.mozExitPointerLock||document.webkitExitPointerLock,document.exitPointerLock(),document.removeEventListener("pointerlockchange",this._pointerLockChange,!0),document.removeEventListener("mozpointerlockchange",this._pointerLockChange,!0),document.removeEventListener("webkitpointerlockchange",this._pointerLockChange,!0)},stop:function(){var t=this.game.canvas;t.removeEventListener("mousedown",this._onMouseDown,!0),t.removeEventListener("mousemove",this._onMouseMove,!0),t.removeEventListener("mouseup",this._onMouseUp,!0),t.removeEventListener("mouseover",this._onMouseOver,!0),t.removeEventListener("mouseout",this._onMouseOut,!0);var e=this.game.device.wheelEvent;e&&t.removeEventListener(e,this._onMouseWheel,!0),window.removeEventListener("mouseup",this._onMouseUpGlobal,!0),window.removeEventListener("mouseout",this._onMouseOutGlobal,!0),document.removeEventListener("pointerlockchange",this._pointerLockChange,!0),document.removeEventListener("mozpointerlockchange",this._pointerLockChange,!0),document.removeEventListener("webkitpointerlockchange",this._pointerLockChange,!0)}},i.Mouse.prototype.constructor=i.Mouse,(t.prototype={}).constructor=t,t.prototype.bindEvent=function(e){if(!t._stubsGenerated&&e){for(var i in e)i in t.prototype||Object.defineProperty(t.prototype,i,{get:function(t){return function(){var e=this.originalEvent[t];return"function"!=typeof e?e:e.bind(this.originalEvent)}}(i)});t._stubsGenerated=!0}return this.originalEvent=e,this},Object.defineProperties(t.prototype,{type:{value:"wheel"},deltaMode:{get:function(){return this._deltaMode}},deltaY:{get:function(){return this._scaleFactor*(this.originalEvent.wheelDelta||this.originalEvent.detail)||0}},deltaX:{get:function(){return this._scaleFactor*this.originalEvent.wheelDeltaX||0}},deltaZ:{value:0}}),i.MSPointer=function(t){this.game=t,this.input=t.input,this.callbackContext=this.game,this.pointerDownCallback=null,this.pointerMoveCallback=null,this.pointerUpCallback=null,this.capture=!0,this.button=-1,this.event=null,this.enabled=!0,this._onMSPointerDown=null,this._onMSPointerMove=null,this._onMSPointerUp=null,this._onMSPointerUpGlobal=null,this._onMSPointerOut=null,this._onMSPointerOver=null},i.MSPointer.prototype={start:function(){if(null===this._onMSPointerDown){var t=this;if(this.game.device.mspointer){this._onMSPointerDown=function(e){return t.onPointerDown(e)},this._onMSPointerMove=function(e){return t.onPointerMove(e)},this._onMSPointerUp=function(e){return t.onPointerUp(e)},this._onMSPointerUpGlobal=function(e){return t.onPointerUpGlobal(e)},this._onMSPointerOut=function(e){return t.onPointerOut(e)},this._onMSPointerOver=function(e){return t.onPointerOver(e)};var e=this.game.canvas;e.addEventListener("MSPointerDown",this._onMSPointerDown,!1),e.addEventListener("MSPointerMove",this._onMSPointerMove,!1),e.addEventListener("MSPointerUp",this._onMSPointerUp,!1),e.addEventListener("pointerdown",this._onMSPointerDown,!1),e.addEventListener("pointermove",this._onMSPointerMove,!1),e.addEventListener("pointerup",this._onMSPointerUp,!1),e.style["-ms-content-zooming"]="none",e.style["-ms-touch-action"]="none",this.game.device.cocoonJS||(window.addEventListener("MSPointerUp",this._onMSPointerUpGlobal,!0),e.addEventListener("MSPointerOver",this._onMSPointerOver,!0),e.addEventListener("MSPointerOut",this._onMSPointerOut,!0),window.addEventListener("pointerup",this._onMSPointerUpGlobal,!0),e.addEventListener("pointerover",this._onMSPointerOver,!0),e.addEventListener("pointerout",this._onMSPointerOut,!0))}}},onPointerDown:function(t){this.game.input.executeTouchLockCallbacks(!1,t),this.event=t,this.capture&&t.preventDefault(),this.pointerDownCallback&&this.pointerDownCallback.call(this.callbackContext,t),this.input.enabled&&this.enabled&&(t.identifier=t.pointerId,"mouse"===t.pointerType||4===t.pointerType?this.input.mousePointer.start(t):this.input.startPointer(t))},onPointerMove:function(t){this.event=t,this.capture&&t.preventDefault(),this.pointerMoveCallback&&this.pointerMoveCallback.call(this.callbackContext,t),this.input.enabled&&this.enabled&&(t.identifier=t.pointerId,"mouse"===t.pointerType||4===t.pointerType?this.input.mousePointer.move(t):this.input.updatePointer(t))},onPointerUp:function(t){this.game.input.executeTouchLockCallbacks(!0,t),this.event=t,this.capture&&t.preventDefault(),this.pointerUpCallback&&this.pointerUpCallback.call(this.callbackContext,t),this.input.enabled&&this.enabled&&(t.identifier=t.pointerId,"mouse"===t.pointerType||4===t.pointerType?this.input.mousePointer.stop(t):this.input.stopPointer(t))},onPointerUpGlobal:function(t){if("mouse"!==t.pointerType&&4!==t.pointerType||this.input.mousePointer.withinGame){var e=this.input.getPointerFromIdentifier(t.identifier);e&&e.withinGame&&this.onPointerUp(t)}else this.onPointerUp(t)},onPointerOut:function(t){if(this.event=t,this.capture&&t.preventDefault(),"mouse"===t.pointerType||4===t.pointerType)this.input.mousePointer.withinGame=!1;else{var e=this.input.getPointerFromIdentifier(t.identifier);e&&(e.withinGame=!1)}this.input.mouse.mouseOutCallback&&this.input.mouse.mouseOutCallback.call(this.input.mouse.callbackContext,t),this.input.enabled&&this.enabled&&this.input.mouse.stopOnGameOut&&(t.identifier=0,e?e.stop(t):this.input.mousePointer.stop(t))},onPointerOver:function(t){if(this.event=t,this.capture&&t.preventDefault(),"mouse"===t.pointerType||4===t.pointerType)this.input.mousePointer.withinGame=!0;else{var e=this.input.getPointerFromIdentifier(t.identifier);e&&(e.withinGame=!0)}this.input.mouse.mouseOverCallback&&this.input.mouse.mouseOverCallback.call(this.input.mouse.callbackContext,t)},stop:function(){var t=this.game.canvas;t.removeEventListener("MSPointerDown",this._onMSPointerDown,!1),t.removeEventListener("MSPointerMove",this._onMSPointerMove,!1),t.removeEventListener("MSPointerUp",this._onMSPointerUp,!1),t.removeEventListener("pointerdown",this._onMSPointerDown,!1),t.removeEventListener("pointermove",this._onMSPointerMove,!1),t.removeEventListener("pointerup",this._onMSPointerUp,!1),window.removeEventListener("MSPointerUp",this._onMSPointerUpGlobal,!0),t.removeEventListener("MSPointerOver",this._onMSPointerOver,!0),t.removeEventListener("MSPointerOut",this._onMSPointerOut,!0),window.removeEventListener("pointerup",this._onMSPointerUpGlobal,!0),t.removeEventListener("pointerover",this._onMSPointerOver,!0),t.removeEventListener("pointerout",this._onMSPointerOut,!0)}},i.MSPointer.prototype.constructor=i.MSPointer,i.DeviceButton=function(t,e){this.parent=t,this.game=t.game,this.event=null,this.isDown=!1,this.isUp=!0,this.timeDown=0,this.timeUp=0,this.repeats=0,this.altKey=!1,this.shiftKey=!1,this.ctrlKey=!1,this.value=0,this.buttonCode=e,this.onDown=new i.Signal,this.onUp=new i.Signal,this.onFloat=new i.Signal},i.DeviceButton.prototype={start:function(t,e){this.isDown||(this.isDown=!0,this.isUp=!1,this.timeDown=this.game.time.time,this.repeats=0,this.event=t,this.value=e,t&&(this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.ctrlKey=t.ctrlKey),this.onDown.dispatch(this,e))},stop:function(t,e){this.isUp||(this.isDown=!1,this.isUp=!0,this.timeUp=this.game.time.time,this.event=t,this.value=e,t&&(this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.ctrlKey=t.ctrlKey),this.onUp.dispatch(this,e))},startStop:function(t,e,i){t?this.start(e,i):this.stop(e,i)},padFloat:function(t){this.isDown=!1,this.isUp=!1,this.value=t,this.onFloat.dispatch(this,t)},justPressed:function(t){return t=t||250,this.isDown&&this.timeDown+t>this.game.time.time},justReleased:function(t){return t=t||250,this.isUp&&this.timeUp+t>this.game.time.time},reset:function(){this.isDown=!1,this.isUp=!0,this.timeDown=this.game.time.time,this.repeats=0,this.altKey=!1,this.shiftKey=!1,this.ctrlKey=!1},destroy:function(){this.onDown.dispose(),this.onUp.dispose(),this.onFloat.dispose(),this.parent=null,this.game=null}},i.DeviceButton.prototype.constructor=i.DeviceButton,Object.defineProperty(i.DeviceButton.prototype,"duration",{get:function(){return this.isUp?-1:this.game.time.time-this.timeDown}}),i.Pointer=function(t,e,s){this.game=t,this.id=e,this.type=i.POINTER,this.exists=!0,this.identifier=0,this.pointerId=null,this.pointerMode=s||i.PointerMode.CURSOR|i.PointerMode.CONTACT,this.target=null,this.button=null,this.leftButton=new i.DeviceButton(this,i.Pointer.LEFT_BUTTON),this.middleButton=new i.DeviceButton(this,i.Pointer.MIDDLE_BUTTON),this.rightButton=new i.DeviceButton(this,i.Pointer.RIGHT_BUTTON),this.backButton=new i.DeviceButton(this,i.Pointer.BACK_BUTTON),this.forwardButton=new i.DeviceButton(this,i.Pointer.FORWARD_BUTTON),this.eraserButton=new i.DeviceButton(this,i.Pointer.ERASER_BUTTON),this._holdSent=!1,this._history=[],this._nextDrop=0,this._stateReset=!1,this.withinGame=!1,this.clientX=-1,this.clientY=-1,this.pageX=-1,this.pageY=-1,this.screenX=-1,this.screenY=-1,this.rawMovementX=0,this.rawMovementY=0,this.movementX=0,this.movementY=0,this.x=-1,this.y=-1,this.isMouse=0===e,this.isDown=!1,this.isUp=!0,this.timeDown=0,this.timeUp=0,this.previousTapTime=0,this.totalTouches=0,this.msSinceLastClick=Number.MAX_VALUE,this.targetObject=null,this.interactiveCandidates=[],this.active=!1,this.dirty=!1,this.position=new i.Point,this.positionDown=new i.Point,this.positionUp=new i.Point,this.circle=new i.Circle(0,0,44),this._clickTrampolines=null,this._trampolineTargetObject=null},i.Pointer.NO_BUTTON=0,i.Pointer.LEFT_BUTTON=1,i.Pointer.RIGHT_BUTTON=2,i.Pointer.MIDDLE_BUTTON=4,i.Pointer.BACK_BUTTON=8,i.Pointer.FORWARD_BUTTON=16,i.Pointer.ERASER_BUTTON=32,i.Pointer.prototype={resetButtons:function(){this.isDown=!1,this.isUp=!0,this.isMouse&&(this.leftButton.reset(),this.middleButton.reset(),this.rightButton.reset(),this.backButton.reset(),this.forwardButton.reset(),this.eraserButton.reset())},processButtonsDown:function(t,e){t===i.Mouse.LEFT_BUTTON&&this.leftButton.start(e),t===i.Mouse.RIGHT_BUTTON&&this.rightButton.start(e),t===i.Mouse.MIDDLE_BUTTON&&this.middleButton.start(e),t===i.Mouse.BACK_BUTTON&&this.backButton.start(e),t===i.Mouse.FORWARD_BUTTON&&this.forwardButton.start(e)},processButtonsUp:function(t,e){t===i.Mouse.LEFT_BUTTON&&this.leftButton.stop(e),t===i.Mouse.RIGHT_BUTTON&&this.rightButton.stop(e),t===i.Mouse.MIDDLE_BUTTON&&this.middleButton.stop(e),t===i.Mouse.BACK_BUTTON&&this.backButton.stop(e),t===i.Mouse.FORWARD_BUTTON&&this.forwardButton.stop(e)},processButtonsUpDown:function(t,e){var s="down"===e.type.toLowerCase().substr(-4),n="move"===e.type.toLowerCase().substr(-4);void 0!==t?(s&&1===t&&e.ctrlKey&&(t=2),this.leftButton.startStop(i.Pointer.LEFT_BUTTON&t,e),this.rightButton.startStop(i.Pointer.RIGHT_BUTTON&t,e),this.middleButton.startStop(i.Pointer.MIDDLE_BUTTON&t,e),this.backButton.startStop(i.Pointer.BACK_BUTTON&t,e),this.forwardButton.startStop(i.Pointer.FORWARD_BUTTON&t,e),this.eraserButton.startStop(i.Pointer.ERASER_BUTTON&t,e)):void 0!==e.button?s&&e.ctrlKey&&0===e.button?this.rightButton.start(e):s?this.processButtonsDown(e.button,e):n||this.processButtonsUp(e.button,e):s?e.ctrlKey?this.rightButton.start(e):this.leftButton.start(e):(this.leftButton.stop(e),this.rightButton.stop(e))},updateButtons:function(t){this.button=t.button,this.processButtonsUpDown(t.buttons,t),this.isUp=!0,this.isDown=!1,(this.leftButton.isDown||this.rightButton.isDown||this.middleButton.isDown||this.backButton.isDown||this.forwardButton.isDown||this.eraserButton.isDown)&&(this.isUp=!1,this.isDown=!0)},start:function(t){var e=this.game.input;return t.pointerId&&(this.pointerId=t.pointerId),this.identifier=t.identifier,this.target=t.target,this.isMouse?this.updateButtons(t):(this.isDown=!0,this.isUp=!1),this.active=!0,this.withinGame=!0,this.dirty=!1,this._history=[],this._clickTrampolines=null,this._trampolineTargetObject=null,this.msSinceLastClick=this.game.time.time-this.timeDown,this.timeDown=this.game.time.time,this._holdSent=!1,this.move(t,!0),this.positionDown.setTo(this.x,this.y),(e.multiInputOverride===i.Input.MOUSE_OVERRIDES_TOUCH||e.multiInputOverride===i.Input.MOUSE_TOUCH_COMBINE||e.multiInputOverride===i.Input.TOUCH_OVERRIDES_MOUSE&&0===e.totalActivePointers)&&(e.x=this.x,e.y=this.y,e.position.setTo(this.x,this.y),e.onDown.dispatch(this,t),e.resetSpeed(this.x,this.y)),this._stateReset=!1,this.totalTouches++,null!==this.targetObject&&this.targetObject._touchedHandler(this),this},update:function(){var t=this.game.input;this.active&&(this.dirty&&(t.interactiveItems.total>0&&this.processInteractiveObjects(!1),this.dirty=!1),!1===this._holdSent&&this.duration>=t.holdRate&&((t.multiInputOverride===i.Input.MOUSE_OVERRIDES_TOUCH||t.multiInputOverride===i.Input.MOUSE_TOUCH_COMBINE||t.multiInputOverride===i.Input.TOUCH_OVERRIDES_MOUSE&&0===t.totalActivePointers)&&t.onHold.dispatch(this),this._holdSent=!0),t.recordPointerHistory&&this.game.time.time>=this._nextDrop&&(this._nextDrop=this.game.time.time+t.recordRate,this._history.push({x:this.position.x,y:this.position.y}),this._history.length>t.recordLimit&&this._history.shift()))},move:function(t,e){var s=this.game.input;if(!s.pollLocked){void 0===e&&(e=!1),void 0!==t.button&&(this.button=t.button),this.isMouse&&this.updateButtons(t),this.clientX=t.clientX,this.clientY=t.clientY,this.pageX=t.pageX,this.pageY=t.pageY,this.screenX=t.screenX,this.screenY=t.screenY,this.isMouse&&s.mouse.locked&&!e&&(this.rawMovementX=t.movementX||t.mozMovementX||t.webkitMovementX||0,this.rawMovementY=t.movementY||t.mozMovementY||t.webkitMovementY||0,this.movementX+=this.rawMovementX,this.movementY+=this.rawMovementY),this.x=(this.pageX-this.game.scale.offset.x)*s.scale.x,this.y=(this.pageY-this.game.scale.offset.y)*s.scale.y,this.position.setTo(this.x,this.y),this.circle.x=this.x,this.circle.y=this.y,(s.multiInputOverride===i.Input.MOUSE_OVERRIDES_TOUCH||s.multiInputOverride===i.Input.MOUSE_TOUCH_COMBINE||s.multiInputOverride===i.Input.TOUCH_OVERRIDES_MOUSE&&0===s.totalActivePointers)&&(s.activePointer=this,s.x=this.x,s.y=this.y,s.position.setTo(s.x,s.y),s.circle.x=s.x,s.circle.y=s.y),this.withinGame=this.game.scale.bounds.contains(this.pageX,this.pageY);for(var n=s.moveCallbacks.length;n--;)s.moveCallbacks[n].callback.call(s.moveCallbacks[n].context,this,this.x,this.y,e);return null===this.targetObject||this.game.paused&&!this.targetObject.noPause||!0!==this.targetObject.isDragged?s.interactiveItems.total>0&&this.processInteractiveObjects(e):!1===this.targetObject.update(this)&&(this.targetObject=null),this}},processInteractiveObjects:function(t){var e=0,i=-1,s=null,n=this.game.input.interactiveItems.first;for(this.interactiveCandidates=[];n;)n.checked=!1,!n.validForInput(i,e,!1)||this.game.paused&&!n.sprite.noPause||(n.checked=!0,(t&&n.checkPointerDown(this,!0)||!t&&n.checkPointerOver(this,!0))&&(e=n.sprite.renderOrderID,i=n.priorityID,s=n,this.interactiveCandidates.push(n))),n=this.game.input.interactiveItems.next;for(n=this.game.input.interactiveItems.first;n;)!n.checked&&n.validForInput(i,e,!0)&&(t&&n.checkPointerDown(this,!1)||!t&&n.checkPointerOver(this,!1))&&(e=n.sprite.renderOrderID,i=n.priorityID,s=n,this.interactiveCandidates.push(n)),n=this.game.input.interactiveItems.next;return this.game.input.customCandidateHandler&&(s=this.game.input.customCandidateHandler.call(this.game.input.customCandidateHandlerContext,this,this.interactiveCandidates,s)),this.swapTarget(s,!1),null!==this.targetObject},swapTarget:function(t,e){void 0===e&&(e=!1),null===t?this.targetObject&&(this.targetObject._pointerOutHandler(this,e),this.targetObject=null):null===this.targetObject?(this.targetObject=t,t._pointerOverHandler(this,e)):this.targetObject===t?!1===t.update(this)&&(this.targetObject=null):(this.targetObject._pointerOutHandler(this,e),this.targetObject=t,this.targetObject._pointerOverHandler(this,e))},leave:function(t){this.withinGame=!1,this.move(t,!1)},stop:function(t){var e=this.game.input;{if(!this._stateReset||!this.withinGame)return this.timeUp=this.game.time.time,(e.multiInputOverride===i.Input.MOUSE_OVERRIDES_TOUCH||e.multiInputOverride===i.Input.MOUSE_TOUCH_COMBINE||e.multiInputOverride===i.Input.TOUCH_OVERRIDES_MOUSE&&0===e.totalActivePointers)&&(e.onUp.dispatch(this,t),this.duration>=0&&this.duration<=e.tapRate&&(this.timeUp-this.previousTapTime<e.doubleTapRate?e.onTap.dispatch(this,!0):e.onTap.dispatch(this,!1),this.previousTapTime=this.timeUp)),this.isMouse?this.updateButtons(t):(this.isDown=!1,this.isUp=!0),this.id>0&&(this.active=!1),this.withinGame=this.game.scale.bounds.contains(t.pageX,t.pageY),this.pointerId=null,this.identifier=null,this.positionUp.setTo(this.x,this.y),!1===this.isMouse&&e.currentPointers--,e.interactiveItems.callAll("_releasedHandler",this),this._clickTrampolines&&(this._trampolineTargetObject=this.targetObject),this.targetObject=null,this;t.preventDefault()}},justPressed:function(t){return t=t||this.game.input.justPressedRate,!0===this.isDown&&this.timeDown+t>this.game.time.time},justReleased:function(t){return t=t||this.game.input.justReleasedRate,this.isUp&&this.timeUp+t>this.game.time.time},addClickTrampoline:function(t,e,i,s){if(this.isDown){for(var n=this._clickTrampolines=this._clickTrampolines||[],r=0;r<n.length;r++)if(n[r].name===t){n.splice(r,1);break}n.push({name:t,targetObject:this.targetObject,callback:e,callbackContext:i,callbackArgs:s})}},processClickTrampolines:function(){var t=this._clickTrampolines;if(t){for(var e=0;e<t.length;e++){var i=t[e];i.targetObject===this._trampolineTargetObject&&i.callback.apply(i.callbackContext,i.callbackArgs)}this._clickTrampolines=null,this._trampolineTargetObject=null}},reset:function(){!1===this.isMouse&&(this.active=!1),this.pointerId=null,this.identifier=null,this.dirty=!1,this.totalTouches=0,this._holdSent=!1,this._history.length=0,this._stateReset=!0,this.resetButtons(),this.targetObject&&this.targetObject._releasedHandler(this),this.targetObject=null},resetMovement:function(){this.movementX=0,this.movementY=0}},i.Pointer.prototype.constructor=i.Pointer,Object.defineProperty(i.Pointer.prototype,"duration",{get:function(){return this.isUp?-1:this.game.time.time-this.timeDown}}),Object.defineProperty(i.Pointer.prototype,"worldX",{get:function(){return this.game.world.camera.x+this.x}}),Object.defineProperty(i.Pointer.prototype,"worldY",{get:function(){return this.game.world.camera.y+this.y}}),i.PointerMode={CURSOR:1,CONTACT:2},i.Touch=function(t){this.game=t,this.enabled=!0,this.callbackContext=this.game,this.touchStartCallback=null,this.touchMoveCallback=null,this.touchEndCallback=null,this.touchEnterCallback=null,this.touchLeaveCallback=null,this.touchCancelCallback=null,this.preventDefault=!0,this.event=null,this._onTouchStart=null,this._onTouchMove=null,this._onTouchEnd=null,this._onTouchEnter=null,this._onTouchLeave=null,this._onTouchCancel=null,this._onTouchMove=null},i.Touch.prototype={start:function(){if(null===this._onTouchStart){var t=this;this.game.device.touch&&(this._onTouchStart=function(e){return t.onTouchStart(e)},this._onTouchMove=function(e){return t.onTouchMove(e)},this._onTouchEnd=function(e){return t.onTouchEnd(e)},this._onTouchEnter=function(e){return t.onTouchEnter(e)},this._onTouchLeave=function(e){return t.onTouchLeave(e)},this._onTouchCancel=function(e){return t.onTouchCancel(e)},this.game.canvas.addEventListener("touchstart",this._onTouchStart,!1),this.game.canvas.addEventListener("touchmove",this._onTouchMove,!1),this.game.canvas.addEventListener("touchend",this._onTouchEnd,!1),this.game.canvas.addEventListener("touchcancel",this._onTouchCancel,!1),this.game.device.cocoonJS||(this.game.canvas.addEventListener("touchenter",this._onTouchEnter,!1),this.game.canvas.addEventListener("touchleave",this._onTouchLeave,!1)))}},consumeDocumentTouches:function(){this._documentTouchMove=function(t){t.preventDefault()},document.addEventListener("touchmove",this._documentTouchMove,!1)},onTouchStart:function(t){if(this.game.input.executeTouchLockCallbacks(!1,t),this.event=t,this.game.input.enabled&&this.enabled){this.touchStartCallback&&this.touchStartCallback.call(this.callbackContext,t),this.preventDefault&&t.preventDefault();for(var e=0;e<t.changedTouches.length;e++)this.game.input.startPointer(t.changedTouches[e])}},onTouchCancel:function(t){if(this.event=t,this.touchCancelCallback&&this.touchCancelCallback.call(this.callbackContext,t),this.game.input.enabled&&this.enabled){this.preventDefault&&t.preventDefault();for(var e=0;e<t.changedTouches.length;e++)this.game.input.stopPointer(t.changedTouches[e])}},onTouchEnter:function(t){this.event=t,this.touchEnterCallback&&this.touchEnterCallback.call(this.callbackContext,t),this.game.input.enabled&&this.enabled&&this.preventDefault&&t.preventDefault()},onTouchLeave:function(t){this.event=t,this.touchLeaveCallback&&this.touchLeaveCallback.call(this.callbackContext,t),this.preventDefault&&t.preventDefault()},onTouchMove:function(t){this.event=t,this.touchMoveCallback&&this.touchMoveCallback.call(this.callbackContext,t),this.preventDefault&&t.preventDefault();for(var e=0;e<t.changedTouches.length;e++)this.game.input.updatePointer(t.changedTouches[e])},onTouchEnd:function(t){this.game.input.executeTouchLockCallbacks(!0,t),this.event=t,this.touchEndCallback&&this.touchEndCallback.call(this.callbackContext,t),this.preventDefault&&t.preventDefault();for(var e=0;e<t.changedTouches.length;e++)this.game.input.stopPointer(t.changedTouches[e])},stop:function(){this.game.device.touch&&(this.game.canvas.removeEventListener("touchstart",this._onTouchStart),this.game.canvas.removeEventListener("touchmove",this._onTouchMove),this.game.canvas.removeEventListener("touchend",this._onTouchEnd),this.game.canvas.removeEventListener("touchenter",this._onTouchEnter),this.game.canvas.removeEventListener("touchleave",this._onTouchLeave),this.game.canvas.removeEventListener("touchcancel",this._onTouchCancel))}},i.Touch.prototype.constructor=i.Touch,i.InputHandler=function(t){this.sprite=t,this.game=t.game,this.enabled=!1,this.checked=!1,this.priorityID=0,this.useHandCursor=!1,this._setHandCursor=!1,this.isDragged=!1,this.allowHorizontalDrag=!0,this.allowVerticalDrag=!0,this.bringToTop=!1,this.snapOffset=null,this.snapOnDrag=!1,this.snapOnRelease=!1,this.snapX=0,this.snapY=0,this.snapOffsetX=0,this.snapOffsetY=0,this.pixelPerfectOver=!1,this.pixelPerfectClick=!1,this.pixelPerfectAlpha=255,this.draggable=!1,this.boundsRect=null,this.boundsSprite=null,this.scaleLayer=!1,this.dragOffset=new i.Point,this.dragFromCenter=!1,this.dragStopBlocksInputUp=!1,this.dragStartPoint=new i.Point,this.dragDistanceThreshold=0,this.dragTimeThreshold=0,this.downPoint=new i.Point,this.snapPoint=new i.Point,this._dragPoint=new i.Point,this._dragPhase=!1,this._pendingDrag=!1,this._dragTimePass=!1,this._dragDistancePass=!1,this._wasEnabled=!1,this._tempPoint=new i.Point,this._pointerData=[],this._pointerData.push({id:0,x:0,y:0,camX:0,camY:0,isDown:!1,isUp:!1,isOver:!1,isOut:!1,timeOver:0,timeOut:0,timeDown:0,timeUp:0,downDuration:0,isDragged:!1})},i.InputHandler.prototype={start:function(t,e){if(t=t||0,void 0===e&&(e=!1),!1===this.enabled){this.game.input.interactiveItems.add(this),this.useHandCursor=e,this.priorityID=t;for(var s=0;s<10;s++)this._pointerData[s]={id:s,x:0,y:0,isDown:!1,isUp:!1,isOver:!1,isOut:!1,timeOver:0,timeOut:0,timeDown:0,timeUp:0,downDuration:0,isDragged:!1};this.snapOffset=new i.Point,this.enabled=!0,this._wasEnabled=!0}return this.sprite.events.onAddedToGroup.add(this.addedToGroup,this),this.sprite.events.onRemovedFromGroup.add(this.removedFromGroup,this),this.sprite},addedToGroup:function(){this._dragPhase||this._wasEnabled&&!this.enabled&&this.start()},removedFromGroup:function(){this._dragPhase||(this.enabled?(this._wasEnabled=!0,this.stop()):this._wasEnabled=!1)},reset:function(){this.enabled=!1;for(var t=0;t<10;t++)this._pointerData[t]={id:t,x:0,y:0,isDown:!1,isUp:!1,isOver:!1,isOut:!1,timeOver:0,timeOut:0,timeDown:0,timeUp:0,downDuration:0,isDragged:!1}},stop:function(){!1!==this.enabled&&(this.enabled=!1,this.game.input.interactiveItems.remove(this))},destroy:function(){this.sprite&&(this._setHandCursor&&(this.game.canvas.style.cursor="",this._setHandCursor=!1),this.enabled=!1,this.game.input.interactiveItems.remove(this),this._pointerData.length=0,this.boundsRect=null,this.boundsSprite=null,this.sprite=null)},validForInput:function(t,e,i){return void 0===i&&(i=!0),!(!this.enabled||0===this.sprite.scale.x||0===this.sprite.scale.y||this.priorityID<this.game.input.minPriorityID||this.sprite.parent&&this.sprite.parent.ignoreChildInput)&&(!(!i&&(this.pixelPerfectClick||this.pixelPerfectOver))&&(this.priorityID>t||this.priorityID===t&&this.sprite.renderOrderID>e))},isPixelPerfect:function(){return this.pixelPerfectClick||this.pixelPerfectOver},pointerX:function(t){return t=t||0,this._pointerData[t].x},pointerY:function(t){return t=t||0,this._pointerData[t].y},pointerDown:function(t){return t=t||0,this._pointerData[t].isDown},pointerUp:function(t){return t=t||0,this._pointerData[t].isUp},pointerTimeDown:function(t){return t=t||0,this._pointerData[t].timeDown},pointerTimeUp:function(t){return t=t||0,this._pointerData[t].timeUp},pointerOver:function(t){if(!this.enabled)return!1;if(void 0===t){for(var e=0;e<10;e++)if(this._pointerData[e].isOver)return!0;return!1}return this._pointerData[t].isOver},pointerOut:function(t){if(!this.enabled)return!1;if(void 0!==t)return this._pointerData[t].isOut;for(var e=0;e<10;e++)if(this._pointerData[e].isOut)return!0},pointerTimeOver:function(t){return t=t||0,this._pointerData[t].timeOver},pointerTimeOut:function(t){return t=t||0,this._pointerData[t].timeOut},pointerDragged:function(t){return t=t||0,this._pointerData[t].isDragged},checkPointerDown:function(t,e){return!!(t.isDown&&this.enabled&&this.sprite&&this.sprite.parent&&this.sprite.visible&&this.sprite.parent.visible&&0!==this.sprite.worldScale.x&&0!==this.sprite.worldScale.y)&&(!!this.game.input.hitTest(this.sprite,t,this._tempPoint)&&(void 0===e&&(e=!1),!(!e&&this.pixelPerfectClick)||this.checkPixel(this._tempPoint.x,this._tempPoint.y)))},checkPointerOver:function(t,e){return!!(this.enabled&&this.sprite&&this.sprite.parent&&this.sprite.visible&&this.sprite.parent.visible&&0!==this.sprite.worldScale.x&&0!==this.sprite.worldScale.y)&&(!!this.game.input.hitTest(this.sprite,t,this._tempPoint)&&(void 0===e&&(e=!1),!(!e&&this.pixelPerfectOver)||this.checkPixel(this._tempPoint.x,this._tempPoint.y)))},checkPixel:function(t,e,i){if(this.sprite.texture.baseTexture.source){if(null===t&&null===e){this.game.input.getLocalPosition(this.sprite,i,this._tempPoint);var t=this._tempPoint.x,e=this._tempPoint.y}if(0!==this.sprite.anchor.x&&(t-=-this.sprite.texture.frame.width*this.sprite.anchor.x),0!==this.sprite.anchor.y&&(e-=-this.sprite.texture.frame.height*this.sprite.anchor.y),t+=this.sprite.texture.frame.x,e+=this.sprite.texture.frame.y,this.sprite.texture.trim&&(t-=this.sprite.texture.trim.x,e-=this.sprite.texture.trim.y,t<this.sprite.texture.crop.x||t>this.sprite.texture.crop.right||e<this.sprite.texture.crop.y||e>this.sprite.texture.crop.bottom))return this._dx=t,this._dy=e,!1;if(this._dx=t,this._dy=e,this.game.input.hitContext.clearRect(0,0,1,1),this.game.input.hitContext.drawImage(this.sprite.texture.baseTexture.source,t,e,1,1,0,0,1,1),this.game.input.hitContext.getImageData(0,0,1,1).data[3]>=this.pixelPerfectAlpha)return!0}return!1},update:function(t){if(null!==this.sprite&&void 0!==this.sprite.parent)return this.enabled&&this.sprite.visible&&this.sprite.parent.visible?this._pendingDrag?(this._dragDistancePass||(this._dragDistancePass=i.Math.distance(t.x,t.y,this.downPoint.x,this.downPoint.y)>=this.dragDistanceThreshold),this._dragDistancePass&&this._dragTimePass&&this.startDrag(t),!0):this.draggable&&this._draggedPointerID===t.id?this.updateDrag(t,!1):this._pointerData[t.id].isOver?this.checkPointerOver(t)?(this._pointerData[t.id].x=t.x-this.sprite.x,this._pointerData[t.id].y=t.y-this.sprite.y,!0):(this._pointerOutHandler(t),!1):void 0:(this._pointerOutHandler(t),!1)},_pointerOverHandler:function(t,e){if(null!==this.sprite){var i=this._pointerData[t.id];if(!1===i.isOver||t.dirty){var s=!1===i.isOver;i.isOver=!0,i.isOut=!1,i.timeOver=this.game.time.time,i.x=t.x-this.sprite.x,i.y=t.y-this.sprite.y,this.useHandCursor&&!1===i.isDragged&&(this.game.canvas.style.cursor="pointer",this._setHandCursor=!0),!e&&s&&this.sprite&&this.sprite.events&&this.sprite.events.onInputOver$dispatch(this.sprite,t),this.sprite.parent&&this.sprite.parent.onChildInputOver&&this.sprite.parent.onChildInputOver.dispatch(this.sprite,t)}}},_pointerOutHandler:function(t,e){if(null!==this.sprite){var i=this._pointerData[t.id];i.isOver=!1,i.isOut=!0,i.timeOut=this.game.time.time,this.useHandCursor&&!1===i.isDragged&&(this.game.canvas.style.cursor="",this._setHandCursor=!1),!e&&this.sprite&&this.sprite.events&&(this.sprite.events.onInputOut$dispatch(this.sprite,t),this.sprite&&this.sprite.parent&&this.sprite.parent.onChildInputOut&&this.sprite.parent.onChildInputOut.dispatch(this.sprite,t))}},_touchedHandler:function(t){if(null!==this.sprite){var e=this._pointerData[t.id];if(!e.isDown&&e.isOver){if(this.pixelPerfectClick&&!this.checkPixel(null,null,t))return;if(e.isDown=!0,e.isUp=!1,e.timeDown=this.game.time.time,this.downPoint.set(t.x,t.y),t.dirty=!0,this.sprite&&this.sprite.events&&(this.sprite.events.onInputDown$dispatch(this.sprite,t),this.sprite&&this.sprite.parent&&this.sprite.parent.onChildInputDown&&this.sprite.parent.onChildInputDown.dispatch(this.sprite,t),null===this.sprite))return;this.draggable&&!1===this.isDragged&&(0===this.dragTimeThreshold&&0===this.dragDistanceThreshold?this.startDrag(t):(this._pendingDrag=!0,this._dragDistancePass=0===this.dragDistanceThreshold,this.dragTimeThreshold>0?(this._dragTimePass=!1,this.game.time.events.add(this.dragTimeThreshold,this.dragTimeElapsed,this,t)):this._dragTimePass=!0)),this.bringToTop&&this.sprite.bringToTop()}}},dragTimeElapsed:function(t){this._dragTimePass=!0,this._pendingDrag&&this.sprite&&this._dragDistancePass&&this.startDrag(t)},_releasedHandler:function(t){if(null!==this.sprite){var e=this._pointerData[t.id];if(e.isDown&&t.isUp){e.isDown=!1,e.isUp=!0,e.timeUp=this.game.time.time,e.downDuration=e.timeUp-e.timeDown;var i=this.checkPointerOver(t);this.sprite&&this.sprite.events&&(this.dragStopBlocksInputUp&&(!this.dragStopBlocksInputUp||this.draggable&&this.isDragged&&this._draggedPointerID===t.id)||this.sprite.events.onInputUp$dispatch(this.sprite,t,i),this.sprite&&this.sprite.parent&&this.sprite.parent.onChildInputUp&&this.sprite.parent.onChildInputUp.dispatch(this.sprite,t,i),i&&(i=this.checkPointerOver(t))),e.isOver=i,!i&&this.useHandCursor&&(this.game.canvas.style.cursor="default",this._setHandCursor=!1),t.dirty=!0,this._pendingDrag=!1,this.draggable&&this.isDragged&&this._draggedPointerID===t.id&&this.stopDrag(t)}}},updateDrag:function(t,e){if(void 0===e&&(e=!1),t.isUp)return this.stopDrag(t),!1;var i=this.globalToLocal(t);if(this.sprite.fixedToCamera)var s=this.game.camera.scale.x*i.x+this._dragPoint.x+this.dragOffset.x,n=this.game.camera.scale.y*i.y+this._dragPoint.y+this.dragOffset.y;else var s=i.x+this._dragPoint.x+this.dragOffset.x,n=i.y+this._dragPoint.y+this.dragOffset.y;if(this.sprite.fixedToCamera)this.allowHorizontalDrag&&(this.sprite.cameraOffset.x=s-this.game.camera.x),this.allowVerticalDrag&&(this.sprite.cameraOffset.y=n-this.game.camera.y),this.boundsRect&&this.checkBoundsRect(),this.boundsSprite&&this.checkBoundsSprite(),this.snapOnDrag&&(this.sprite.cameraOffset.x=Math.round((this.sprite.cameraOffset.x-this.snapOffsetX%this.snapX)/this.snapX)*this.snapX+this.snapOffsetX%this.snapX,this.sprite.cameraOffset.y=Math.round((this.sprite.cameraOffset.y-this.snapOffsetY%this.snapY)/this.snapY)*this.snapY+this.snapOffsetY%this.snapY,this.snapPoint.set(this.sprite.cameraOffset.x,this.sprite.cameraOffset.y));else{var r=this.game.camera.x-this._pointerData[t.id].camX,o=this.game.camera.y-this._pointerData[t.id].camY;this.allowHorizontalDrag&&(this.sprite.x=s+r),this.allowVerticalDrag&&(this.sprite.y=n+o),this.boundsRect&&this.checkBoundsRect(),this.boundsSprite&&this.checkBoundsSprite(),this.snapOnDrag&&(this.sprite.x=Math.round((this.sprite.x-this.snapOffsetX%this.snapX)/this.snapX)*this.snapX+this.snapOffsetX%this.snapX,this.sprite.y=Math.round((this.sprite.y-this.snapOffsetY%this.snapY)/this.snapY)*this.snapY+this.snapOffsetY%this.snapY,this.snapPoint.set(this.sprite.x,this.sprite.y))}return this.sprite.events.onDragUpdate.dispatch(this.sprite,t,s,n,this.snapPoint,e),!0},justOver:function(t,e){return t=t||0,e=e||500,this._pointerData[t].isOver&&this.overDuration(t)<e},justOut:function(t,e){return t=t||0,e=e||500,this._pointerData[t].isOut&&this.game.time.time-this._pointerData[t].timeOut<e},justPressed:function(t,e){return t=t||0,e=e||500,this._pointerData[t].isDown&&this.downDuration(t)<e},justReleased:function(t,e){return t=t||0,e=e||500,this._pointerData[t].isUp&&this.game.time.time-this._pointerData[t].timeUp<e},overDuration:function(t){return t=t||0,this._pointerData[t].isOver?this.game.time.time-this._pointerData[t].timeOver:-1},downDuration:function(t){return t=t||0,this._pointerData[t].isDown?this.game.time.time-this._pointerData[t].timeDown:-1},enableDrag:function(t,e,s,n,r,o){void 0===t&&(t=!1),void 0===e&&(e=!1),void 0===s&&(s=!1),void 0===n&&(n=255),void 0===r&&(r=null),void 0===o&&(o=null),this._dragPoint=new i.Point,this.draggable=!0,this.bringToTop=e,this.dragOffset=new i.Point,this.dragFromCenter=t,this.pixelPerfectClick=s,this.pixelPerfectAlpha=n,r&&(this.boundsRect=r),o&&(this.boundsSprite=o)},disableDrag:function(){if(this._pointerData)for(var t=0;t<10;t++)this._pointerData[t].isDragged=!1;this.draggable=!1,this.isDragged=!1,this._draggedPointerID=-1,this._pendingDrag=!1},startDrag:function(t){var e=this.sprite.x,s=this.sprite.y,n=this.globalToLocal(t);if(this.isDragged=!0,this._draggedPointerID=t.id,this._pointerData[t.id].camX=this.game.camera.x,this._pointerData[t.id].camY=this.game.camera.y,this._pointerData[t.id].isDragged=!0,this.sprite.fixedToCamera){if(this.dragFromCenter){var r=this.sprite.getBounds(),o=this.globalToLocal(new i.Point(r.centerX,r.centerY));this.sprite.cameraOffset.x=n.x+(this.sprite.cameraOffset.x-o.x),this.sprite.cameraOffset.y=n.y+(this.sprite.cameraOffset.y-o.y)}this._dragPoint.setTo(this.sprite.cameraOffset.x-t.x,this.sprite.cameraOffset.y-t.y)}else{if(this.dragFromCenter){var r=this.sprite.getBounds(),o=this.globalToLocal(new i.Point(r.centerX,r.centerY));this.sprite.x=n.x+(this.sprite.x-o.x),this.sprite.y=n.y+(this.sprite.y-o.y)}this._dragPoint.setTo(this.sprite.x-n.x,this.sprite.y-n.y)}this.updateDrag(t,!0),this.bringToTop&&(this._dragPhase=!0,this.sprite.bringToTop()),this.dragStartPoint.set(e,s),this.sprite.events.onDragStart$dispatch(this.sprite,t,e,s),this._pendingDrag=!1},globalToLocalX:function(t){return this.scaleLayer&&(t-=this.game.scale.grid.boundsFluid.x,t*=this.game.scale.grid.scaleFluidInversed.x),t},globalToLocalY:function(t){return this.scaleLayer&&(t-=this.game.scale.grid.boundsFluid.y,t*=this.game.scale.grid.scaleFluidInversed.y),t},globalToLocal:function(t){return this.sprite.parent?this.game.input.getLocalPosition(this.sprite.parent,{x:t.x,y:t.y}):t},stopDrag:function(t){this.isDragged=!1,this._draggedPointerID=-1,this._pointerData[t.id].isDragged=!1,this._dragPhase=!1,this._pendingDrag=!1,this.snapOnRelease&&(this.sprite.fixedToCamera?(this.sprite.cameraOffset.x=Math.round((this.sprite.cameraOffset.x-this.snapOffsetX%this.snapX)/this.snapX)*this.snapX+this.snapOffsetX%this.snapX,this.sprite.cameraOffset.y=Math.round((this.sprite.cameraOffset.y-this.snapOffsetY%this.snapY)/this.snapY)*this.snapY+this.snapOffsetY%this.snapY):(this.sprite.x=Math.round((this.sprite.x-this.snapOffsetX%this.snapX)/this.snapX)*this.snapX+this.snapOffsetX%this.snapX,this.sprite.y=Math.round((this.sprite.y-this.snapOffsetY%this.snapY)/this.snapY)*this.snapY+this.snapOffsetY%this.snapY)),this.sprite.events.onDragStop$dispatch(this.sprite,t),!1===this.checkPointerOver(t)&&this._pointerOutHandler(t)},setDragLock:function(t,e){void 0===t&&(t=!0),void 0===e&&(e=!0),this.allowHorizontalDrag=t,this.allowVerticalDrag=e},enableSnap:function(t,e,i,s,n,r){void 0===i&&(i=!0),void 0===s&&(s=!1),void 0===n&&(n=0),void 0===r&&(r=0),this.snapX=t,this.snapY=e,this.snapOffsetX=n,this.snapOffsetY=r,this.snapOnDrag=i,this.snapOnRelease=s},disableSnap:function(){this.snapOnDrag=!1,this.snapOnRelease=!1},checkBoundsRect:function(){this.sprite.fixedToCamera?(this.sprite.cameraOffset.x<this.boundsRect.left?this.sprite.cameraOffset.x=this.boundsRect.left:this.sprite.cameraOffset.x+this.sprite.width>this.boundsRect.right&&(this.sprite.cameraOffset.x=this.boundsRect.right-this.sprite.width),this.sprite.cameraOffset.y<this.boundsRect.top?this.sprite.cameraOffset.y=this.boundsRect.top:this.sprite.cameraOffset.y+this.sprite.height>this.boundsRect.bottom&&(this.sprite.cameraOffset.y=this.boundsRect.bottom-this.sprite.height)):(this.sprite.left<this.boundsRect.left?this.sprite.x=this.boundsRect.x+this.sprite.offsetX:this.sprite.right>this.boundsRect.right&&(this.sprite.x=this.boundsRect.right-(this.sprite.width-this.sprite.offsetX)),this.sprite.top<this.boundsRect.top?this.sprite.y=this.boundsRect.top+this.sprite.offsetY:this.sprite.bottom>this.boundsRect.bottom&&(this.sprite.y=this.boundsRect.bottom-(this.sprite.height-this.sprite.offsetY)))},checkBoundsSprite:function(){this.sprite.fixedToCamera&&this.boundsSprite.fixedToCamera?(this.sprite.cameraOffset.x<this.boundsSprite.cameraOffset.x?this.sprite.cameraOffset.x=this.boundsSprite.cameraOffset.x:this.sprite.cameraOffset.x+this.sprite.width>this.boundsSprite.cameraOffset.x+this.boundsSprite.width&&(this.sprite.cameraOffset.x=this.boundsSprite.cameraOffset.x+this.boundsSprite.width-this.sprite.width),this.sprite.cameraOffset.y<this.boundsSprite.cameraOffset.y?this.sprite.cameraOffset.y=this.boundsSprite.cameraOffset.y:this.sprite.cameraOffset.y+this.sprite.height>this.boundsSprite.cameraOffset.y+this.boundsSprite.height&&(this.sprite.cameraOffset.y=this.boundsSprite.cameraOffset.y+this.boundsSprite.height-this.sprite.height)):(this.sprite.left<this.boundsSprite.left?this.sprite.x=this.boundsSprite.left+this.sprite.offsetX:this.sprite.right>this.boundsSprite.right&&(this.sprite.x=this.boundsSprite.right-(this.sprite.width-this.sprite.offsetX)),this.sprite.top<this.boundsSprite.top?this.sprite.y=this.boundsSprite.top+this.sprite.offsetY:this.sprite.bottom>this.boundsSprite.bottom&&(this.sprite.y=this.boundsSprite.bottom-(this.sprite.height-this.sprite.offsetY)))}},i.InputHandler.prototype.constructor=i.InputHandler,i.Gamepad=function(t){this.game=t,this._gamepadIndexMap={},this._rawPads=[],this._active=!1,this.enabled=!0,this._gamepadSupportAvailable=!!navigator.webkitGetGamepads||!!navigator.webkitGamepads||-1!==navigator.userAgent.indexOf("Firefox/")||!!navigator.getGamepads,this._prevRawGamepadTypes=[],this._prevTimestamps=[],this.callbackContext=this,this.onConnectCallback=null,this.onDisconnectCallback=null,this.onDownCallback=null,this.onUpCallback=null,this.onAxisCallback=null,this.onFloatCallback=null,this._ongamepadconnected=null,this._gamepaddisconnected=null,this._gamepads=[new i.SinglePad(t,this),new i.SinglePad(t,this),new i.SinglePad(t,this),new i.SinglePad(t,this)]},i.Gamepad.prototype={addCallbacks:function(t,e){void 0!==e&&(this.onConnectCallback="function"==typeof e.onConnect?e.onConnect:this.onConnectCallback,this.onDisconnectCallback="function"==typeof e.onDisconnect?e.onDisconnect:this.onDisconnectCallback,this.onDownCallback="function"==typeof e.onDown?e.onDown:this.onDownCallback,this.onUpCallback="function"==typeof e.onUp?e.onUp:this.onUpCallback,this.onAxisCallback="function"==typeof e.onAxis?e.onAxis:this.onAxisCallback,this.onFloatCallback="function"==typeof e.onFloat?e.onFloat:this.onFloatCallback,this.callbackContext=t)},start:function(){if(!this._active){this._active=!0;var t=this;this._onGamepadConnected=function(e){return t.onGamepadConnected(e)},this._onGamepadDisconnected=function(e){return t.onGamepadDisconnected(e)},window.addEventListener("gamepadconnected",this._onGamepadConnected,!1),window.addEventListener("gamepaddisconnected",this._onGamepadDisconnected,!1)}},onGamepadConnected:function(t){var e=t.gamepad;this._rawPads.push(e),this._gamepads[e.index].connect(e)},onGamepadDisconnected:function(t){var e=t.gamepad;for(var i in this._rawPads)this._rawPads[i].index===e.index&&this._rawPads.splice(i,1);this._gamepads[e.index].disconnect()},update:function(){this._pollGamepads(),this.pad1.pollStatus(),this.pad2.pollStatus(),this.pad3.pollStatus(),this.pad4.pollStatus()},_pollGamepads:function(){if(this._active){if(navigator.getGamepads)t=navigator.getGamepads();else if(navigator.webkitGetGamepads)t=navigator.webkitGetGamepads();else if(navigator.webkitGamepads)var t=navigator.webkitGamepads();if(t){this._rawPads=[];for(var e=!1,i=0;i<t.length&&(typeof t[i]!==this._prevRawGamepadTypes[i]&&(e=!0,this._prevRawGamepadTypes[i]=typeof t[i]),t[i]&&this._rawPads.push(t[i]),3!==i);i++);for(var s=0;s<this._gamepads.length;s++)this._gamepads[s]._rawPad=this._rawPads[s];if(e){for(var n,r={rawIndices:{},padIndices:{}},o=0;o<this._gamepads.length;o++)if((n=this._gamepads[o]).connected)for(var a=0;a<this._rawPads.length;a++)this._rawPads[a].index===n.index&&(r.rawIndices[n.index]=!0,r.padIndices[o]=!0);for(var h=0;h<this._gamepads.length;h++)if(n=this._gamepads[h],!r.padIndices[h]){this._rawPads.length<1&&n.disconnect();for(var u=0;u<this._rawPads.length&&!r.padIndices[h];u++){var l=this._rawPads[u];if(l){if(r.rawIndices[l.index]){n.disconnect();continue}n.connect(l),r.rawIndices[l.index]=!0,r.padIndices[h]=!0}else n.disconnect()}}}}}},setDeadZones:function(t){for(var e=0;e<this._gamepads.length;e++)this._gamepads[e].deadZone=t},stop:function(){this._active=!1,window.removeEventListener("gamepadconnected",this._onGamepadConnected),window.removeEventListener("gamepaddisconnected",this._onGamepadDisconnected)},reset:function(){this.update();for(var t=0;t<this._gamepads.length;t++)this._gamepads[t].reset()},justPressed:function(t,e){for(var i=0;i<this._gamepads.length;i++)if(!0===this._gamepads[i].justPressed(t,e))return!0;return!1},justReleased:function(t,e){for(var i=0;i<this._gamepads.length;i++)if(!0===this._gamepads[i].justReleased(t,e))return!0;return!1},isDown:function(t){for(var e=0;e<this._gamepads.length;e++)if(!0===this._gamepads[e].isDown(t))return!0;return!1},destroy:function(){this.stop();for(var t=0;t<this._gamepads.length;t++)this._gamepads[t].destroy()}},i.Gamepad.prototype.constructor=i.Gamepad,Object.defineProperty(i.Gamepad.prototype,"active",{get:function(){return this._active}}),Object.defineProperty(i.Gamepad.prototype,"supported",{get:function(){return this._gamepadSupportAvailable}}),Object.defineProperty(i.Gamepad.prototype,"padsConnected",{get:function(){return this._rawPads.length}}),Object.defineProperty(i.Gamepad.prototype,"pad1",{get:function(){return this._gamepads[0]}}),Object.defineProperty(i.Gamepad.prototype,"pad2",{get:function(){return this._gamepads[1]}}),Object.defineProperty(i.Gamepad.prototype,"pad3",{get:function(){return this._gamepads[2]}}),Object.defineProperty(i.Gamepad.prototype,"pad4",{get:function(){return this._gamepads[3]}}),i.Gamepad.BUTTON_0=0,i.Gamepad.BUTTON_1=1,i.Gamepad.BUTTON_2=2,i.Gamepad.BUTTON_3=3,i.Gamepad.BUTTON_4=4,i.Gamepad.BUTTON_5=5,i.Gamepad.BUTTON_6=6,i.Gamepad.BUTTON_7=7,i.Gamepad.BUTTON_8=8,i.Gamepad.BUTTON_9=9,i.Gamepad.BUTTON_10=10,i.Gamepad.BUTTON_11=11,i.Gamepad.BUTTON_12=12,i.Gamepad.BUTTON_13=13,i.Gamepad.BUTTON_14=14,i.Gamepad.BUTTON_15=15,i.Gamepad.AXIS_0=0,i.Gamepad.AXIS_1=1,i.Gamepad.AXIS_2=2,i.Gamepad.AXIS_3=3,i.Gamepad.AXIS_4=4,i.Gamepad.AXIS_5=5,i.Gamepad.AXIS_6=6,i.Gamepad.AXIS_7=7,i.Gamepad.AXIS_8=8,i.Gamepad.AXIS_9=9,i.Gamepad.XBOX360_A=0,i.Gamepad.XBOX360_B=1,i.Gamepad.XBOX360_X=2,i.Gamepad.XBOX360_Y=3,i.Gamepad.XBOX360_LEFT_BUMPER=4,i.Gamepad.XBOX360_RIGHT_BUMPER=5,i.Gamepad.XBOX360_LEFT_TRIGGER=6,i.Gamepad.XBOX360_RIGHT_TRIGGER=7,i.Gamepad.XBOX360_BACK=8,i.Gamepad.XBOX360_START=9,i.Gamepad.XBOX360_STICK_LEFT_BUTTON=10,i.Gamepad.XBOX360_STICK_RIGHT_BUTTON=11,i.Gamepad.XBOX360_DPAD_LEFT=14,i.Gamepad.XBOX360_DPAD_RIGHT=15,i.Gamepad.XBOX360_DPAD_UP=12,i.Gamepad.XBOX360_DPAD_DOWN=13,i.Gamepad.XBOX360_STICK_LEFT_X=0,i.Gamepad.XBOX360_STICK_LEFT_Y=1,i.Gamepad.XBOX360_STICK_RIGHT_X=2,i.Gamepad.XBOX360_STICK_RIGHT_Y=3,i.Gamepad.PS3XC_X=0,i.Gamepad.PS3XC_CIRCLE=1,i.Gamepad.PS3XC_SQUARE=2,i.Gamepad.PS3XC_TRIANGLE=3,i.Gamepad.PS3XC_L1=4,i.Gamepad.PS3XC_R1=5,i.Gamepad.PS3XC_L2=6,i.Gamepad.PS3XC_R2=7,i.Gamepad.PS3XC_SELECT=8,i.Gamepad.PS3XC_START=9,i.Gamepad.PS3XC_STICK_LEFT_BUTTON=10,i.Gamepad.PS3XC_STICK_RIGHT_BUTTON=11,i.Gamepad.PS3XC_DPAD_UP=12,i.Gamepad.PS3XC_DPAD_DOWN=13,i.Gamepad.PS3XC_DPAD_LEFT=14,i.Gamepad.PS3XC_DPAD_RIGHT=15,i.Gamepad.PS3XC_STICK_LEFT_X=0,i.Gamepad.PS3XC_STICK_LEFT_Y=1,i.Gamepad.PS3XC_STICK_RIGHT_X=2,i.Gamepad.PS3XC_STICK_RIGHT_Y=3,i.SinglePad=function(t,e){this.game=t,this.index=null,this.connected=!1,this.callbackContext=this,this.onConnectCallback=null,this.onDisconnectCallback=null,this.onDownCallback=null,this.onUpCallback=null,this.onAxisCallback=null,this.onFloatCallback=null,this.deadZone=.26,this._padParent=e,this._rawPad=null,this._prevTimestamp=null,this._buttons=[],this._buttonsLen=0,this._axes=[],this._axesLen=0},i.SinglePad.prototype={addCallbacks:function(t,e){void 0!==e&&(this.onConnectCallback="function"==typeof e.onConnect?e.onConnect:this.onConnectCallback,this.onDisconnectCallback="function"==typeof e.onDisconnect?e.onDisconnect:this.onDisconnectCallback,this.onDownCallback="function"==typeof e.onDown?e.onDown:this.onDownCallback,this.onUpCallback="function"==typeof e.onUp?e.onUp:this.onUpCallback,this.onAxisCallback="function"==typeof e.onAxis?e.onAxis:this.onAxisCallback,this.onFloatCallback="function"==typeof e.onFloat?e.onFloat:this.onFloatCallback,this.callbackContext=t)},getButton:function(t){return this._buttons[t]?this._buttons[t]:null},pollStatus:function(){if(this.connected&&this.game.input.enabled&&this.game.input.gamepad.enabled&&(!this._rawPad.timestamp||this._rawPad.timestamp!==this._prevTimestamp)){for(var t=0;t<this._buttonsLen;t++){var e=isNaN(this._rawPad.buttons[t])?this._rawPad.buttons[t].value:this._rawPad.buttons[t];e!==this._buttons[t].value&&(1===e?this.processButtonDown(t,e):0===e?this.processButtonUp(t,e):this.processButtonFloat(t,e))}for(var i=0;i<this._axesLen;i++){var s=this._rawPad.axes[i];s>0&&s>this.deadZone||s<0&&s<-this.deadZone?this.processAxisChange(i,s):this.processAxisChange(i,0)}this._prevTimestamp=this._rawPad.timestamp}},connect:function(t){var e=!this.connected;this.connected=!0,this.index=t.index,this._rawPad=t,this._buttons=[],this._buttonsLen=t.buttons.length,this._axes=[],this._axesLen=t.axes.length;for(var s=0;s<this._axesLen;s++)this._axes[s]=t.axes[s];for(var n in t.buttons)n=parseInt(n,10),this._buttons[n]=new i.DeviceButton(this,n);e&&this._padParent.onConnectCallback&&this._padParent.onConnectCallback.call(this._padParent.callbackContext,this.index),e&&this.onConnectCallback&&this.onConnectCallback.call(this.callbackContext)},disconnect:function(){var t=this.connected,e=this.index;this.connected=!1,this.index=null,this._rawPad=void 0;for(var i=0;i<this._buttonsLen;i++)this._buttons[i].destroy();this._buttons=[],this._buttonsLen=0,this._axes=[],this._axesLen=0,t&&this._padParent.onDisconnectCallback&&this._padParent.onDisconnectCallback.call(this._padParent.callbackContext,e),t&&this.onDisconnectCallback&&this.onDisconnectCallback.call(this.callbackContext)},destroy:function(){this._rawPad=void 0;for(var t=0;t<this._buttonsLen;t++)this._buttons[t].destroy();this._buttons=[],this._buttonsLen=0,this._axes=[],this._axesLen=0,this.onConnectCallback=null,this.onDisconnectCallback=null,this.onDownCallback=null,this.onUpCallback=null,this.onAxisCallback=null,this.onFloatCallback=null},processAxisChange:function(t,e){this._axes[t]!==e&&(this._axes[t]=e,this._padParent.onAxisCallback&&this._padParent.onAxisCallback.call(this._padParent.callbackContext,this,t,e),this.onAxisCallback&&this.onAxisCallback.call(this.callbackContext,this,t,e))},processButtonDown:function(t,e){this._buttons[t]&&this._buttons[t].start(null,e),this._padParent.onDownCallback&&this._padParent.onDownCallback.call(this._padParent.callbackContext,t,e,this.index),this.onDownCallback&&this.onDownCallback.call(this.callbackContext,t,e)},processButtonUp:function(t,e){this._padParent.onUpCallback&&this._padParent.onUpCallback.call(this._padParent.callbackContext,t,e,this.index),this.onUpCallback&&this.onUpCallback.call(this.callbackContext,t,e),this._buttons[t]&&this._buttons[t].stop(null,e)},processButtonFloat:function(t,e){this._padParent.onFloatCallback&&this._padParent.onFloatCallback.call(this._padParent.callbackContext,t,e,this.index),this.onFloatCallback&&this.onFloatCallback.call(this.callbackContext,t,e),this._buttons[t]&&this._buttons[t].padFloat(e)},axis:function(t){return!!this._axes[t]&&this._axes[t]},isDown:function(t){return!!this._buttons[t]&&this._buttons[t].isDown},isUp:function(t){return!!this._buttons[t]&&this._buttons[t].isUp},justReleased:function(t,e){if(this._buttons[t])return this._buttons[t].justReleased(e)},justPressed:function(t,e){if(this._buttons[t])return this._buttons[t].justPressed(e)},buttonValue:function(t){return this._buttons[t]?this._buttons[t].value:null},reset:function(){for(var t=0;t<this._axes.length;t++)this._axes[t]=0}},i.SinglePad.prototype.constructor=i.SinglePad,i.Key=function(t,e){this.game=t,this._enabled=!0,this.event=null,this.isDown=!1,this.isUp=!0,this.altKey=!1,this.ctrlKey=!1,this.shiftKey=!1,this.timeDown=0,this.duration=0,this.timeUp=-2500,this.durationUp=-2500,this.repeats=0,this.keyCode=e,this.onDown=new i.Signal,this.onHoldCallback=null,this.onHoldContext=null,this.onUp=new i.Signal,this._justDown=!1,this._justUp=!1},i.Key.prototype={update:function(){this._enabled&&(this.isDown?(this.duration=this.game.time.time-this.timeDown,this.repeats++,this.onHoldCallback&&this.onHoldCallback.call(this.onHoldContext,this)):this.durationUp=this.game.time.time-this.timeUp)},processKeyDown:function(t){this._enabled&&(this.event=t,this.isDown||(this.altKey=t.altKey,this.ctrlKey=t.ctrlKey,this.shiftKey=t.shiftKey,this.isDown=!0,this.isUp=!1,this.timeDown=this.game.time.time,this.duration=0,this.durationUp=this.game.time.time-this.timeUp,this.repeats=0,this._justDown=!0,this.onDown.dispatch(this)))},processKeyUp:function(t){this._enabled&&(this.event=t,this.isUp||(this.isDown=!1,this.isUp=!0,this.timeUp=this.game.time.time,this.duration=this.game.time.time-this.timeDown,this.durationUp=0,this._justUp=!0,this.onUp.dispatch(this)))},reset:function(t){void 0===t&&(t=!0),this.isDown=!1,this.isUp=!0,this.timeUp=this.game.time.time,this.duration=0,this.durationUp=-2500,this._enabled=!0,this._justDown=!1,this._justUp=!1,t&&(this.onDown.removeAll(),this.onUp.removeAll(),this.onHoldCallback=null,this.onHoldContext=null)},downDuration:function(t){return void 0===t&&(t=50),this.isDown&&this.duration<t},upDuration:function(t){return void 0===t&&(t=50),!this.isDown&&this.game.time.time-this.timeUp<t},justPressed:function(){return this.isDown&&0===this.duration},justReleased:function(){return!this.isDown&&0===this.durationUp}},Object.defineProperty(i.Key.prototype,"justDown",{get:function(){var t=this._justDown;return this._justDown=!1,t}}),Object.defineProperty(i.Key.prototype,"justUp",{get:function(){var t=this._justUp;return this._justUp=!1,t}}),Object.defineProperty(i.Key.prototype,"enabled",{get:function(){return this._enabled},set:function(t){(t=!!t)!==this._enabled&&(t||this.reset(!1),this._enabled=t)}}),i.Key.prototype.constructor=i.Key,i.Keyboard=function(t){this.game=t,this.enabled=!0,this.event=null,this.pressEvent=null,this.callbackContext=this,this.onDownCallback=null,this.onPressCallback=null,this.onUpCallback=null,this._keys=[],this._capture=[],this._onKeyDown=null,this._onKeyPress=null,this._onKeyUp=null,this._i=0,this._k=0},i.Keyboard.prototype={addCallbacks:function(t,e,i,s){this.callbackContext=t,void 0!==e&&null!==e&&(this.onDownCallback=e),void 0!==i&&null!==i&&(this.onUpCallback=i),void 0!==s&&null!==s&&(this.onPressCallback=s)},removeCallbacks:function(){this.callbackContext=this,this.onDownCallback=null,this.onUpCallback=null,this.onPressCallback=null},addKey:function(t){return this._keys[t]||(this._keys[t]=new i.Key(this.game,t),this.addKeyCapture(t)),this._keys[t]},addKeys:function(t){var e={};for(var i in t)e[i]=this.addKey(t[i]);return e},removeKey:function(t){this._keys[t]&&(this._keys[t]=null,this.removeKeyCapture(t))},createCursorKeys:function(){return this.addKeys({up:i.KeyCode.UP,down:i.KeyCode.DOWN,left:i.KeyCode.LEFT,right:i.KeyCode.RIGHT})},start:function(){if(!this.game.device.cocoonJS&&null===this._onKeyDown){var t=this;this._onKeyDown=function(e){return t.processKeyDown(e)},this._onKeyUp=function(e){return t.processKeyUp(e)},this._onKeyPress=function(e){return t.processKeyPress(e)},window.addEventListener("keydown",this._onKeyDown,!1),window.addEventListener("keyup",this._onKeyUp,!1),window.addEventListener("keypress",this._onKeyPress,!1)}},stop:function(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp),window.removeEventListener("keypress",this._onKeyPress),this._onKeyDown=null,this._onKeyUp=null,this._onKeyPress=null},destroy:function(){this.stop(),this.clearCaptures(),this._keys.length=0,this._i=0},addKeyCapture:function(t){if("object"==typeof t)for(var e in t)this._capture[t[e]]=!0;else this._capture[t]=!0},removeKeyCapture:function(t){delete this._capture[t]},clearCaptures:function(){this._capture={}},update:function(){for(this._i=this._keys.length;this._i--;)this._keys[this._i]&&this._keys[this._i].update()},processKeyDown:function(t){if(this.event=t,this.game.input.enabled&&this.enabled){var e=t.keyCode;this._capture[e]&&t.preventDefault(),this._keys[e]||(this._keys[e]=new i.Key(this.game,e)),this._keys[e].processKeyDown(t),this._k=e,this.onDownCallback&&this.onDownCallback.call(this.callbackContext,t)}},processKeyPress:function(t){this.pressEvent=t,this.game.input.enabled&&this.enabled&&this.onPressCallback&&this.onPressCallback.call(this.callbackContext,String.fromCharCode(t.charCode),t)},processKeyUp:function(t){if(this.event=t,this.game.input.enabled&&this.enabled){var e=t.keyCode;this._capture[e]&&t.preventDefault(),this._keys[e]||(this._keys[e]=new i.Key(this.game,e)),this._keys[e].processKeyUp(t),this.onUpCallback&&this.onUpCallback.call(this.callbackContext,t)}},reset:function(t){void 0===t&&(t=!0),this.event=null;for(var e=this._keys.length;e--;)this._keys[e]&&this._keys[e].reset(t)},downDuration:function(t,e){return this._keys[t]?this._keys[t].downDuration(e):null},upDuration:function(t,e){return this._keys[t]?this._keys[t].upDuration(e):null},justPressed:function(t){return this._keys[t]?this._keys[t].justPressed():null},justReleased:function(t){return this._keys[t]?this._keys[t].justReleased():null},isDown:function(t){return this._keys[t]?this._keys[t].isDown:null}},Object.defineProperty(i.Keyboard.prototype,"lastChar",{get:function(){return this.event&&32===this.event.charCode?"":this.pressEvent?String.fromCharCode(this.pressEvent.charCode):null}}),Object.defineProperty(i.Keyboard.prototype,"lastKey",{get:function(){return this._keys[this._k]}}),i.Keyboard.prototype.constructor=i.Keyboard,i.KeyCode={A:"A".charCodeAt(0),B:"B".charCodeAt(0),C:"C".charCodeAt(0),D:"D".charCodeAt(0),E:"E".charCodeAt(0),F:"F".charCodeAt(0),G:"G".charCodeAt(0),H:"H".charCodeAt(0),I:"I".charCodeAt(0),J:"J".charCodeAt(0),K:"K".charCodeAt(0),L:"L".charCodeAt(0),M:"M".charCodeAt(0),N:"N".charCodeAt(0),O:"O".charCodeAt(0),P:"P".charCodeAt(0),Q:"Q".charCodeAt(0),R:"R".charCodeAt(0),S:"S".charCodeAt(0),T:"T".charCodeAt(0),U:"U".charCodeAt(0),V:"V".charCodeAt(0),W:"W".charCodeAt(0),X:"X".charCodeAt(0),Y:"Y".charCodeAt(0),Z:"Z".charCodeAt(0),ZERO:"0".charCodeAt(0),ONE:"1".charCodeAt(0),TWO:"2".charCodeAt(0),THREE:"3".charCodeAt(0),FOUR:"4".charCodeAt(0),FIVE:"5".charCodeAt(0),SIX:"6".charCodeAt(0),SEVEN:"7".charCodeAt(0),EIGHT:"8".charCodeAt(0),NINE:"9".charCodeAt(0),NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_ADD:107,NUMPAD_ENTER:108,NUMPAD_SUBTRACT:109,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,COLON:186,EQUALS:187,COMMA:188,UNDERSCORE:189,PERIOD:190,QUESTION_MARK:191,TILDE:192,OPEN_BRACKET:219,BACKWARD_SLASH:220,CLOSED_BRACKET:221,QUOTES:222,BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CONTROL:17,ALT:18,CAPS_LOCK:20,ESC:27,SPACEBAR:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PLUS:43,MINUS:44,INSERT:45,DELETE:46,HELP:47,NUM_LOCK:144};for(var n in i.KeyCode)i.KeyCode.hasOwnProperty(n)&&!n.match(/[a-z]/)&&(i.Keyboard[n]=i.KeyCode[n]);i.Component=function(){},i.Component.Angle=function(){},i.Component.Angle.prototype={angle:{get:function(){return i.Math.wrapAngle(i.Math.radToDeg(this.rotation))},set:function(t){this.rotation=i.Math.degToRad(i.Math.wrapAngle(t))}}},i.Component.Animation=function(){},i.Component.Animation.prototype={play:function(t,e,i,s){if(this.animations)return this.animations.play(t,e,i,s)}},i.Component.AutoCull=function(){},i.Component.AutoCull.prototype={autoCull:!1,inCamera:{get:function(){return this.autoCull||this.checkWorldBounds||(this._bounds.copyFrom(this.getBounds()),this._bounds.x+=this.game.camera.view.x,this._bounds.y+=this.game.camera.view.y),this.game.world.camera.view.intersects(this._bounds)}}},i.Component.Bounds=function(){},i.Component.Bounds.prototype={offsetX:{get:function(){return this.anchor.x*this.width}},offsetY:{get:function(){return this.anchor.y*this.height}},centerX:{get:function(){return this.x-this.offsetX+.5*this.width},set:function(t){this.x=t+this.offsetX-.5*this.width}},centerY:{get:function(){return this.y-this.offsetY+.5*this.height},set:function(t){this.y=t+this.offsetY-.5*this.height}},left:{get:function(){return this.x-this.offsetX},set:function(t){this.x=t+this.offsetX}},right:{get:function(){return this.x+this.width-this.offsetX},set:function(t){this.x=t-this.width+this.offsetX}},top:{get:function(){return this.y-this.offsetY},set:function(t){this.y=t+this.offsetY}},bottom:{get:function(){return this.y+this.height-this.offsetY},set:function(t){this.y=t-this.height+this.offsetY}},alignIn:function(t,e,s,n){switch(void 0===s&&(s=0),void 0===n&&(n=0),e){default:case i.TOP_LEFT:this.left=t.left-s,this.top=t.top-n;break;case i.TOP_CENTER:this.centerX=t.centerX+s,this.top=t.top-n;break;case i.TOP_RIGHT:this.right=t.right+s,this.top=t.top-n;break;case i.LEFT_CENTER:this.left=t.left-s,this.centerY=t.centerY+n;break;case i.CENTER:this.centerX=t.centerX+s,this.centerY=t.centerY+n;break;case i.RIGHT_CENTER:this.right=t.right+s,this.centerY=t.centerY+n;break;case i.BOTTOM_LEFT:this.left=t.left-s,this.bottom=t.bottom+n;break;case i.BOTTOM_CENTER:this.centerX=t.centerX+s,this.bottom=t.bottom+n;break;case i.BOTTOM_RIGHT:this.right=t.right+s,this.bottom=t.bottom+n}return this},alignTo:function(t,e,s,n){switch(void 0===s&&(s=0),void 0===n&&(n=0),e){default:case i.TOP_LEFT:this.left=t.left-s,this.bottom=t.top-n;break;case i.TOP_CENTER:this.centerX=t.centerX+s,this.bottom=t.top-n;break;case i.TOP_RIGHT:this.right=t.right+s,this.bottom=t.top-n;break;case i.LEFT_TOP:this.right=t.left-s,this.top=t.top-n;break;case i.LEFT_CENTER:this.right=t.left-s,this.centerY=t.centerY+n;break;case i.LEFT_BOTTOM:this.right=t.left-s,this.bottom=t.bottom+n;break;case i.RIGHT_TOP:this.left=t.right+s,this.top=t.top-n;break;case i.RIGHT_CENTER:this.left=t.right+s,this.centerY=t.centerY+n;break;case i.RIGHT_BOTTOM:this.left=t.right+s,this.bottom=t.bottom+n;break;case i.BOTTOM_LEFT:this.left=t.left-s,this.top=t.bottom+n;break;case i.BOTTOM_CENTER:this.centerX=t.centerX+s,this.top=t.bottom+n;break;case i.BOTTOM_RIGHT:this.right=t.right+s,this.top=t.bottom+n}return this}},i.Group.prototype.alignIn=i.Component.Bounds.prototype.alignIn,i.Group.prototype.alignTo=i.Component.Bounds.prototype.alignTo,i.Component.BringToTop=function(){},i.Component.BringToTop.prototype.bringToTop=function(){return this.parent&&this.parent.bringToTop(this),this},i.Component.BringToTop.prototype.sendToBack=function(){return this.parent&&this.parent.sendToBack(this),this},i.Component.BringToTop.prototype.moveUp=function(){return this.parent&&this.parent.moveUp(this),this},i.Component.BringToTop.prototype.moveDown=function(){return this.parent&&this.parent.moveDown(this),this},i.Component.Core=function(){},i.Component.Core.skipTypeChecks=!1,i.Component.Core.install=function(t){i.Utils.mixinPrototype(this,i.Component.Core.prototype),this.components={};for(var e=0;e<t.length;e++){var s=t[e],n=!1;"Destroy"===s&&(n=!0),i.Utils.mixinPrototype(this,i.Component[s].prototype,n),this.components[s]=!0}},i.Component.Core.init=function(t,e,s,n,r){if(!i.Component.Core.skipTypeChecks){if(!(t instanceof i.Game))throw new Error("The value passed as the `game` argument ("+t+") is not an instance of Phaser.Game.");"number"!=typeof e&&(console.warn("The `x` argument value (%s) should be a number.",e),e=0),"number"!=typeof s&&(console.warn("The `y` argument value (%s) should be a number.",s),s=0)}this.game=t,this.key=n,this.data={},this.position.set(e,s),this.world=new i.Point(e,s),this.previousPosition=new i.Point(e,s),this.events=new i.Events(this),this._bounds=new i.Rectangle,this.components.PhysicsBody&&(this.body=this.body),this.components.Animation&&(this.animations=new i.AnimationManager(this)),this.components.LoadTexture&&null!==n&&this.loadTexture(n,r),this.components.FixedToCamera&&(this.cameraOffset=new i.Point(e,s))},i.Component.Core.preUpdate=function(){return this.pendingDestroy?(this.destroy(),!1):(this.previousPosition.set(this.world.x,this.world.y),this.previousRotation=this.rotation,this.exists&&this.parent.exists?(this.world.setTo(this.game.camera.x+this.worldTransform.tx,this.game.camera.y+this.worldTransform.ty),this.visible&&(this.renderOrderID=this.game.stage.currentRenderOrderID++),this.animations&&this.animations.update(),this.body&&this.body.preUpdate(),this.preUpdateChildren(),!0):(this.renderOrderID=-1,!1))},i.Component.Core.prototype={game:null,name:"",data:{},components:{},z:0,events:void 0,animations:void 0,key:"",world:null,debug:!1,previousPosition:null,previousRotation:0,renderOrderID:0,fresh:!0,pendingDestroy:!1,_bounds:null,_exists:!0,exists:{get:function(){return this._exists},set:function(t){t?(this._exists=!0,this.body&&this.body.type===i.Physics.P2JS&&this.body.addToWorld(),this.visible=!0):(this._exists=!1,this.body&&this.body.type===i.Physics.P2JS&&this.body.removeFromWorld(),this.visible=!1)}},preUpdateChildren:function(){for(var t=0;t<this.children.length;){var e=this.children[t];e.preUpdate(),this===e.parent&&t++}},update:function(){},postUpdate:function(){this.customRender&&this.key.render(),this.components.PhysicsBody&&i.Component.PhysicsBody.postUpdate.call(this),this.components.FixedToCamera&&i.Component.FixedToCamera.postUpdate.call(this);for(var t=0;t<this.children.length;t++)this.children[t].postUpdate()}},i.Component.Crop=function(){},i.Component.Crop.prototype={cropRect:null,_crop:null,crop:function(t,e){void 0===e&&(e=!1),t?(e&&null!==this.cropRect?this.cropRect.setTo(t.x,t.y,t.width,t.height):e&&null===this.cropRect?this.cropRect=new i.Rectangle(t.x,t.y,t.width,t.height):this.cropRect=t,this.updateCrop()):(this._crop=null,this.cropRect=null,this.resetFrame())},updateCrop:function(){if(this.cropRect){var t=this.texture.crop.x,e=this.texture.crop.y,s=this.texture.crop.width,n=this.texture.crop.height;this._crop=i.Rectangle.clone(this.cropRect,this._crop),this._crop.x+=this._frame.x,this._crop.y+=this._frame.y;var r=Math.max(this._frame.x,this._crop.x),o=Math.max(this._frame.y,this._crop.y),a=Math.min(this._frame.right,this._crop.right)-r,h=Math.min(this._frame.bottom,this._crop.bottom)-o;this.texture.crop.x=r,this.texture.crop.y=o,this.texture.crop.width=a,this.texture.crop.height=h,this.texture.frame.width=Math.min(a,this.cropRect.width),this.texture.frame.height=Math.min(h,this.cropRect.height),this.texture.width=this.texture.frame.width,this.texture.height=this.texture.frame.height,this.texture._updateUvs(),16777215===this.tint||t===r&&e===o&&s===a&&n===h||(this.texture.requiresReTint=!0)}}},i.Component.Delta=function(){},i.Component.Delta.prototype={deltaX:{get:function(){return this.world.x-this.previousPosition.x}},deltaY:{get:function(){return this.world.y-this.previousPosition.y}},deltaZ:{get:function(){return this.rotation-this.previousRotation}}},i.Component.Destroy=function(){},i.Component.Destroy.prototype={destroyPhase:!1,destroy:function(t,e){if(null!==this.game&&!this.destroyPhase){void 0===t&&(t=!0),void 0===e&&(e=!1),this.destroyPhase=!0,this.events&&this.events.onDestroy$dispatch(this),this.parent&&(this.parent instanceof i.Group?this.parent.remove(this):this.parent.removeChild(this)),this.input&&this.input.destroy(),this.animations&&this.animations.destroy(),this.body&&this.body.destroy(),this.events&&this.events.destroy(),this.game.tweens.removeFrom(this);var s=this.children.length;if(t)for(;s--;)this.children[s].destroy(t);else for(;s--;)this.removeChild(this.children[s]);this._crop&&(this._crop=null,this.cropRect=null),this._frame&&(this._frame=null),i.Video&&this.key instanceof i.Video&&this.key.onChangeSource.remove(this.resizeFrame,this),i.BitmapText&&this._glyphs&&(this._glyphs=[]),this.alive=!1,this.exists=!1,this.visible=!1,this.filters=null,this.mask=null,this.game=null,this.data={},this.renderable=!1,this.transformCallback&&(this.transformCallback=null,this.transformCallbackContext=null),this.hitArea=null,this.parent=null,this.stage=null,this.worldTransform=null,this.filterArea=null,this._bounds=null,this._currentBounds=null,this._mask=null,this._destroyCachedSprite(),e&&this.texture.destroy(!0),this.destroyPhase=!1,this.pendingDestroy=!1}}},i.Events=function(t){this.parent=t},i.Events.prototype={destroy:function(){this._parent=null,this._onDestroy&&this._onDestroy.dispose(),this._onAddedToGroup&&this._onAddedToGroup.dispose(),this._onRemovedFromGroup&&this._onRemovedFromGroup.dispose(),this._onKilled&&this._onKilled.dispose(),this._onRevived&&this._onRevived.dispose(),this._onEnterBounds&&this._onEnterBounds.dispose(),this._onOutOfBounds&&this._onOutOfBounds.dispose(),this._onInputOver&&this._onInputOver.dispose(),this._onInputOut&&this._onInputOut.dispose(),this._onInputDown&&this._onInputDown.dispose(),this._onInputUp&&this._onInputUp.dispose(),this._onDragStart&&this._onDragStart.dispose(),this._onDragUpdate&&this._onDragUpdate.dispose(),this._onDragStop&&this._onDragStop.dispose(),this._onAnimationStart&&this._onAnimationStart.dispose(),this._onAnimationComplete&&this._onAnimationComplete.dispose(),this._onAnimationLoop&&this._onAnimationLoop.dispose()},onAddedToGroup:null,onRemovedFromGroup:null,onDestroy:null,onKilled:null,onRevived:null,onOutOfBounds:null,onEnterBounds:null,onInputOver:null,onInputOut:null,onInputDown:null,onInputUp:null,onDragStart:null,onDragUpdate:null,onDragStop:null,onAnimationStart:null,onAnimationComplete:null,onAnimationLoop:null},i.Events.prototype.constructor=i.Events;for(var r in i.Events.prototype)i.Events.prototype.hasOwnProperty(r)&&0===r.indexOf("on")&&null===i.Events.prototype[r]&&function(t,e){"use strict";Object.defineProperty(i.Events.prototype,t,{get:function(){return this[e]||(this[e]=new i.Signal)}}),i.Events.prototype[t+"$dispatch"]=function(){return this[e]?this[e].dispatch.apply(this[e],arguments):null}}(r,"_"+r);i.Component.FixedToCamera=function(){},i.Component.FixedToCamera.postUpdate=function(){this.fixedToCamera&&(this.position.x=(this.game.camera.view.x+this.cameraOffset.x)/this.game.camera.scale.x,this.position.y=(this.game.camera.view.y+this.cameraOffset.y)/this.game.camera.scale.y)},i.Component.FixedToCamera.prototype={_fixedToCamera:!1,fixedToCamera:{get:function(){return this._fixedToCamera},set:function(t){t?(this._fixedToCamera=!0,this.cameraOffset.set(this.x,this.y)):this._fixedToCamera=!1}},cameraOffset:new i.Point},i.Component.Health=function(){},i.Component.Health.prototype={health:1,maxHealth:100,damage:function(t){return this.alive&&(this.health-=t,this.health<=0&&this.kill()),this},setHealth:function(t){return this.health=t,this.health>this.maxHealth&&(this.health=this.maxHealth),this},heal:function(t){return this.alive&&(this.health+=t,this.health>this.maxHealth&&(this.health=this.maxHealth)),this}},i.Component.InCamera=function(){},i.Component.InCamera.prototype={inCamera:{get:function(){return this.game.world.camera.view.intersects(this._bounds)}}},i.Component.InputEnabled=function(){},i.Component.InputEnabled.prototype={input:null,inputEnabled:{get:function(){return this.input&&this.input.enabled},set:function(t){t?null===this.input?(this.input=new i.InputHandler(this),this.input.start()):this.input&&!this.input.enabled&&this.input.start():this.input&&this.input.enabled&&this.input.stop()}}},i.Component.InWorld=function(){},i.Component.InWorld.preUpdate=function(){if(this.pendingDestroy)return this.destroy(),!1;if(this.autoCull||this.checkWorldBounds){if(this._bounds.copyFrom(this.getBounds()),this._bounds.x+=this.game.camera.view.x,this._bounds.y+=this.game.camera.view.y,this.autoCull)if(this.game.world.camera.view.intersects(this._bounds))this.renderable=!0,this.game.world.camera.totalInView++;else if(this.renderable=!1,this.outOfCameraBoundsKill)return this.kill(),!1;if(this.checkWorldBounds)if(this._outOfBoundsFired&&this.game.world.bounds.intersects(this._bounds))this._outOfBoundsFired=!1,this.events.onEnterBounds$dispatch(this);else if(!this._outOfBoundsFired&&!this.game.world.bounds.intersects(this._bounds)&&(this._outOfBoundsFired=!0,this.events.onOutOfBounds$dispatch(this),this.outOfBoundsKill))return this.kill(),!1}return!0},i.Component.InWorld.prototype={checkWorldBounds:!1,outOfBoundsKill:!1,outOfCameraBoundsKill:!1,_outOfBoundsFired:!1,inWorld:{get:function(){return this.game.world.bounds.intersects(this.getBounds())}}},i.Component.LifeSpan=function(){},i.Component.LifeSpan.preUpdate=function(){return this.pendingDestroy?(this.destroy(),!1):!(this.lifespan>0&&(this.lifespan-=this.game.time.physicsElapsedMS,this.lifespan<=0))||(this.kill(),!1)},i.Component.LifeSpan.prototype={alive:!0,lifespan:0,revive:function(t){return void 0===t&&(t=100),this.alive=!0,this.exists=!0,this.visible=!0,"function"==typeof this.setHealth&&this.setHealth(t),this.events&&this.events.onRevived$dispatch(this),this},kill:function(){return this.alive=!1,this.exists=!1,this.visible=!1,this.events&&this.events.onKilled$dispatch(this),this}},i.Component.LoadTexture=function(){},i.Component.LoadTexture.prototype={customRender:!1,_frame:null,loadTexture:function(t,e,s){t===i.PENDING_ATLAS?(t=e,e=0):e=e||0,(s||void 0===s)&&this.animations&&this.animations.stop(),this.key=t,this.customRender=!1;var n=this.game.cache,r=!0,o=!this.texture.baseTexture.scaleMode;if(i.RenderTexture&&t instanceof i.RenderTexture)this.key=t.key,this.setTexture(t);else if(i.BitmapData&&t instanceof i.BitmapData)this.customRender=!0,this.setTexture(t.texture),r=n.hasFrameData(t.key,i.Cache.BITMAPDATA)?!this.animations.loadFrameData(n.getFrameData(t.key,i.Cache.BITMAPDATA),e):!this.animations.loadFrameData(t.frameData,0);else if(i.Video&&t instanceof i.Video){this.customRender=!0;var a=t.texture.valid;this.setTexture(t.texture),this.setFrame(t.texture.frame.clone()),t.onChangeSource.add(this.resizeFrame,this),this.texture.valid=a}else if(i.Tilemap&&t instanceof i.TilemapLayer)this.setTexture(PIXI.Texture.fromCanvas(t.canvas));else if(t instanceof PIXI.Texture)this.setTexture(t);else{var h=n.getImage(t,!0);this.key=h.key,this.setTexture(new PIXI.Texture(h.base)),this.texture.baseTexture.skipRender="__default"===t,r=!this.animations.loadFrameData(h.frameData,e)}r&&(this._frame=i.Rectangle.clone(this.texture.frame)),o||(this.texture.baseTexture.scaleMode=1)},setFrame:function(t){this._frame=t,this.texture.frame.x=t.x,this.texture.frame.y=t.y,this.texture.frame.width=t.width,this.texture.frame.height=t.height,this.texture.crop.x=t.x,this.texture.crop.y=t.y,this.texture.crop.width=t.width,this.texture.crop.height=t.height,t.trimmed?(this.texture.trim?(this.texture.trim.x=t.spriteSourceSizeX,this.texture.trim.y=t.spriteSourceSizeY,this.texture.trim.width=t.sourceSizeW,this.texture.trim.height=t.sourceSizeH):this.texture.trim={x:t.spriteSourceSizeX,y:t.spriteSourceSizeY,width:t.sourceSizeW,height:t.sourceSizeH},this.texture.width=t.sourceSizeW,this.texture.height=t.sourceSizeH,this.texture.frame.width=t.sourceSizeW,this.texture.frame.height=t.sourceSizeH):!t.trimmed&&this.texture.trim&&(this.texture.trim=null),t.rotated&&(this.texture.rotated=!0),this.cropRect&&this.updateCrop(),this.texture.requiresReTint=!0,this.texture._updateUvs(),this.tilingTexture&&(this.refreshTexture=!0)},resizeFrame:function(t,e,i){this.texture.frame.resize(e,i),this.texture.setFrame(this.texture.frame)},resetFrame:function(){this._frame&&this.setFrame(this._frame)},frame:{get:function(){return this.animations.frame},set:function(t){this.animations.frame=t}},frameName:{get:function(){return this.animations.frameName},set:function(t){this.animations.frameName=t}}},i.Component.Overlap=function(){},i.Component.Overlap.prototype={overlap:function(t){return i.Rectangle.intersects(this.getBounds(),t.getBounds())}},i.Component.PhysicsBody=function(){},i.Component.PhysicsBody.preUpdate=function(){return this.pendingDestroy?(this.destroy(),!1):this.fresh&&this.exists?(this.world.setTo(this.parent.position.x+this.position.x,this.parent.position.y+this.position.y),this.worldTransform.tx=this.world.x,this.worldTransform.ty=this.world.y,this.previousPosition.set(this.world.x,this.world.y),this.previousRotation=this.rotation,this.body&&this.body.preUpdate(),this.fresh=!1,this.preUpdateChildren(),!1):(this.previousPosition.set(this.world.x,this.world.y),this.previousRotation=this.rotation,!(!this._exists||!this.parent.exists)||(this.renderOrderID=-1,!1))},i.Component.PhysicsBody.postUpdate=function(){this.exists&&this.body&&this.body.postUpdate()},i.Component.PhysicsBody.prototype={body:null,x:{get:function(){return this.position.x},set:function(t){this.position.x=t,this.body&&!this.body.dirty&&(this.body._reset=!0)}},y:{get:function(){return this.position.y},set:function(t){this.position.y=t,this.body&&!this.body.dirty&&(this.body._reset=!0)}}},i.Component.Reset=function(){},i.Component.Reset.prototype.reset=function(t,e,i){return void 0===i&&(i=1),this.world.set(t,e),this.position.set(t,e),this.fresh=!0,this.exists=!0,this.visible=!0,this.renderable=!0,this.components.InWorld&&(this._outOfBoundsFired=!1),this.components.LifeSpan&&(this.alive=!0,this.health=i),this.components.PhysicsBody&&this.body&&this.body.reset(t,e,!1,!1),this},i.Component.ScaleMinMax=function(){},i.Component.ScaleMinMax.prototype={transformCallback:null,transformCallbackContext:this,scaleMin:null,scaleMax:null,checkTransform:function(t){this.scaleMin&&(t.a<this.scaleMin.x&&(t.a=this.scaleMin.x),t.d<this.scaleMin.y&&(t.d=this.scaleMin.y)),this.scaleMax&&(t.a>this.scaleMax.x&&(t.a=this.scaleMax.x),t.d>this.scaleMax.y&&(t.d=this.scaleMax.y))},setScaleMinMax:function(t,e,s,n){void 0===e?e=s=n=t:void 0===s&&(s=n=e,e=t),null===t?this.scaleMin=null:this.scaleMin?this.scaleMin.set(t,e):this.scaleMin=new i.Point(t,e),null===s?this.scaleMax=null:this.scaleMax?this.scaleMax.set(s,n):this.scaleMax=new i.Point(s,n),null===this.scaleMin?this.transformCallback=null:(this.transformCallback=this.checkTransform,this.transformCallbackContext=this)}},i.Component.Smoothed=function(){},i.Component.Smoothed.prototype={smoothed:{get:function(){return!this.texture.baseTexture.scaleMode},set:function(t){t?this.texture&&(this.texture.baseTexture.scaleMode=0,this.texture.baseTexture.dirty()):this.texture&&(this.texture.baseTexture.scaleMode=1,this.texture.baseTexture.dirty())}}},i.GameObjectFactory=function(t){this.game=t,this.world=this.game.world},i.GameObjectFactory.prototype={existing:function(t){return this.world.add(t)},weapon:function(t,e,s,n,r){var o=this.game.plugins.add(i.Weapon);return r&&(o.bulletClass=r),o.createBullets(t,e,s,n),o},image:function(t,e,s,n,r){return void 0===r&&(r=this.world),r.add(new i.Image(this.game,t,e,s,n))},sprite:function(t,e,s,n,r){return void 0===r&&(r=this.world),r.add(new i.Sprite(this.game,t,e,s,n))},creature:function(t,e,s,n,r){void 0===r&&(r=this.world);var o=new i.Creature(this.game,t,e,s,n);return r.add(o),o},tween:function(t){return this.game.tweens.create(t)},group:function(t,e,s,n,r){return new i.Group(this.game,t,e,s,n,r)},physicsGroup:function(t,e,s,n){return new i.Group(this.game,e,s,n,!0,t)},spriteBatch:function(t,e,s){return void 0===t&&(t=null),void 0===e&&(e="group"),void 0===s&&(s=!1),new i.SpriteBatch(this.game,t,e,s)},audio:function(t,e,i,s){return this.game.sound.add(t,e,i,s)},sound:function(t,e,i,s){return this.game.sound.add(t,e,i,s)},audioSprite:function(t){return this.game.sound.addSprite(t)},tileSprite:function(t,e,s,n,r,o,a){return void 0===a&&(a=this.world),a.add(new i.TileSprite(this.game,t,e,s,n,r,o))},rope:function(t,e,s,n,r,o){return void 0===o&&(o=this.world),o.add(new i.Rope(this.game,t,e,s,n,r))},text:function(t,e,s,n,r){return void 0===r&&(r=this.world),r.add(new i.Text(this.game,t,e,s,n))},button:function(t,e,s,n,r,o,a,h,u,l){return void 0===l&&(l=this.world),l.add(new i.Button(this.game,t,e,s,n,r,o,a,h,u))},graphics:function(t,e,s){return void 0===s&&(s=this.world),s.add(new i.Graphics(this.game,t,e))},emitter:function(t,e,s){return this.game.particles.add(new i.Particles.Arcade.Emitter(this.game,t,e,s))},retroFont:function(t,e,s,n,r,o,a,h,u){return new i.RetroFont(this.game,t,e,s,n,r,o,a,h,u)},bitmapText:function(t,e,s,n,r,o){return void 0===o&&(o=this.world),o.add(new i.BitmapText(this.game,t,e,s,n,r))},tilemap:function(t,e,s,n,r){return new i.Tilemap(this.game,t,e,s,n,r)},renderTexture:function(t,e,s,n){void 0!==s&&""!==s||(s=this.game.rnd.uuid()),void 0===n&&(n=!1);var r=new i.RenderTexture(this.game,t,e,s);return n&&this.game.cache.addRenderTexture(s,r),r},video:function(t,e){return new i.Video(this.game,t,e)},bitmapData:function(t,e,s,n){void 0===n&&(n=!1),void 0!==s&&""!==s||(s=this.game.rnd.uuid());var r=new i.BitmapData(this.game,s,t,e);return n&&this.game.cache.addBitmapData(s,r),r},filter:function(t){var e=Array.prototype.slice.call(arguments,1);return(t=new i.Filter[t](this.game)).init.apply(t,e),t},plugin:function(t){return this.game.plugins.add(t)}},i.GameObjectFactory.prototype.constructor=i.GameObjectFactory,i.GameObjectCreator=function(t){this.game=t,this.world=this.game.world},i.GameObjectCreator.prototype={image:function(t,e,s,n){return new i.Image(this.game,t,e,s,n)},sprite:function(t,e,s,n){return new i.Sprite(this.game,t,e,s,n)},tween:function(t){return new i.Tween(t,this.game,this.game.tweens)},group:function(t,e,s,n,r){return new i.Group(this.game,t,e,s,n,r)},spriteBatch:function(t,e,s){return void 0===e&&(e="group"),void 0===s&&(s=!1),new i.SpriteBatch(this.game,t,e,s)},audio:function(t,e,i,s){return this.game.sound.add(t,e,i,s)},audioSprite:function(t){return this.game.sound.addSprite(t)},sound:function(t,e,i,s){return this.game.sound.add(t,e,i,s)},tileSprite:function(t,e,s,n,r,o){return new i.TileSprite(this.game,t,e,s,n,r,o)},rope:function(t,e,s,n,r){return new i.Rope(this.game,t,e,s,n,r)},text:function(t,e,s,n){return new i.Text(this.game,t,e,s,n)},button:function(t,e,s,n,r,o,a,h,u){return new i.Button(this.game,t,e,s,n,r,o,a,h,u)},graphics:function(t,e){return new i.Graphics(this.game,t,e)},emitter:function(t,e,s){return new i.Particles.Arcade.Emitter(this.game,t,e,s)},retroFont:function(t,e,s,n,r,o,a,h,u){return new i.RetroFont(this.game,t,e,s,n,r,o,a,h,u)},bitmapText:function(t,e,s,n,r,o){return new i.BitmapText(this.game,t,e,s,n,r,o)},tilemap:function(t,e,s,n,r){return new i.Tilemap(this.game,t,e,s,n,r)},renderTexture:function(t,e,s,n){void 0!==s&&""!==s||(s=this.game.rnd.uuid()),void 0===n&&(n=!1);var r=new i.RenderTexture(this.game,t,e,s);return n&&this.game.cache.addRenderTexture(s,r),r},bitmapData:function(t,e,s,n){void 0===n&&(n=!1),void 0!==s&&""!==s||(s=this.game.rnd.uuid());var r=new i.BitmapData(this.game,s,t,e);return n&&this.game.cache.addBitmapData(s,r),r},filter:function(t){var e=Array.prototype.slice.call(arguments,1);return(t=new i.Filter[t](this.game)).init.apply(t,e),t}},i.GameObjectCreator.prototype.constructor=i.GameObjectCreator,i.Sprite=function(t,e,s,n,r){e=e||0,s=s||0,n=n||null,r=r||null,this.type=i.SPRITE,this.physicsType=i.SPRITE,PIXI.Sprite.call(this,i.Cache.DEFAULT),i.Component.Core.init.call(this,t,e,s,n,r)},i.Sprite.prototype=Object.create(PIXI.Sprite.prototype),i.Sprite.prototype.constructor=i.Sprite,i.Component.Core.install.call(i.Sprite.prototype,["Angle","Animation","AutoCull","Bounds","BringToTop","Crop","Delta","Destroy","FixedToCamera","Health","InCamera","InputEnabled","InWorld","LifeSpan","LoadTexture","Overlap","PhysicsBody","Reset","ScaleMinMax","Smoothed"]),i.Sprite.prototype.preUpdatePhysics=i.Component.PhysicsBody.preUpdate,i.Sprite.prototype.preUpdateLifeSpan=i.Component.LifeSpan.preUpdate,i.Sprite.prototype.preUpdateInWorld=i.Component.InWorld.preUpdate,i.Sprite.prototype.preUpdateCore=i.Component.Core.preUpdate,i.Sprite.prototype.preUpdate=function(){return!!(this.preUpdatePhysics()&&this.preUpdateLifeSpan()&&this.preUpdateInWorld())&&this.preUpdateCore()},i.Image=function(t,e,s,n,r){e=e||0,s=s||0,n=n||null,r=r||null,this.type=i.IMAGE,PIXI.Sprite.call(this,i.Cache.DEFAULT),i.Component.Core.init.call(this,t,e,s,n,r)},i.Image.prototype=Object.create(PIXI.Sprite.prototype),i.Image.prototype.constructor=i.Image,i.Component.Core.install.call(i.Image.prototype,["Angle","Animation","AutoCull","Bounds","BringToTop","Crop","Destroy","FixedToCamera","InputEnabled","LifeSpan","LoadTexture","Overlap","Reset","ScaleMinMax","Smoothed"]),i.Image.prototype.preUpdateLifeSpan=i.Component.LifeSpan.preUpdate,i.Image.prototype.preUpdateInWorld=i.Component.InWorld.preUpdate,i.Image.prototype.preUpdateCore=i.Component.Core.preUpdate,i.Image.prototype.preUpdate=function(){return!(!this.preUpdateInWorld()||!this.preUpdateLifeSpan())&&this.preUpdateCore()},i.Button=function(t,e,s,n,r,o,a,h,u,l){e=e||0,s=s||0,n=n||null,r=r||null,o=o||this,i.Image.call(this,t,e,s,n,h),this.type=i.BUTTON,this.physicsType=i.SPRITE,this._onOverFrame=null,this._onOutFrame=null,this._onDownFrame=null,this._onUpFrame=null,this.onOverSound=null,this.onOutSound=null,this.onDownSound=null,this.onUpSound=null,this.onOverSoundMarker="",this.onOutSoundMarker="",this.onDownSoundMarker="",this.onUpSoundMarker="",this.onInputOver=new i.Signal,this.onInputOut=new i.Signal,this.onInputDown=new i.Signal,this.onInputUp=new i.Signal,this.onOverMouseOnly=!0,this.justReleasedPreventsOver=i.PointerMode.CONTACT,this.freezeFrames=!1,this.forceOut=!1,this.inputEnabled=!0,this.input.start(0,!0),this.input.useHandCursor=!0,this.setFrames(a,h,u,l),null!==r&&this.onInputUp.add(r,o),this.events.onInputOver.add(this.onInputOverHandler,this),this.events.onInputOut.add(this.onInputOutHandler,this),this.events.onInputDown.add(this.onInputDownHandler,this),this.events.onInputUp.add(this.onInputUpHandler,this)},i.Button.prototype=Object.create(i.Image.prototype),i.Button.prototype.constructor=i.Button;return i.Button.prototype.clearFrames=function(){this.setFrames(null,null,null,null)},i.Button.prototype.setStateFrame=function(t,e,i){var s="_on"+t+"Frame";null!==e?(this[s]=e,i&&this.changeStateFrame(t)):this[s]=null},i.Button.prototype.changeStateFrame=function(t){if(this.freezeFrames)return!1;var e=this["_on"+t+"Frame"];return"string"==typeof e?(this.frameName=e,!0):"number"==typeof e&&(this.frame=e,!0)},i.Button.prototype.setFrames=function(t,e,i,s){this.setStateFrame("Over",t,this.input.pointerOver()),this.setStateFrame("Out",e,!this.input.pointerOver()),this.setStateFrame("Down",i,this.input.pointerDown()),this.setStateFrame("Up",s,this.input.pointerUp())},i.Button.prototype.setStateSound=function(t,e,s){var n="on"+t+"Sound",r="on"+t+"SoundMarker";e instanceof i.Sound||e instanceof i.AudioSprite?(this[n]=e,this[r]="string"==typeof s?s:""):(this[n]=null,this[r]="")},i.Button.prototype.playStateSound=function(t){var e=this["on"+t+"Sound"];if(e){var i=this["on"+t+"SoundMarker"];return e.play(i),!0}return!1},i.Button.prototype.setSounds=function(t,e,i,s,n,r,o,a){this.setStateSound("Over",t,e),this.setStateSound("Out",n,r),this.setStateSound("Down",i,s),this.setStateSound("Up",o,a)},i.Button.prototype.setOverSound=function(t,e){this.setStateSound("Over",t,e)},i.Button.prototype.setOutSound=function(t,e){this.setStateSound("Out",t,e)},i.Button.prototype.setDownSound=function(t,e){this.setStateSound("Down",t,e)},i.Button.prototype.setUpSound=function(t,e){this.setStateSound("Up",t,e)},i.Button.prototype.onInputOverHandler=function(t,e){e.justReleased()&&(this.justReleasedPreventsOver&e.pointerMode)===e.pointerMode||(this.changeStateFrame("Over"),this.onOverMouseOnly&&!e.isMouse||(this.playStateSound("Over"),this.onInputOver&&this.onInputOver.dispatch(this,e)))},i.Button.prototype.onInputOutHandler=function(t,e){this.changeStateFrame("Out"),this.playStateSound("Out"),this.onInputOut&&this.onInputOut.dispatch(this,e)},i.Button.prototype.onInputDownHandler=function(t,e){this.changeStateFrame("Down"),this.playStateSound("Down"),this.onInputDown&&this.onInputDown.dispatch(this,e)},i.Button.prototype.onInputUpHandler=function(t,e,i){this.playStateSound("Up"),this.onInputUp&&this.onInputUp.dispatch(this,e,i),this.freezeFrames||(!0===this.forceOut||(this.forceOut&e.pointerMode)===e.pointerMode?this.changeStateFrame("Out"):this.changeStateFrame("Up")||(i?this.changeStateFrame("Over"):this.changeStateFrame("Out")))},i.SpriteBatch=function(t,e,s,n){void 0!==e&&null!==e||(e=t.world),i.Group.call(this,t,e,s,n),this.type=i.SPRITEBATCH,this.fastSpriteBatch=null,this.ready=!1},i.SpriteBatch.prototype=Object.create(i.Group.prototype),i.SpriteBatch.prototype.constructor=i.SpriteBatch,i.SpriteBatch.prototype._renderWebGL=function(t){!this.visible||this.alpha<=0||!this.children.length||(this.ready||(this.fastSpriteBatch=new PIXI.WebGLFastSpriteBatch(t.gl),this.ready=!0),this.fastSpriteBatch.gl!==t.gl&&this.fastSpriteBatch.setContext(t.gl),t.spriteBatch.stop(),t.shaderManager.setShader(t.shaderManager.fastShader),this.fastSpriteBatch.begin(this,t),this.fastSpriteBatch.render(this),t.spriteBatch.start())},i.SpriteBatch.prototype._renderCanvas=function(t){if(this.visible&&!(this.alpha<=0)&&this.children.length){var e=t.context;e.globalAlpha=this.worldAlpha,this.displayObjectUpdateTransform();for(var i=this.worldTransform,s=!0,n=0;n<this.children.length;n++){var r=this.children[n];if(r.visible){var o=r.texture,a=o.frame;if(e.globalAlpha=this.worldAlpha*r.alpha,r.rotation%(2*Math.PI)==0)s&&(e.setTransform(i.a,i.b,i.c,i.d,i.tx,i.ty),s=!1),e.drawImage(o.baseTexture.source,a.x,a.y,a.width,a.height,r.anchor.x*(-a.width*r.scale.x)+r.position.x+.5+t.shakeX|0,r.anchor.y*(-a.height*r.scale.y)+r.position.y+.5+t.shakeY|0,a.width*r.scale.x,a.height*r.scale.y);else{s||(s=!0),r.displayObjectUpdateTransform();var h=r.worldTransform,u=h.tx*t.resolution+t.shakeX,l=h.ty*t.resolution+t.shakeY;t.roundPixels?e.setTransform(h.a,h.b,h.c,h.d,0|u,0|l):e.setTransform(h.a,h.b,h.c,h.d,u,l),e.drawImage(o.baseTexture.source,a.x,a.y,a.width,a.height,r.anchor.x*-a.width+.5|0,r.anchor.y*-a.height+.5|0,a.width,a.height)}}}}},i.BitmapData=function(t,e,s,n,r){void 0!==s&&0!==s||(s=256),void 0!==n&&0!==n||(n=256),void 0===r&&(r=!1),this.game=t,this.key=e,this.width=s,this.height=n,this.canvas=i.Canvas.create(this,s,n,null,r),this.context=this.canvas.getContext("2d",{alpha:!0}),this.ctx=this.context,this.smoothProperty=t.renderType===i.CANVAS?t.renderer.renderSession.smoothProperty:i.Canvas.getSmoothingPrefix(this.context),this.imageData=this.context.getImageData(0,0,s,n),this.data=null,this.imageData&&(this.data=this.imageData.data),this.pixels=null,this.data&&(this.imageData.data.buffer?(this.buffer=this.imageData.data.buffer,this.pixels=new Uint32Array(this.buffer)):window.ArrayBuffer?(this.buffer=new ArrayBuffer(this.imageData.data.length),this.pixels=new Uint32Array(this.buffer)):this.pixels=this.imageData.data),this.baseTexture=new PIXI.BaseTexture(this.canvas,null,this.game.resolution),this.texture=new PIXI.Texture(this.baseTexture),this.frameData=new i.FrameData,this.textureFrame=this.frameData.addFrame(new i.Frame(0,0,0,s,n,"bitmapData")),this.texture.frame=this.textureFrame,this.type=i.BITMAPDATA,this.disableTextureUpload=!1,this.dirty=!1,this.cls=this.clear,this._image=null,this._pos=new i.Point,this._size=new i.Point,this._scale=new i.Point,this._rotate=0,this._alpha={prev:1,current:1},this._anchor=new i.Point,this._tempR=0,this._tempG=0,this._tempB=0,this._circle=new i.Circle,this._swapCanvas=void 0},i.BitmapData.prototype={move:function(t,e,i){return 0!==t&&this.moveH(t,i),0!==e&&this.moveV(e,i),this},moveH:function(t,e){void 0===e&&(e=!0),void 0===this._swapCanvas&&(this._swapCanvas=i.CanvasPool.create(this,this.width,this.height));var s=this._swapCanvas.getContext("2d"),n=this.height,r=this.canvas;if(s.clearRect(0,0,this.width,this.height),t<0){t=Math.abs(t);o=this.width-t;e&&s.drawImage(r,0,0,t,n,o,0,t,n),s.drawImage(r,t,0,o,n,0,0,o,n)}else{var o=this.width-t;e&&s.drawImage(r,o,0,t,n,0,0,t,n),s.drawImage(r,0,0,o,n,t,0,o,n)}return this.clear(),this.copy(this._swapCanvas)},moveV:function(t,e){void 0===e&&(e=!0),void 0===this._swapCanvas&&(this._swapCanvas=i.CanvasPool.create(this,this.width,this.height));var s=this._swapCanvas.getContext("2d"),n=this.width,r=this.canvas;if(s.clearRect(0,0,this.width,this.height),t<0){t=Math.abs(t);o=this.height-t;e&&s.drawImage(r,0,0,n,t,0,o,n,t),s.drawImage(r,0,t,n,o,0,0,n,o)}else{var o=this.height-t;e&&s.drawImage(r,0,o,n,t,0,0,n,t),s.drawImage(r,0,0,n,o,0,t,n,o)}return this.clear(),this.copy(this._swapCanvas)},add:function(t){if(Array.isArray(t))for(var e=0;e<t.length;e++)t[e].loadTexture&&t[e].loadTexture(this);else t.loadTexture(this);return this},load:function(t){if("string"==typeof t&&(t=this.game.cache.getImage(t)),t)return this.resize(t.width,t.height),this.cls(),this.draw(t),this.update(),this},clear:function(t,e,i,s){return void 0===t&&(t=0),void 0===e&&(e=0),void 0===i&&(i=this.width),void 0===s&&(s=this.height),this.context.clearRect(t,e,i,s),this.dirty=!0,this},fill:function(t,e,i,s){return void 0===s&&(s=1),this.context.fillStyle="rgba("+t+","+e+","+i+","+s+")",this.context.fillRect(0,0,this.width,this.height),this.dirty=!0,this},generateTexture:function(t,e,i){var s=this.game.cache,n=new Image;if(e&&(n.onload=function(){var r=s.addImage(t,"",n),o=new PIXI.Texture(r.base);e.call(i||null,o),n.onload=null}),n.src=this.canvas.toDataURL("image/png"),!e){var r=s.addImage(t,"",n);return new PIXI.Texture(r.base)}return null},resize:function(t,e){return t===this.width&&e===this.height||(this.width=t,this.height=e,this.canvas.width=t,this.canvas.height=e,void 0!==this._swapCanvas&&(this._swapCanvas.width=t,this._swapCanvas.height=e),this.baseTexture.width=t,this.baseTexture.height=e,this.textureFrame.width=t,this.textureFrame.height=e,this.texture.width=t,this.texture.height=e,this.texture.crop.width=t,this.texture.crop.height=e,this.update(),this.dirty=!0),this},update:function(t,e,i,s){return void 0===t&&(t=0),void 0===e&&(e=0),void 0===i&&(i=Math.max(1,this.width)),void 0===s&&(s=Math.max(1,this.height)),this.imageData=this.context.getImageData(t,e,i,s),this.data=this.imageData.data,this.imageData.data.buffer?(this.buffer=this.imageData.data.buffer,this.pixels=new Uint32Array(this.buffer)):window.ArrayBuffer?(this.buffer=new ArrayBuffer(this.imageData.data.length),this.pixels=new Uint32Array(this.buffer)):this.pixels=this.imageData.data,this},processPixelRGB:function(t,e,s,n,r,o){void 0===s&&(s=0),void 0===n&&(n=0),void 0===r&&(r=this.width),void 0===o&&(o=this.height);for(var a=s+r,h=n+o,u=i.Color.createColor(),l={r:0,g:0,b:0,a:0},c=!1,d=n;d<h;d++)for(var p=s;p<a;p++)i.Color.unpackPixel(this.getPixel32(p,d),u),!1!==(l=t.call(e,u,p,d))&&null!==l&&void 0!==l&&(this.setPixel32(p,d,l.r,l.g,l.b,l.a,!1),c=!0);return c&&(this.context.putImageData(this.imageData,0,0),this.dirty=!0),this},processPixel:function(t,e,i,s,n,r){void 0===i&&(i=0),void 0===s&&(s=0),void 0===n&&(n=this.width),void 0===r&&(r=this.height);for(var o=i+n,a=s+r,h=0,u=0,l=!1,c=s;c<a;c++)for(var d=i;d<o;d++)h=this.getPixel32(d,c),(u=t.call(e,h,d,c))!==h&&(this.pixels[c*this.width+d]=u,l=!0);return l&&(this.context.putImageData(this.imageData,0,0),this.dirty=!0),this},replaceRGB:function(t,e,s,n,r,o,a,h,u){var l=0,c=0,d=this.width,p=this.height,f=i.Color.packPixel(t,e,s,n);void 0!==u&&u instanceof i.Rectangle&&(l=u.x,c=u.y,d=u.width,p=u.height);for(var g=0;g<p;g++)for(var m=0;m<d;m++)this.getPixel32(l+m,c+g)===f&&this.setPixel32(l+m,c+g,r,o,a,h,!1);return this.context.putImageData(this.imageData,0,0),this.dirty=!0,this},setHSL:function(t,e,s,n){var r=t||0===t,o=e||0===e,a=s||0===s;if(r||o||a){void 0===n&&(n=new i.Rectangle(0,0,this.width,this.height));for(var h=i.Color.createColor(),u=n.y;u<n.bottom;u++)for(var l=n.x;l<n.right;l++)i.Color.unpackPixel(this.getPixel32(l,u),h,!0),r&&(h.h=t),o&&(h.s=e),a&&(h.l=s),i.Color.HSLtoRGB(h.h,h.s,h.l,h),this.setPixel32(l,u,h.r,h.g,h.b,h.a,!1);return this.context.putImageData(this.imageData,0,0),this.dirty=!0,this}},shiftHSL:function(t,e,s,n){if(void 0!==t&&null!==t||(t=!1),void 0!==e&&null!==e||(e=!1),void 0!==s&&null!==s||(s=!1),t||e||s){void 0===n&&(n=new i.Rectangle(0,0,this.width,this.height));for(var r=i.Color.createColor(),o=n.y;o<n.bottom;o++)for(var a=n.x;a<n.right;a++)i.Color.unpackPixel(this.getPixel32(a,o),r,!0),t&&(r.h=this.game.math.wrap(r.h+t,0,1)),e&&(r.s=this.game.math.clamp(r.s+e,0,1)),s&&(r.l=this.game.math.clamp(r.l+s,0,1)),i.Color.HSLtoRGB(r.h,r.s,r.l,r),this.setPixel32(a,o,r.r,r.g,r.b,r.a,!1);return this.context.putImageData(this.imageData,0,0),this.dirty=!0,this}},setPixel32:function(t,e,s,n,r,o,a){return void 0===a&&(a=!0),t>=0&&t<=this.width&&e>=0&&e<=this.height&&(i.Device.LITTLE_ENDIAN?this.pixels[e*this.width+t]=o<<24|r<<16|n<<8|s:this.pixels[e*this.width+t]=s<<24|n<<16|r<<8|o,a&&(this.context.putImageData(this.imageData,0,0),this.dirty=!0)),this},setPixel:function(t,e,i,s,n,r){return this.setPixel32(t,e,i,s,n,255,r)},getPixel:function(t,e,s){s||(s=i.Color.createColor());var n=~~(t+e*this.width);return n*=4,s.r=this.data[n],s.g=this.data[++n],s.b=this.data[++n],s.a=this.data[++n],s},getPixel32:function(t,e){if(t>=0&&t<=this.width&&e>=0&&e<=this.height)return this.pixels[e*this.width+t]},getPixelRGB:function(t,e,s,n,r){return i.Color.unpackPixel(this.getPixel32(t,e),s,n,r)},getPixels:function(t){return this.context.getImageData(t.x,t.y,t.width,t.height)},getFirstPixel:function(t){void 0===t&&(t=0);var e=i.Color.createColor(),s=0,n=0,r=1,o=!1;1===t?(r=-1,n=this.height):3===t&&(r=-1,s=this.width);do{i.Color.unpackPixel(this.getPixel32(s,n),e),0===t||1===t?++s===this.width&&(s=0,((n+=r)>=this.height||n<=0)&&(o=!0)):2!==t&&3!==t||++n===this.height&&(n=0,((s+=r)>=this.width||s<=0)&&(o=!0))}while(0===e.a&&!o);return e.x=s,e.y=n,e},getBounds:function(t){return void 0===t&&(t=new i.Rectangle),t.x=this.getFirstPixel(2).x,t.x===this.width?t.setTo(0,0,0,0):(t.y=this.getFirstPixel(0).y,t.width=this.getFirstPixel(3).x-t.x+1,t.height=this.getFirstPixel(1).y-t.y+1,t)},addToWorld:function(t,e,i,s,n,r){n=n||1,r=r||1;var o=this.game.add.image(t,e,this);return o.anchor.set(i,s),o.scale.set(n,r),o},copy:function(t,e,s,n,r,o,a,h,u,l,c,d,p,f,g,m,y){if(void 0!==t&&null!==t||(t=this),t instanceof i.RenderTexture&&(t=t.getCanvas()),this._image=t,t instanceof i.Sprite||t instanceof i.Image||t instanceof i.Text||t instanceof PIXI.Sprite)this._pos.set(t.texture.crop.x,t.texture.crop.y),this._size.set(t.texture.crop.width,t.texture.crop.height),this._scale.set(t.scale.x,t.scale.y),this._anchor.set(t.anchor.x,t.anchor.y),this._rotate=t.rotation,this._alpha.current=t.alpha,t.texture instanceof i.RenderTexture?this._image=t.texture.getCanvas():this._image=t.texture.baseTexture.source,void 0!==o&&null!==o||(o=t.x),void 0!==a&&null!==a||(a=t.y),t.texture.trim&&(o+=t.texture.trim.x-t.anchor.x*t.texture.trim.width,a+=t.texture.trim.y-t.anchor.y*t.texture.trim.height),16777215!==t.tint&&(t.cachedTint!==t.tint&&(t.cachedTint=t.tint,t.tintedTexture=PIXI.CanvasTinter.getTintedTexture(t,t.tint)),this._image=t.tintedTexture,this._pos.set(0));else{if(this._pos.set(0),this._scale.set(1),this._anchor.set(0),this._rotate=0,this._alpha.current=1,t instanceof i.BitmapData)this._image=t.canvas;else if("string"==typeof t){if(null===(t=this.game.cache.getImage(t)))return;this._image=t}this._size.set(this._image.width,this._image.height)}if(void 0!==e&&null!==e||(e=0),void 0!==s&&null!==s||(s=0),n&&(this._size.x=n),r&&(this._size.y=r),void 0!==o&&null!==o||(o=e),void 0!==a&&null!==a||(a=s),void 0!==h&&null!==h||(h=this._size.x),void 0!==u&&null!==u||(u=this._size.y),"number"==typeof l&&(this._rotate=l),"number"==typeof c&&(this._anchor.x=c),"number"==typeof d&&(this._anchor.y=d),"number"==typeof p&&(this._scale.x=p),"number"==typeof f&&(this._scale.y=f),"number"==typeof g&&(this._alpha.current=g),void 0===m&&(m=null),void 0===y&&(y=!1),!(this._alpha.current<=0||0===this._scale.x||0===this._scale.y||0===this._size.x||0===this._size.y)){var v=this.context;return this._alpha.prev=v.globalAlpha,v.save(),v.globalAlpha=this._alpha.current,m&&(this.op=m),y&&(o|=0,a|=0),v.translate(o,a),v.scale(this._scale.x,this._scale.y),v.rotate(this._rotate),v.drawImage(this._image,this._pos.x+e,this._pos.y+s,this._size.x,this._size.y,-h*this._anchor.x,-u*this._anchor.y,h,u),v.restore(),v.globalAlpha=this._alpha.prev,this.dirty=!0,this}},copyTransform:function(t,e,s){if(void 0===e&&(e=null),void 0===s&&(s=!1),!t.hasOwnProperty("worldTransform")||!t.worldVisible||0===t.worldAlpha)return this;var n=t.worldTransform;if(this._pos.set(t.texture.crop.x,t.texture.crop.y),this._size.set(t.texture.crop.width,t.texture.crop.height),0===n.a||0===n.d||0===this._size.x||0===this._size.y)return this;t.texture instanceof i.RenderTexture?this._image=t.texture.getCanvas():this._image=t.texture.baseTexture.source;var r=n.tx,o=n.ty;t.texture.trim&&(r+=t.texture.trim.x-t.anchor.x*t.texture.trim.width,o+=t.texture.trim.y-t.anchor.y*t.texture.trim.height),16777215!==t.tint&&(t.cachedTint!==t.tint&&(t.cachedTint=t.tint,t.tintedTexture=PIXI.CanvasTinter.getTintedTexture(t,t.tint)),this._image=t.tintedTexture,this._pos.set(0)),s&&(r|=0,o|=0);var a=this.context;return this._alpha.prev=a.globalAlpha,a.save(),a.globalAlpha=this._alpha.current,e&&(this.op=e),a[this.smoothProperty]=t.texture.baseTexture.scaleMode===PIXI.scaleModes.LINEAR,a.setTransform(n.a,n.b,n.c,n.d,r,o),a.drawImage(this._image,this._pos.x,this._pos.y,this._size.x,this._size.y,-this._size.x*t.anchor.x,-this._size.y*t.anchor.y,this._size.x,this._size.y),a.restore(),a.globalAlpha=this._alpha.prev,this.dirty=!0,this},copyRect:function(t,e,i,s,n,r,o){return this.copy(t,e.x,e.y,e.width,e.height,i,s,e.width,e.height,0,0,0,1,1,n,r,o)},draw:function(t,e,i,s,n,r,o){return this.copy(t,null,null,null,null,e,i,s,n,null,null,null,null,null,null,r,o)},drawGroup:function(t,e,i){return t.total>0&&t.forEachExists(this.drawGroupProxy,this,e,i),this},drawGroupProxy:function(t,e,s){if(t.hasOwnProperty("texture")&&this.copyTransform(t,e,s),t.type===i.GROUP&&t.exists)this.drawGroup(t,e,s);else if(t.hasOwnProperty("children")&&t.children.length>0)for(var n=0;n<t.children.length;n++)t.children[n].exists&&this.copyTransform(t.children[n],e,s)},drawFull:function(t,e,s){if(!1===t.worldVisible||0===t.worldAlpha||t.hasOwnProperty("exists")&&!1===t.exists)return this;if(t.type!==i.GROUP&&t.type!==i.EMITTER&&t.type!==i.BITMAPTEXT)if(t.type===i.GRAPHICS){var n=t.getBounds();this.ctx.save(),this.ctx.translate(n.x,n.y),PIXI.CanvasGraphics.renderGraphics(t,this.ctx),this.ctx.restore()}else this.copy(t,null,null,null,null,t.worldPosition.x,t.worldPosition.y,null,null,t.worldRotation,null,null,t.worldScale.x,t.worldScale.y,t.worldAlpha,e,s);if(t.children)for(var r=0;r<t.children.length;r++)this.drawFull(t.children[r],e,s);return this},shadow:function(t,e,i,s){var n=this.context;return void 0===t||null===t?n.shadowColor="rgba(0,0,0,0)":(n.shadowColor=t,n.shadowBlur=e||5,n.shadowOffsetX=i||10,n.shadowOffsetY=s||10),this},alphaMask:function(t,e,i,s){return void 0===s||null===s?this.draw(e).blendSourceAtop():this.draw(e,s.x,s.y,s.width,s.height).blendSourceAtop(),void 0===i||null===i?this.draw(t).blendReset():this.draw(t,i.x,i.y,i.width,i.height).blendReset(),this},extract:function(t,e,i,s,n,r,o,a,h){return void 0===n&&(n=255),void 0===r&&(r=!1),void 0===o&&(o=e),void 0===a&&(a=i),void 0===h&&(h=s),r&&t.resize(this.width,this.height),this.processPixelRGB(function(r,u,l){return r.r===e&&r.g===i&&r.b===s&&t.setPixel32(u,l,o,a,h,n,!1),!1},this),t.context.putImageData(t.imageData,0,0),t.dirty=!0,t},rect:function(t,e,i,s,n){return void 0!==n&&(this.context.fillStyle=n),this.context.fillRect(t,e,i,s),this},text:function(t,e,i,s,n,r){void 0===e&&(e=0),void 0===i&&(i=0),void 0===s&&(s="14px Courier"),void 0===n&&(n="rgb(255,255,255)"),void 0===r&&(r=!0);var o=this.context,a=o.font;return o.font=s,r&&(o.fillStyle="rgb(0,0,0)",o.fillText(t,e+1,i+1)),o.fillStyle=n,o.fillText(t,e,i),o.font=a,this},circle:function(t,e,i,s){var n=this.context;return void 0!==s&&(n.fillStyle=s),n.beginPath(),n.arc(t,e,i,0,2*Math.PI,!1),n.closePath(),n.fill(),this},line:function(t,e,i,s,n,r){void 0===n&&(n="#fff"),void 0===r&&(r=1);var o=this.context;return o.beginPath(),o.moveTo(t,e),o.lineTo(i,s),o.lineWidth=r,o.strokeStyle=n,o.stroke(),o.closePath(),this},polygon:function(t,e,i,s){void 0===s&&(s="#fff"),void 0===i&&(i=0);var n=this.context;e&&(n.fillStyle=e),i&&(n.lineWidth=i,n.strokeStyle=s),n.beginPath(),n.moveTo(t[0].x,t[0].y);for(var r=1,o=t.length;r<o;r++){var a=t[r];n.lineTo(a.x,a.y)}return n.closePath(),e&&n.fill(),i&&n.stroke(),this},textureLine:function(t,e,s){if(void 0===s&&(s="repeat-x"),"string"!=typeof e||(e=this.game.cache.getImage(e))){var n=t.length;"no-repeat"===s&&n>e.width&&(n=e.width);var r=this.context;return r.fillStyle=r.createPattern(e,s),this._circle=new i.Circle(t.start.x,t.start.y,e.height),this._circle.circumferencePoint(t.angle-1.5707963267948966,!1,this._pos),r.save(),r.translate(this._pos.x,this._pos.y),r.rotate(t.angle),r.fillRect(0,0,n,e.height),r.restore(),this.dirty=!0,this}},render:function(){return!this.disableTextureUpload&&this.dirty&&(this.baseTexture.dirty(),this.dirty=!1),this},destroy:function(){this.frameData.destroy(),this.texture.destroy(!0),i.CanvasPool.remove(this)},blendReset:function(){return this.op="source-over",this},blendSourceOver:function(){return this.op="source-over",this},blendSourceIn:function(){return this.op="source-in",this},blendSourceOut:function(){return this.op="source-out",this},blendSourceAtop:function(){return this.op="source-atop",this},blendDestinationOver:function(){return this.op="destination-over",this},blendDestinationIn:function(){return this.op="destination-in",this},blendDestinationOut:function(){return this.op="destination-out",this},blendDestinationAtop:function(){return this.op="destination-atop",this},blendXor:function(){return this.op="xor",this},blendAdd:function(){return this.op="lighter",this},blendMultiply:function(){return this.op="multiply",this},blendScreen:function(){return this.op="screen",this},blendOverlay:function(){return this.op="overlay",this},blendDarken:function(){return this.op="darken",this},blendLighten:function(){return this.op="lighten",this},blendColorDodge:function(){return this.op="color-dodge",this},blendColorBurn:function(){return this.op="color-burn",this},blendHardLight:function(){return this.op="hard-light",this},blendSoftLight:function(){return this.op="soft-light",this},blendDifference:function(){return this.op="difference",this},blendExclusion:function(){return this.op="exclusion",this},blendHue:function(){return this.op="hue",this},blendSaturation:function(){return this.op="saturation",this},blendColor:function(){return this.op="color",this},blendLuminosity:function(){return this.op="luminosity",this},copyBitmapData:function(t,e,i){t.update();for(var s,n=0;n<t.height;n++){s=(i+n)*this.width+e;for(var r=0;r<t.width;r++)this.pixels[s+r]=t.pixels[n*t.width+r]}return this}},Object.defineProperty(i.BitmapData.prototype,"smoothed",{get:function(){i.Canvas.getSmoothingEnabled(this.context)},set:function(t){i.Canvas.setSmoothingEnabled(this.context,t)}}),Object.defineProperty(i.BitmapData.prototype,"op",{get:function(){return this.context.globalCompositeOperation},set:function(t){this.context.globalCompositeOperation=t}}),i.BitmapData.getTransform=function(t,e,i,s,n,r){return"number"!=typeof t&&(t=0),"number"!=typeof e&&(e=0),"number"!=typeof i&&(i=1),"number"!=typeof s&&(s=1),"number"!=typeof n&&(n=0),"number"!=typeof r&&(r=0),{sx:i,sy:s,scaleX:i,scaleY:s,skewX:n,skewY:r,translateX:t,translateY:e,tx:t,ty:e}},i.BitmapData.prototype.constructor=i.BitmapData,i.EarCut={},i.EarCut.Triangulate=function(t,e,s){s=s||2;var n=e&&e.length,r=n?e[0]*s:t.length,o=i.EarCut.linkedList(t,0,r,s,!0),a=[];if(!o)return a;var h,u,l,c,d,p,f;if(n&&(o=i.EarCut.eliminateHoles(t,e,o,s)),t.length>80*s){h=l=t[0],u=c=t[1];for(var g=s;g<r;g+=s)d=t[g],p=t[g+1],d<h&&(h=d),p<u&&(u=p),d>l&&(l=d),p>c&&(c=p);f=Math.max(l-h,c-u)}return i.EarCut.earcutLinked(o,a,s,h,u,f),a},i.EarCut.linkedList=function(t,e,s,n,r){var o,a,h,u=0;for(o=e,a=s-n;o<s;o+=n)u+=(t[a]-t[o])*(t[o+1]+t[a+1]),a=o;if(r===u>0)for(o=e;o<s;o+=n)h=i.EarCut.insertNode(o,t[o],t[o+1],h);else for(o=s-n;o>=e;o-=n)h=i.EarCut.insertNode(o,t[o],t[o+1],h);return h},i.EarCut.filterPoints=function(t,e){if(!t)return t;e||(e=t);var s,n=t;do{if(s=!1,n.steiner||!i.EarCut.equals(n,n.next)&&0!==i.EarCut.area(n.prev,n,n.next))n=n.next;else{if(i.EarCut.removeNode(n),(n=e=n.prev)===n.next)return null;s=!0}}while(s||n!==e);return e},i.EarCut.earcutLinked=function(t,e,s,n,r,o,a){if(t){!a&&o&&i.EarCut.indexCurve(t,n,r,o);for(var h,u,l=t;t.prev!==t.next;)if(h=t.prev,u=t.next,o?i.EarCut.isEarHashed(t,n,r,o):i.EarCut.isEar(t))e.push(h.i/s),e.push(t.i/s),e.push(u.i/s),i.EarCut.removeNode(t),t=u.next,l=u.next;else if((t=u)===l){a?1===a?(t=i.EarCut.cureLocalIntersections(t,e,s),i.EarCut.earcutLinked(t,e,s,n,r,o,2)):2===a&&i.EarCut.splitEarcut(t,e,s,n,r,o):i.EarCut.earcutLinked(i.EarCut.filterPoints(t),e,s,n,r,o,1);break}}},i.EarCut.isEar=function(t){var e=t.prev,s=t,n=t.next;if(i.EarCut.area(e,s,n)>=0)return!1;for(var r=t.next.next;r!==t.prev;){if(i.EarCut.pointInTriangle(e.x,e.y,s.x,s.y,n.x,n.y,r.x,r.y)&&i.EarCut.area(r.prev,r,r.next)>=0)return!1;r=r.next}return!0},i.EarCut.isEarHashed=function(t,e,s,n){var r=t.prev,o=t,a=t.next;if(i.EarCut.area(r,o,a)>=0)return!1;for(var h=r.x<o.x?r.x<a.x?r.x:a.x:o.x<a.x?o.x:a.x,u=r.y<o.y?r.y<a.y?r.y:a.y:o.y<a.y?o.y:a.y,l=r.x>o.x?r.x>a.x?r.x:a.x:o.x>a.x?o.x:a.x,c=r.y>o.y?r.y>a.y?r.y:a.y:o.y>a.y?o.y:a.y,d=i.EarCut.zOrder(h,u,e,s,n),p=i.EarCut.zOrder(l,c,e,s,n),f=t.nextZ;f&&f.z<=p;){if(f!==t.prev&&f!==t.next&&i.EarCut.pointInTriangle(r.x,r.y,o.x,o.y,a.x,a.y,f.x,f.y)&&i.EarCut.area(f.prev,f,f.next)>=0)return!1;f=f.nextZ}for(f=t.prevZ;f&&f.z>=d;){if(f!==t.prev&&f!==t.next&&i.EarCut.pointInTriangle(r.x,r.y,o.x,o.y,a.x,a.y,f.x,f.y)&&i.EarCut.area(f.prev,f,f.next)>=0)return!1;f=f.prevZ}return!0},i.EarCut.cureLocalIntersections=function(t,e,s){var n=t;do{var r=n.prev,o=n.next.next;i.EarCut.intersects(r,n,n.next,o)&&i.EarCut.locallyInside(r,o)&&i.EarCut.locallyInside(o,r)&&(e.push(r.i/s),e.push(n.i/s),e.push(o.i/s),i.EarCut.removeNode(n),i.EarCut.removeNode(n.next),n=t=o),n=n.next}while(n!==t);return n},i.EarCut.splitEarcut=function(t,e,s,n,r,o){var a=t;do{for(var h=a.next.next;h!==a.prev;){if(a.i!==h.i&&i.EarCut.isValidDiagonal(a,h)){var u=i.EarCut.splitPolygon(a,h);return a=i.EarCut.filterPoints(a,a.next),u=i.EarCut.filterPoints(u,u.next),i.EarCut.earcutLinked(a,e,s,n,r,o),void i.EarCut.earcutLinked(u,e,s,n,r,o)}h=h.next}a=a.next}while(a!==t)},i.EarCut.eliminateHoles=function(t,e,s,n){var r,o,a,h,u,l=[];for(r=0,o=e.length;r<o;r++)a=e[r]*n,h=r<o-1?e[r+1]*n:t.length,(u=i.EarCut.linkedList(t,a,h,n,!1))===u.next&&(u.steiner=!0),l.push(i.EarCut.getLeftmost(u));for(l.sort(compareX),r=0;r<l.length;r++)i.EarCut.eliminateHole(l[r],s),s=i.EarCut.filterPoints(s,s.next);return s},i.EarCut.compareX=function(t,e){return t.x-e.x},i.EarCut.eliminateHole=function(t,e){if(e=i.EarCut.findHoleBridge(t,e)){var s=i.EarCut.splitPolygon(e,t);i.EarCut.filterPoints(s,s.next)}},i.EarCut.findHoleBridge=function(t,e){var s,n=e,r=t.x,o=t.y,a=-1/0;do{if(o<=n.y&&o>=n.next.y){var h=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);h<=r&&h>a&&(a=h,s=n.x<n.next.x?n:n.next)}n=n.next}while(n!==e);if(!s)return null;if(t.x===s.x)return s.prev;var u,l=s,c=1/0;for(n=s.next;n!==l;)r>=n.x&&n.x>=s.x&&i.EarCut.pointInTriangle(o<s.y?r:a,o,s.x,s.y,o<s.y?a:r,o,n.x,n.y)&&((u=Math.abs(o-n.y)/(r-n.x))<c||u===c&&n.x>s.x)&&i.EarCut.locallyInside(n,t)&&(s=n,c=u),n=n.next;return s},i.EarCut.indexCurve=function(t,e,s,n){var r=t;do{null===r.z&&(r.z=i.EarCut.zOrder(r.x,r.y,e,s,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next}while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,i.EarCut.sortLinked(r)},i.EarCut.sortLinked=function(t){var e,i,s,n,r,o,a,h,u=1;do{for(i=t,t=null,r=null,o=0;i;){for(o++,s=i,a=0,e=0;e<u&&(a++,s=s.nextZ);e++);for(h=u;a>0||h>0&&s;)0===a?(n=s,s=s.nextZ,h--):0!==h&&s?i.z<=s.z?(n=i,i=i.nextZ,a--):(n=s,s=s.nextZ,h--):(n=i,i=i.nextZ,a--),r?r.nextZ=n:t=n,n.prevZ=r,r=n;i=s}r.nextZ=null,u*=2}while(o>1);return t},i.EarCut.zOrder=function(t,e,i,s,n){return t=32767*(t-i)/n,e=32767*(e-s)/n,t=16711935&(t|t<<8),t=252645135&(t|t<<4),t=858993459&(t|t<<2),t=1431655765&(t|t<<1),e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),t|e<<1},i.EarCut.getLeftmost=function(t){var e=t,i=t;do{e.x<i.x&&(i=e),e=e.next}while(e!==t);return i},i.EarCut.pointInTriangle=function(t,e,i,s,n,r,o,a){return(n-o)*(e-a)-(t-o)*(r-a)>=0&&(t-o)*(s-a)-(i-o)*(e-a)>=0&&(i-o)*(r-a)-(n-o)*(s-a)>=0},i.EarCut.isValidDiagonal=function(t,e){return i.EarCut.equals(t,e)||t.next.i!==e.i&&t.prev.i!==e.i&&!i.EarCut.intersectsPolygon(t,e)&&i.EarCut.locallyInside(t,e)&&i.EarCut.locallyInside(e,t)&&i.EarCut.middleInside(t,e)},i.EarCut.area=function(t,e,i){return(e.y-t.y)*(i.x-e.x)-(e.x-t.x)*(i.y-e.y)},i.EarCut.equals=function(t,e){return t.x===e.x&&t.y===e.y},i.EarCut.intersects=function(t,e,s,n){return i.EarCut.area(t,e,s)>0!=i.EarCut.area(t,e,n)>0&&i.EarCut.area(s,n,t)>0!=i.EarCut.area(s,n,e)>0},i.EarCut.intersectsPolygon=function(t,e){var s=t;do{if(s.i!==t.i&&s.next.i!==t.i&&s.i!==e.i&&s.next.i!==e.i&&i.EarCut.intersects(s,s.next,t,e))return!0;s=s.next}while(s!==t);return!1},i.EarCut.locallyInside=function(t,e){return i.EarCut.area(t.prev,t,t.next)<0?i.EarCut.area(t,e,t.next)>=0&&i.EarCut.area(t,t.prev,e)>=0:i.EarCut.area(t,e,t.prev)<0||i.EarCut.area(t,t.next,e)<0},i.EarCut.middleInside=function(t,e){var i=t,s=!1,n=(t.x+e.x)/2,r=(t.y+e.y)/2;do{i.y>r!=i.next.y>r&&n<(i.next.x-i.x)*(r-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next}while(i!==t);return s},i.EarCut.splitPolygon=function(t,e){var s=new i.EarCut.Node(t.i,t.x,t.y),n=new i.EarCut.Node(e.i,e.x,e.y),r=t.next,o=e.prev;return t.next=e,e.prev=t,s.next=r,r.prev=s,n.next=s,s.prev=n,o.next=n,n.prev=o,n},i.EarCut.insertNode=function(t,e,s,n){var r=new i.EarCut.Node(t,e,s);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r},i.EarCut.removeNode=function(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)},i.EarCut.Node=function(t,e,i){this.i=t,this.x=e,this.y=i,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1},PIXI.WebGLGraphics=function(){},PIXI.WebGLGraphics.stencilBufferLimit=6,PIXI.WebGLGraphics.renderGraphics=function(t,e){var s,n=e.gl,r=e.projection,o=e.offset,a=e.shaderManager.primitiveShader;t.dirty&&PIXI.WebGLGraphics.updateGraphics(t,n);var h=t._webGL[n.id];if(h)for(var u=0;u<h.data.length;u++)1===h.data[u].mode?(s=h.data[u],e.stencilManager.pushStencil(t,s,e),n.drawElements(n.TRIANGLE_FAN,4,n.UNSIGNED_SHORT,2*(s.indices.length-4)),e.stencilManager.popStencil(t,s,e)):(s=h.data[u],e.shaderManager.setShader(a),a=e.shaderManager.primitiveShader,n.uniformMatrix3fv(a.translationMatrix,!1,t.worldTransform.toArray(!0)),n.uniform1f(a.flipY,1),n.uniform2f(a.projectionVector,r.x,-r.y),n.uniform2f(a.offsetVector,-o.x,-o.y),n.uniform3fv(a.tintColor,i.Color.hexToRGBArray(t.tint)),n.uniform1f(a.alpha,t.worldAlpha),n.bindBuffer(n.ARRAY_BUFFER,s.buffer),n.vertexAttribPointer(a.aVertexPosition,2,n.FLOAT,!1,24,0),n.vertexAttribPointer(a.colorAttribute,4,n.FLOAT,!1,24,8),n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,s.indexBuffer),n.drawElements(n.TRIANGLE_STRIP,s.indices.length,n.UNSIGNED_SHORT,0))},PIXI.WebGLGraphics.updateGraphics=function(t,e){var s=t._webGL[e.id];s||(s=t._webGL[e.id]={lastIndex:0,data:[],gl:e}),t.dirty=!1;var n;if(t.clearDirty){for(t.clearDirty=!1,n=0;n<s.data.length;n++){var r=s.data[n];r.reset(),PIXI.WebGLGraphics.graphicsDataPool.push(r)}s.data=[],s.lastIndex=0}var o;for(n=s.lastIndex;n<t.graphicsData.length;n++){var a=t.graphicsData[n];a.type===i.POLYGON?(a.points=a.shape.points.slice(),a.shape.closed&&(a.points[0]===a.points[a.points.length-2]&&a.points[1]===a.points[a.points.length-1]||a.points.push(a.points[0],a.points[1])),a.fill&&a.points.length>=PIXI.WebGLGraphics.stencilBufferLimit&&(a.points.length<2*PIXI.WebGLGraphics.stencilBufferLimit?(o=PIXI.WebGLGraphics.switchMode(s,0),PIXI.WebGLGraphics.buildPoly(a,o)||(o=PIXI.WebGLGraphics.switchMode(s,1),PIXI.WebGLGraphics.buildComplexPoly(a,o))):(o=PIXI.WebGLGraphics.switchMode(s,1),PIXI.WebGLGraphics.buildComplexPoly(a,o))),a.lineWidth>0&&(o=PIXI.WebGLGraphics.switchMode(s,0),PIXI.WebGLGraphics.buildLine(a,o))):(o=PIXI.WebGLGraphics.switchMode(s,0),a.type===i.RECTANGLE?PIXI.WebGLGraphics.buildRectangle(a,o):a.type===i.CIRCLE||a.type===i.ELLIPSE?PIXI.WebGLGraphics.buildCircle(a,o):a.type===i.ROUNDEDRECTANGLE&&PIXI.WebGLGraphics.buildRoundedRectangle(a,o)),s.lastIndex++}for(n=0;n<s.data.length;n++)(o=s.data[n]).dirty&&o.upload()},PIXI.WebGLGraphics.switchMode=function(t,e){var i;return t.data.length?(i=t.data[t.data.length-1]).mode===e&&1!==e||((i=PIXI.WebGLGraphics.graphicsDataPool.pop()||new PIXI.WebGLGraphicsData(t.gl)).mode=e,t.data.push(i)):((i=PIXI.WebGLGraphics.graphicsDataPool.pop()||new PIXI.WebGLGraphicsData(t.gl)).mode=e,t.data.push(i)),i.dirty=!0,i},PIXI.WebGLGraphics.buildRectangle=function(t,e){var s=t.shape,n=s.x,r=s.y,o=s.width,a=s.height;if(t.fill){var h=i.Color.hexToRGBArray(t.fillColor),u=t.fillAlpha,l=h[0]*u,c=h[1]*u,d=h[2]*u,p=e.points,f=e.indices,g=p.length/6;p.push(n,r),p.push(l,c,d,u),p.push(n+o,r),p.push(l,c,d,u),p.push(n,r+a),p.push(l,c,d,u),p.push(n+o,r+a),p.push(l,c,d,u),f.push(g,g,g+1,g+2,g+3,g+3)}if(t.lineWidth){var m=t.points;t.points=[n,r,n+o,r,n+o,r+a,n,r+a,n,r],PIXI.WebGLGraphics.buildLine(t,e),t.points=m}},PIXI.WebGLGraphics.buildRoundedRectangle=function(t,e){var s=t.shape,n=s.x,r=s.y,o=s.width,a=s.height,h=s.radius,u=[];if(u.push(n,r+h),u=u.concat(PIXI.WebGLGraphics.quadraticBezierCurve(n,r+a-h,n,r+a,n+h,r+a)),u=u.concat(PIXI.WebGLGraphics.quadraticBezierCurve(n+o-h,r+a,n+o,r+a,n+o,r+a-h)),u=u.concat(PIXI.WebGLGraphics.quadraticBezierCurve(n+o,r+h,n+o,r,n+o-h,r)),u=u.concat(PIXI.WebGLGraphics.quadraticBezierCurve(n+h,r,n,r,n,r+h)),t.fill){var l=i.Color.hexToRGBArray(t.fillColor),c=t.fillAlpha,d=l[0]*c,p=l[1]*c,f=l[2]*c,g=e.points,m=e.indices,y=g.length/6,v=i.EarCut.Triangulate(u,null,2),x=0;for(x=0;x<v.length;x+=3)m.push(v[x]+y),m.push(v[x]+y),m.push(v[x+1]+y),m.push(v[x+2]+y),m.push(v[x+2]+y);for(x=0;x<u.length;x++)g.push(u[x],u[++x],d,p,f,c)}if(t.lineWidth){var _=t.points;t.points=u,PIXI.WebGLGraphics.buildLine(t,e),t.points=_}},PIXI.WebGLGraphics.quadraticBezierCurve=function(t,e,i,s,n,r){function o(t,e,i){return t+(e-t)*i}for(var a,h,u,l,c,d,p=[],f=0,g=0;g<=20;g++)a=o(t,i,f=g/20),h=o(e,s,f),u=o(i,n,f),l=o(s,r,f),c=o(a,u,f),d=o(h,l,f),p.push(c,d);return p},PIXI.WebGLGraphics.buildCircle=function(t,e){var s,n,r=t.shape,o=r.x,a=r.y;t.type===i.CIRCLE?(s=r.radius,n=r.radius):(s=r.width,n=r.height);var h=2*Math.PI/40,u=0;if(t.fill){var l=i.Color.hexToRGBArray(t.fillColor),c=t.fillAlpha,d=l[0]*c,p=l[1]*c,f=l[2]*c,g=e.points,m=e.indices,y=g.length/6;for(m.push(y),u=0;u<41;u++)g.push(o,a,d,p,f,c),g.push(o+Math.sin(h*u)*s,a+Math.cos(h*u)*n,d,p,f,c),m.push(y++,y++);m.push(y-1)}if(t.lineWidth){var v=t.points;for(t.points=[],u=0;u<41;u++)t.points.push(o+Math.sin(h*u)*s,a+Math.cos(h*u)*n);PIXI.WebGLGraphics.buildLine(t,e),t.points=v}},PIXI.WebGLGraphics.buildLine=function(t,e){var s=0,n=t.points;if(0!==n.length){if(t.lineWidth%2)for(s=0;s<n.length;s++)n[s]+=.5;var r=new PIXI.Point(n[0],n[1]),o=new PIXI.Point(n[n.length-2],n[n.length-1]);if(r.x===o.x&&r.y===o.y){(n=n.slice()).pop(),n.pop();var a=(o=new PIXI.Point(n[n.length-2],n[n.length-1])).x+.5*(r.x-o.x),h=o.y+.5*(r.y-o.y);n.unshift(a,h),n.push(a,h)}var u,l,c,d,p,f,g,m,y,v,x,_,b,T,w,C,S,P,E,A,R,M,I=e.points,L=e.indices,O=n.length/2,k=n.length,D=I.length/6,F=t.lineWidth/2,B=i.Color.hexToRGBArray(t.lineColor),U=t.lineAlpha,G=B[0]*U,N=B[1]*U,X=B[2]*U;for(c=n[0],d=n[1],p=n[2],y=-(d-(f=n[3])),v=c-p,y/=M=Math.sqrt(y*y+v*v),v/=M,y*=F,v*=F,I.push(c-y,d-v,G,N,X,U),I.push(c+y,d+v,G,N,X,U),s=1;s<O-1;s++)c=n[2*(s-1)],d=n[2*(s-1)+1],p=n[2*s],f=n[2*s+1],g=n[2*(s+1)],m=n[2*(s+1)+1],y=-(d-f),v=c-p,y/=M=Math.sqrt(y*y+v*v),v/=M,y*=F,v*=F,x=-(f-m),_=p-g,x/=M=Math.sqrt(x*x+_*_),_/=M,S=(-y+c)*(-v+f)-(-y+p)*(-v+d),A=(-(x*=F)+g)*(-(_*=F)+f)-(-x+p)*(-_+m),R=(w=-v+d-(-v+f))*(E=-x+p-(-x+g))-(P=-_+m-(-_+f))*(C=-y+p-(-y+c)),Math.abs(R)<.1?(R+=10.1,I.push(p-y,f-v,G,N,X,U),I.push(p+y,f+v,G,N,X,U)):((u=(C*A-E*S)/R)-p)*(u-p)+((l=(P*S-w*A)/R)-f)+(l-f)>19600?(b=y-x,T=v-_,b/=M=Math.sqrt(b*b+T*T),T/=M,b*=F,T*=F,I.push(p-b,f-T),I.push(G,N,X,U),I.push(p+b,f+T),I.push(G,N,X,U),I.push(p-b,f-T),I.push(G,N,X,U),k++):(I.push(u,l),I.push(G,N,X,U),I.push(p-(u-p),f-(l-f)),I.push(G,N,X,U));for(c=n[2*(O-2)],d=n[2*(O-2)+1],p=n[2*(O-1)],y=-(d-(f=n[2*(O-1)+1])),v=c-p,y/=M=Math.sqrt(y*y+v*v),v/=M,y*=F,v*=F,I.push(p-y,f-v),I.push(G,N,X,U),I.push(p+y,f+v),I.push(G,N,X,U),L.push(D),s=0;s<k;s++)L.push(D++);L.push(D-1)}},PIXI.WebGLGraphics.buildComplexPoly=function(t,e){var s=t.points.slice();if(!(s.length<6)){var n=e.indices;e.points=s,e.alpha=t.fillAlpha,e.color=i.Color.hexToRGBArray(t.fillColor);for(var r,o,a=1/0,h=-1/0,u=1/0,l=-1/0,c=0;c<s.length;c+=2)r=s[c],o=s[c+1],a=r<a?r:a,h=r>h?r:h,u=o<u?o:u,l=o>l?o:l;s.push(a,u,h,u,h,l,a,l);var d=s.length/2;for(c=0;c<d;c++)n.push(c)}},PIXI.WebGLGraphics.buildPoly=function(t,e){var s=t.points;if(!(s.length<6)){var n=e.points,r=e.indices,o=s.length/2,a=i.Color.hexToRGBArray(t.fillColor),h=t.fillAlpha,u=a[0]*h,l=a[1]*h,c=a[2]*h,d=i.EarCut.Triangulate(s,null,2);if(!d)return!1;var p=n.length/6,f=0;for(f=0;f<d.length;f+=3)r.push(d[f]+p),r.push(d[f]+p),r.push(d[f+1]+p),r.push(d[f+2]+p),r.push(d[f+2]+p);for(f=0;f<o;f++)n.push(s[2*f],s[2*f+1],u,l,c,h);return!0}},PIXI.WebGLGraphics.graphicsDataPool=[],PIXI.WebGLGraphicsData=function(t){this.gl=t,this.color=[0,0,0],this.points=[],this.indices=[],this.buffer=t.createBuffer(),this.indexBuffer=t.createBuffer(),this.mode=1,this.alpha=1,this.dirty=!0},PIXI.WebGLGraphicsData.prototype.reset=function(){this.points=[],this.indices=[]},PIXI.WebGLGraphicsData.prototype.upload=function(){var t=this.gl;this.glPoints=new Float32Array(this.points),t.bindBuffer(t.ARRAY_BUFFER,this.buffer),t.bufferData(t.ARRAY_BUFFER,this.glPoints,t.STATIC_DRAW),this.glIndicies=new Uint16Array(this.indices),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,this.glIndicies,t.STATIC_DRAW),this.dirty=!1},PIXI.CanvasGraphics=function(){},PIXI.CanvasGraphics.renderGraphics=function(t,e){var s=t.worldAlpha;t.dirty&&(this.updateGraphicsTint(t),t.dirty=!1);for(var n=0;n<t.graphicsData.length;n++){var r=t.graphicsData[n],o=r.shape,a=r._fillTint,h=r._lineTint;if(e.lineWidth=r.lineWidth,r.type===i.POLYGON){e.beginPath();var u=o.points;e.moveTo(u[0],u[1]);for(var l=1;l<u.length/2;l++)e.lineTo(u[2*l],u[2*l+1]);o.closed&&e.lineTo(u[0],u[1]),u[0]===u[u.length-2]&&u[1]===u[u.length-1]&&e.closePath(),r.fill&&(e.globalAlpha=r.fillAlpha*s,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fill()),r.lineWidth&&(e.globalAlpha=r.lineAlpha*s,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.stroke())}else if(r.type===i.RECTANGLE)(r.fillColor||0===r.fillColor)&&(e.globalAlpha=r.fillAlpha*s,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fillRect(o.x,o.y,o.width,o.height)),r.lineWidth&&(e.globalAlpha=r.lineAlpha*s,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.strokeRect(o.x,o.y,o.width,o.height));else if(r.type===i.CIRCLE)e.beginPath(),e.arc(o.x,o.y,o.radius,0,2*Math.PI),e.closePath(),r.fill&&(e.globalAlpha=r.fillAlpha*s,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fill()),r.lineWidth&&(e.globalAlpha=r.lineAlpha*s,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.stroke());else if(r.type===i.ELLIPSE){var c=2*o.width,d=2*o.height,p=o.x-c/2,f=o.y-d/2;e.beginPath();var g=c/2*.5522848,m=d/2*.5522848,y=p+c,v=f+d,x=p+c/2,_=f+d/2;e.moveTo(p,_),e.bezierCurveTo(p,_-m,x-g,f,x,f),e.bezierCurveTo(x+g,f,y,_-m,y,_),e.bezierCurveTo(y,_+m,x+g,v,x,v),e.bezierCurveTo(x-g,v,p,_+m,p,_),e.closePath(),r.fill&&(e.globalAlpha=r.fillAlpha*s,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fill()),r.lineWidth&&(e.globalAlpha=r.lineAlpha*s,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.stroke())}else if(r.type===i.ROUNDEDRECTANGLE){var b=o.x,T=o.y,w=o.width,C=o.height,S=o.radius,P=Math.min(w,C)/2|0;S=S>P?P:S,e.beginPath(),e.moveTo(b,T+S),e.lineTo(b,T+C-S),e.quadraticCurveTo(b,T+C,b+S,T+C),e.lineTo(b+w-S,T+C),e.quadraticCurveTo(b+w,T+C,b+w,T+C-S),e.lineTo(b+w,T+S),e.quadraticCurveTo(b+w,T,b+w-S,T),e.lineTo(b+S,T),e.quadraticCurveTo(b,T,b,T+S),e.closePath(),(r.fillColor||0===r.fillColor)&&(e.globalAlpha=r.fillAlpha*s,e.fillStyle="#"+("00000"+(0|a).toString(16)).substr(-6),e.fill()),r.lineWidth&&(e.globalAlpha=r.lineAlpha*s,e.strokeStyle="#"+("00000"+(0|h).toString(16)).substr(-6),e.stroke())}}},PIXI.CanvasGraphics.renderGraphicsMask=function(t,e){var s=t.graphicsData.length;if(0!==s){e.beginPath();for(var n=0;n<s;n++){var r=t.graphicsData[n],o=r.shape;if(r.type===i.POLYGON){var a=o.points;e.moveTo(a[0],a[1]);for(var h=1;h<a.length/2;h++)e.lineTo(a[2*h],a[2*h+1]);a[0]===a[a.length-2]&&a[1]===a[a.length-1]&&e.closePath()}else if(r.type===i.RECTANGLE)e.rect(o.x,o.y,o.width,o.height),e.closePath();else if(r.type===i.CIRCLE)e.arc(o.x,o.y,o.radius,0,2*Math.PI),e.closePath();else if(r.type===i.ELLIPSE){var u=2*o.width,l=2*o.height,c=o.x-u/2,d=o.y-l/2,p=u/2*.5522848,f=l/2*.5522848,g=c+u,m=d+l,y=c+u/2,v=d+l/2;e.moveTo(c,v),e.bezierCurveTo(c,v-f,y-p,d,y,d),e.bezierCurveTo(y+p,d,g,v-f,g,v),e.bezierCurveTo(g,v+f,y+p,m,y,m),e.bezierCurveTo(y-p,m,c,v+f,c,v),e.closePath()}else if(r.type===i.ROUNDEDRECTANGLE){var x=o.x,_=o.y,b=o.width,T=o.height,w=o.radius,C=Math.min(b,T)/2|0;w=w>C?C:w,e.moveTo(x,_+w),e.lineTo(x,_+T-w),e.quadraticCurveTo(x,_+T,x+w,_+T),e.lineTo(x+b-w,_+T),e.quadraticCurveTo(x+b,_+T,x+b,_+T-w),e.lineTo(x+b,_+w),e.quadraticCurveTo(x+b,_,x+b-w,_),e.lineTo(x+w,_),e.quadraticCurveTo(x,_,x,_+w),e.closePath()}}}},PIXI.CanvasGraphics.updateGraphicsTint=function(t){if(16777215!==t.tint)for(var e=(t.tint>>16&255)/255,i=(t.tint>>8&255)/255,s=(255&t.tint)/255,n=0;n<t.graphicsData.length;n++){var r=t.graphicsData[n],o=0|r.fillColor,a=0|r.lineColor;r._fillTint=((o>>16&255)/255*e*255<<16)+((o>>8&255)/255*i*255<<8)+(255&o)/255*s*255,r._lineTint=((a>>16&255)/255*e*255<<16)+((a>>8&255)/255*i*255<<8)+(255&a)/255*s*255}},i.GraphicsData=function(t,e,i,s,n,r,o){this.lineWidth=t,this.lineColor=e,this.lineAlpha=i,this._lineTint=e,this.fillColor=s,this.fillAlpha=n,this._fillTint=s,this.fill=r,this.shape=o,this.type=o.type},i.GraphicsData.prototype.constructor=i.GraphicsData,i.GraphicsData.prototype.clone=function(){return new i.GraphicsData(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.fill,this.shape)},i.Graphics=function(t,e,s){void 0===e&&(e=0),void 0===s&&(s=0),this.type=i.GRAPHICS,this.physicsType=i.SPRITE,this.anchor=new i.Point,PIXI.DisplayObjectContainer.call(this),this.renderable=!0,this.fillAlpha=1,this.lineWidth=0,this.lineColor=0,this.graphicsData=[],this.tint=16777215,this.blendMode=PIXI.blendModes.NORMAL,this.currentPath=null,this._webGL=[],this.isMask=!1,this.boundsPadding=0,this._localBounds=new i.Rectangle(0,0,1,1),this.dirty=!0,this._boundsDirty=!1,this.webGLDirty=!1,this.cachedSpriteDirty=!1,i.Component.Core.init.call(this,t,e,s,"",null)},i.Graphics.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),i.Graphics.prototype.constructor=i.Graphics,i.Component.Core.install.call(i.Graphics.prototype,["Angle","AutoCull","Bounds","Destroy","FixedToCamera","InputEnabled","InWorld","LifeSpan","PhysicsBody","Reset"]),i.Graphics.prototype.preUpdatePhysics=i.Component.PhysicsBody.preUpdate,i.Graphics.prototype.preUpdateLifeSpan=i.Component.LifeSpan.preUpdate,i.Graphics.prototype.preUpdateInWorld=i.Component.InWorld.preUpdate,i.Graphics.prototype.preUpdateCore=i.Component.Core.preUpdate,i.Graphics.prototype.preUpdate=function(){return!!(this.preUpdatePhysics()&&this.preUpdateLifeSpan()&&this.preUpdateInWorld())&&this.preUpdateCore()},i.Graphics.prototype.postUpdate=function(){i.Component.PhysicsBody.postUpdate.call(this),i.Component.FixedToCamera.postUpdate.call(this),this._boundsDirty&&(this.updateLocalBounds(),this._boundsDirty=!1);for(var t=0;t<this.children.length;t++)this.children[t].postUpdate()},i.Graphics.prototype.destroy=function(t){this.clear(),i.Component.Destroy.prototype.destroy.call(this,t)},i.Graphics.prototype.drawTriangle=function(t,e){void 0===e&&(e=!1);var s=new i.Polygon(t);if(e){var n=new i.Point(this.game.camera.x-t[0].x,this.game.camera.y-t[0].y),r=new i.Point(t[1].x-t[0].x,t[1].y-t[0].y),o=new i.Point(t[1].x-t[2].x,t[1].y-t[2].y).cross(r);n.dot(o)>0&&this.drawPolygon(s)}else this.drawPolygon(s)},i.Graphics.prototype.drawTriangles=function(t,e,s){void 0===s&&(s=!1);var n,r=new i.Point,o=new i.Point,a=new i.Point,h=[];if(e)if(t[0]instanceof i.Point)for(n=0;n<e.length/3;n++)h.push(t[e[3*n]]),h.push(t[e[3*n+1]]),h.push(t[e[3*n+2]]),3===h.length&&(this.drawTriangle(h,s),h=[]);else for(n=0;n<e.length;n++)r.x=t[2*e[n]],r.y=t[2*e[n]+1],h.push(r.copyTo({})),3===h.length&&(this.drawTriangle(h,s),h=[]);else if(t[0]instanceof i.Point)for(n=0;n<t.length/3;n++)this.drawTriangle([t[3*n],t[3*n+1],t[3*n+2]],s);else for(n=0;n<t.length/6;n++)r.x=t[6*n+0],r.y=t[6*n+1],o.x=t[6*n+2],o.y=t[6*n+3],a.x=t[6*n+4],a.y=t[6*n+5],this.drawTriangle([r,o,a],s)},i.Graphics.prototype.lineStyle=function(t,e,s){return this.lineWidth=t||0,this.lineColor=e||0,this.lineAlpha=void 0===s?1:s,this.currentPath&&(this.currentPath.shape.points.length?this.drawShape(new i.Polygon(this.currentPath.shape.points.slice(-2))):(this.currentPath.lineWidth=this.lineWidth,this.currentPath.lineColor=this.lineColor,this.currentPath.lineAlpha=this.lineAlpha)),this},i.Graphics.prototype.moveTo=function(t,e){return this.drawShape(new i.Polygon([t,e])),this},i.Graphics.prototype.lineTo=function(t,e){return this.currentPath||this.moveTo(0,0),this.currentPath.shape.points.push(t,e),this.dirty=!0,this._boundsDirty=!0,this},i.Graphics.prototype.quadraticCurveTo=function(t,e,i,s){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);var n,r,o=this.currentPath.shape.points;0===o.length&&this.moveTo(0,0);for(var a=o[o.length-2],h=o[o.length-1],u=0,l=1;l<=20;++l)n=a+(t-a)*(u=l/20),r=h+(e-h)*u,o.push(n+(t+(i-t)*u-n)*u,r+(e+(s-e)*u-r)*u);return this.dirty=!0,this._boundsDirty=!0,this},i.Graphics.prototype.bezierCurveTo=function(t,e,i,s,n,r){this.currentPath?0===this.currentPath.shape.points.length&&(this.currentPath.shape.points=[0,0]):this.moveTo(0,0);for(var o,a,h,u,l,c=this.currentPath.shape.points,d=c[c.length-2],p=c[c.length-1],f=0,g=1;g<=20;++g)h=(a=(o=1-(f=g/20))*o)*o,l=(u=f*f)*f,c.push(h*d+3*a*f*t+3*o*u*i+l*n,h*p+3*a*f*e+3*o*u*s+l*r);return this.dirty=!0,this._boundsDirty=!0,this},i.Graphics.prototype.arcTo=function(t,e,i,s,n){this.currentPath?0===this.currentPath.shape.points.length&&this.currentPath.shape.points.push(t,e):this.moveTo(t,e);var r=this.currentPath.shape.points,o=r[r.length-2],a=r[r.length-1]-e,h=o-t,u=s-e,l=i-t,c=Math.abs(a*l-h*u);if(c<1e-8||0===n)r[r.length-2]===t&&r[r.length-1]===e||r.push(t,e);else{var d=a*a+h*h,p=u*u+l*l,f=a*u+h*l,g=n*Math.sqrt(d)/c,m=n*Math.sqrt(p)/c,y=g*f/d,v=m*f/p,x=g*l+m*h,_=g*u+m*a,b=h*(m+y),T=a*(m+y),w=l*(g+v),C=u*(g+v),S=Math.atan2(T-_,b-x),P=Math.atan2(C-_,w-x);this.arc(x+t,_+e,n,S,P,h*u>l*a)}return this.dirty=!0,this._boundsDirty=!0,this},i.Graphics.prototype.arc=function(t,e,i,s,n,r,o){if(s===n)return this;void 0===r&&(r=!1),void 0===o&&(o=40),!r&&n<=s?n+=2*Math.PI:r&&s<=n&&(s+=2*Math.PI);var a=r?-1*(s-n):n-s,h=Math.ceil(Math.abs(a)/(2*Math.PI))*o;if(0===a)return this;var u=t+Math.cos(s)*i,l=e+Math.sin(s)*i;r&&this.filling?this.moveTo(t,e):this.moveTo(u,l);for(var c=this.currentPath.shape.points,d=a/(2*h),p=2*d,f=Math.cos(d),g=Math.sin(d),m=h-1,y=m%1/m,v=0;v<=m;v++){var x=d+s+p*(v+y*v),_=Math.cos(x),b=-Math.sin(x);c.push((f*_+g*b)*i+t,(f*-b+g*_)*i+e)}return this.dirty=!0,this._boundsDirty=!0,this},i.Graphics.prototype.beginFill=function(t,e){return this.filling=!0,this.fillColor=t||0,this.fillAlpha=void 0===e?1:e,this.currentPath&&this.currentPath.shape.points.length<=2&&(this.currentPath.fill=this.filling,this.currentPath.fillColor=this.fillColor,this.currentPath.fillAlpha=this.fillAlpha),this},i.Graphics.prototype.endFill=function(){return this.filling=!1,this.fillColor=null,this.fillAlpha=1,this},i.Graphics.prototype.drawRect=function(t,e,s,n){return this.drawShape(new i.Rectangle(t,e,s,n)),this},i.Graphics.prototype.drawRoundedRect=function(t,e,s,n,r){return this.drawShape(new i.RoundedRectangle(t,e,s,n,r)),this},i.Graphics.prototype.drawCircle=function(t,e,s){return this.drawShape(new i.Circle(t,e,s)),this},i.Graphics.prototype.drawEllipse=function(t,e,s,n){return this.drawShape(new i.Ellipse(t,e,s,n)),this},i.Graphics.prototype.drawPolygon=function(t){t instanceof i.Polygon&&(t=t.points);var e=t;if(!Array.isArray(e)){e=new Array(arguments.length);for(var s=0;s<e.length;++s)e[s]=arguments[s]}return this.drawShape(new i.Polygon(e)),this},i.Graphics.prototype.clear=function(){return this.lineWidth=0,this.filling=!1,this.dirty=!0,this._boundsDirty=!0,this.clearDirty=!0,this.graphicsData=[],this.updateLocalBounds(),this},i.Graphics.prototype.generateTexture=function(t,e,i){void 0===t&&(t=1),void 0===e&&(e=PIXI.scaleModes.DEFAULT),void 0===i&&(i=0);var s=this.getBounds();s.width+=i,s.height+=i;var n=new PIXI.CanvasBuffer(s.width*t,s.height*t),r=PIXI.Texture.fromCanvas(n.canvas,e);return r.baseTexture.resolution=t,n.context.scale(t,t),n.context.translate(-s.x,-s.y),PIXI.CanvasGraphics.renderGraphics(this,n.context),r},i.Graphics.prototype._renderWebGL=function(t){if(!1!==this.visible&&0!==this.alpha&&!0!==this.isMask){if(this._cacheAsBitmap)return(this.dirty||this.cachedSpriteDirty)&&(this._generateCachedSprite(),this.updateCachedSpriteTexture(),this.cachedSpriteDirty=!1,this.dirty=!1),this._cachedSprite.worldAlpha=this.worldAlpha,void PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite,t);if(t.spriteBatch.stop(),t.blendModeManager.setBlendMode(this.blendMode),this._mask&&t.maskManager.pushMask(this._mask,t),this._filters&&t.filterManager.pushFilter(this._filterBlock),this.blendMode!==t.spriteBatch.currentBlendMode){t.spriteBatch.currentBlendMode=this.blendMode;var e=PIXI.blendModesWebGL[t.spriteBatch.currentBlendMode];t.spriteBatch.gl.blendFunc(e[0],e[1])}if(this.webGLDirty&&(this.dirty=!0,this.webGLDirty=!1),PIXI.WebGLGraphics.renderGraphics(this,t),this.children.length){t.spriteBatch.start();for(var i=0;i<this.children.length;i++)this.children[i]._renderWebGL(t);t.spriteBatch.stop()}this._filters&&t.filterManager.popFilter(),this._mask&&t.maskManager.popMask(this.mask,t),t.drawCount++,t.spriteBatch.start()}},i.Graphics.prototype._renderCanvas=function(t){if(!1!==this.visible&&0!==this.alpha&&!0!==this.isMask){if(this._prevTint!==this.tint&&(this.dirty=!0,this._prevTint=this.tint),this._cacheAsBitmap)return(this.dirty||this.cachedSpriteDirty)&&(this._generateCachedSprite(),this.updateCachedSpriteTexture(),this.cachedSpriteDirty=!1,this.dirty=!1),this._cachedSprite.alpha=this.alpha,void PIXI.Sprite.prototype._renderCanvas.call(this._cachedSprite,t);var e=t.context,i=this.worldTransform;this.blendMode!==t.currentBlendMode&&(t.currentBlendMode=this.blendMode,e.globalCompositeOperation=PIXI.blendModesCanvas[t.currentBlendMode]),this._mask&&t.maskManager.pushMask(this._mask,t);var s=t.resolution,n=i.tx*t.resolution+t.shakeX,r=i.ty*t.resolution+t.shakeY;e.setTransform(i.a*s,i.b*s,i.c*s,i.d*s,n,r),PIXI.CanvasGraphics.renderGraphics(this,e);for(var o=0;o<this.children.length;o++)this.children[o]._renderCanvas(t);this._mask&&t.maskManager.popMask(t)}},i.Graphics.prototype.getBounds=function(t){if(this._currentBounds)return this._currentBounds;if(!this.renderable)return i.EmptyRectangle;this.dirty&&(this.updateLocalBounds(),this.webGLDirty=!0,this.cachedSpriteDirty=!0,this.dirty=!1);var e=this._localBounds,s=e.x,n=e.width+e.x,r=e.y,o=e.height+e.y,a=t||this.worldTransform,h=a.a,u=a.b,l=a.c,c=a.d,d=a.tx,p=a.ty,f=h*n+l*o+d,g=c*o+u*n+p,m=h*s+l*o+d,y=c*o+u*s+p,v=h*s+l*r+d,x=c*r+u*s+p,_=h*n+l*r+d,b=c*r+u*n+p,T=f,w=g,C=f,S=g;return C=m<C?m:C,C=v<C?v:C,C=_<C?_:C,S=y<S?y:S,S=x<S?x:S,S=b<S?b:S,T=m>T?m:T,T=v>T?v:T,T=_>T?_:T,w=y>w?y:w,w=x>w?x:w,w=b>w?b:w,this._bounds.x=C,this._bounds.width=T-C,this._bounds.y=S,this._bounds.height=w-S,this._currentBounds=this._bounds,this._currentBounds},i.Graphics.prototype.getLocalBounds=function(){var t=this.worldTransform;this.worldTransform=i.identityMatrix;for(var e=0;e<this.children.length;e++)this.children[e].updateTransform();var s=this.getBounds();for(this.worldTransform=t,e=0;e<this.children.length;e++)this.children[e].updateTransform();return s},i.Graphics.prototype.containsPoint=function(t,e){void 0===e&&(e=new i.Point),this.worldTransform.applyInverse(t,e);for(var s=this.graphicsData,n=0;n<s.length;n++){var r=s[n];if(r.fill&&(r.shape&&r.shape.contains(e.x,e.y)))return!0}return!1},i.Graphics.prototype.updateLocalBounds=function(){var t=1/0,e=-1/0,s=1/0,n=-1/0;if(this.graphicsData.length)for(var r,o,a,h,u,l,c=0;c<this.graphicsData.length;c++){var d=this.graphicsData[c],p=d.type,f=d.lineWidth;if(r=d.shape,p===i.RECTANGLE||p===i.ROUNDEDRECTANGLE)a=r.x-f/2,h=r.y-f/2,u=r.width+f,l=r.height+f,t=a<t?a:t,e=a+u>e?a+u:e,s=h<s?h:s,n=h+l>n?h+l:n;else if(p===i.CIRCLE)a=r.x,h=r.y,u=r.radius+f/2,l=r.radius+f/2,t=a-u<t?a-u:t,e=a+u>e?a+u:e,s=h-l<s?h-l:s,n=h+l>n?h+l:n;else if(p===i.ELLIPSE)a=r.x,h=r.y,u=r.width+f/2,l=r.height+f/2,t=a-u<t?a-u:t,e=a+u>e?a+u:e,s=h-l<s?h-l:s,n=h+l>n?h+l:n;else{o=r.points;for(var g=0;g<o.length;g++)o[g]instanceof i.Point?(a=o[g].x,h=o[g].y):(a=o[g],h=o[g+1],g<o.length-1&&g++),t=a-f<t?a-f:t,e=a+f>e?a+f:e,s=h-f<s?h-f:s,n=h+f>n?h+f:n}}else t=0,e=0,s=0,n=0;var m=this.boundsPadding;this._localBounds.x=t-m,this._localBounds.width=e-t+2*m,this._localBounds.y=s-m,this._localBounds.height=n-s+2*m},i.Graphics.prototype._generateCachedSprite=function(){var t=this.getLocalBounds();if(this._cachedSprite)this._cachedSprite.buffer.resize(t.width,t.height);else{var e=new PIXI.CanvasBuffer(t.width,t.height),i=PIXI.Texture.fromCanvas(e.canvas);this._cachedSprite=new PIXI.Sprite(i),this._cachedSprite.buffer=e,this._cachedSprite.worldTransform=this.worldTransform}this._cachedSprite.anchor.x=-t.x/t.width,this._cachedSprite.anchor.y=-t.y/t.height,this._cachedSprite.buffer.context.translate(-t.x,-t.y),this.worldAlpha=1,PIXI.CanvasGraphics.renderGraphics(this,this._cachedSprite.buffer.context),this._cachedSprite.alpha=this.alpha},i.Graphics.prototype.updateCachedSpriteTexture=function(){var t=this._cachedSprite,e=t.texture,i=t.buffer.canvas;e.baseTexture.width=i.width,e.baseTexture.height=i.height,e.crop.width=e.frame.width=i.width,e.crop.height=e.frame.height=i.height,t._width=i.width,t._height=i.height,e.baseTexture.dirty()},i.Graphics.prototype.destroyCachedSprite=function(){this._cachedSprite.texture.destroy(!0),this._cachedSprite=null},i.Graphics.prototype.drawShape=function(t){this.currentPath&&this.currentPath.shape.points.length<=2&&this.graphicsData.pop(),this.currentPath=null,t instanceof i.Polygon&&(t=t.clone()).flatten();var e=new i.GraphicsData(this.lineWidth,this.lineColor,this.lineAlpha,this.fillColor,this.fillAlpha,this.filling,t);return this.graphicsData.push(e),e.type===i.POLYGON&&(e.shape.closed=this.filling,this.currentPath=e),this.dirty=!0,this._boundsDirty=!0,e},Object.defineProperty(i.Graphics.prototype,"cacheAsBitmap",{get:function(){return this._cacheAsBitmap},set:function(t){this._cacheAsBitmap=t,this._cacheAsBitmap?this._generateCachedSprite():this.destroyCachedSprite(),this.dirty=!0,this.webGLDirty=!0}}),i.RenderTexture=function(t,e,s,n,r,o,a,h){if(void 0===e&&(e=100),void 0===s&&(s=100),void 0===n&&(n=""),void 0===r&&(r=i.scaleModes.DEFAULT),void 0===o&&(o=1),void 0===a&&(a=PIXI.defaultRenderer),void 0===h&&(h=0),this.game=t,this.key=n,this.type=i.RENDERTEXTURE,this._tempMatrix=new i.Matrix,this.width=e,this.height=s,this.resolution=o,this.frame=new i.Rectangle(0,0,this.width*this.resolution,this.height*this.resolution),this.crop=this.frame.clone(),this.baseTexture=new PIXI.BaseTexture,this.baseTexture.width=this.width*this.resolution,this.baseTexture.height=this.height*this.resolution,this.baseTexture._glTextures=[],this.baseTexture.resolution=this.resolution,this.baseTexture.scaleMode=r,this.baseTexture.hasLoaded=!0,PIXI.Texture.call(this,this.baseTexture,this.frame.clone()),this.renderer=a,this.renderer.type===i.WEBGL){var u=this.renderer.gl;this.baseTexture.textureIndex=h,this.baseTexture._dirty[u.id]=!1,this.textureBuffer=new PIXI.FilterTexture(u,this.width,this.height,this.baseTexture.scaleMode,h),this.baseTexture._glTextures[u.id]=this.textureBuffer.texture,this.projection=new i.Point(.5*this.width,.5*-this.height)}else this.textureBuffer=new PIXI.CanvasBuffer(this.width*this.resolution,this.height*this.resolution),this.baseTexture.source=this.textureBuffer.canvas;this.valid=!0,this.tempMatrix=new i.Matrix,this._updateUvs()},i.RenderTexture.prototype=Object.create(PIXI.Texture.prototype),i.RenderTexture.prototype.constructor=i.RenderTexture,i.RenderTexture.prototype.renderXY=function(t,e,s,n){t.updateTransform(),this._tempMatrix.copyFrom(t.worldTransform),this._tempMatrix.tx=e,this._tempMatrix.ty=s,this.renderer.type===i.WEBGL?this._renderWebGL(t,this._tempMatrix,n):this._renderCanvas(t,this._tempMatrix,n)},i.RenderTexture.prototype.renderRawXY=function(t,e,s,n){this._tempMatrix.identity().translate(e,s),this.renderer.type===i.WEBGL?this._renderWebGL(t,this._tempMatrix,n):this._renderCanvas(t,this._tempMatrix,n)},i.RenderTexture.prototype.render=function(t,e,s){void 0===e||null===e?this._tempMatrix.copyFrom(t.worldTransform):this._tempMatrix.copyFrom(e),this.renderer.type===i.WEBGL?this._renderWebGL(t,this._tempMatrix,s):this._renderCanvas(t,this._tempMatrix,s)},i.RenderTexture.prototype.resize=function(t,e,s){t===this.width&&e===this.height||(this.valid=t>0&&e>0,this.width=t,this.height=e,this.frame.width=this.crop.width=t*this.resolution,this.frame.height=this.crop.height=e*this.resolution,s&&(this.baseTexture.width=this.width*this.resolution,this.baseTexture.height=this.height*this.resolution),this.renderer.type===i.WEBGL&&(this.projection.x=this.width/2,this.projection.y=-this.height/2),this.valid&&this.textureBuffer.resize(this.width,this.height))},i.RenderTexture.prototype.clear=function(){this.valid&&(this.renderer.type===i.WEBGL&&this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER,this.textureBuffer.frameBuffer),this.textureBuffer.clear())},i.RenderTexture.prototype._renderWebGL=function(t,e,i){if(this.valid&&0!==t.alpha){var s=t.worldTransform;s.identity(),s.translate(0,2*this.projection.y),e&&s.append(e),s.scale(1,-1);for(var n=0;n<t.children.length;n++)t.children[n].updateTransform();var r=this.renderer.gl;r.viewport(0,0,this.width*this.resolution,this.height*this.resolution),r.bindFramebuffer(r.FRAMEBUFFER,this.textureBuffer.frameBuffer),i&&this.textureBuffer.clear(),this.renderer.spriteBatch.dirty=!0,this.renderer.renderDisplayObject(t,this.projection,this.textureBuffer.frameBuffer,e),this.renderer.spriteBatch.dirty=!0,r.bindFramebuffer(r.FRAMEBUFFER,null)}},i.RenderTexture.prototype._renderCanvas=function(t,e,i){if(this.valid&&0!==t.alpha){var s=t.worldTransform;s.identity(),e&&s.append(e);for(var n=0;n<t.children.length;n++)t.children[n].updateTransform();i&&this.textureBuffer.clear();var r=this.renderer.resolution;this.renderer.resolution=this.resolution,this.renderer.renderDisplayObject(t,this.textureBuffer.context,e),this.renderer.resolution=r}},i.RenderTexture.prototype.getImage=function(){var t=new Image;return t.src=this.getBase64(),t},i.RenderTexture.prototype.getBase64=function(){return this.getCanvas().toDataURL()},i.RenderTexture.prototype.getCanvas=function(){if(this.renderer.type===i.WEBGL){var t=this.renderer.gl,e=this.textureBuffer.width,s=this.textureBuffer.height,n=new Uint8Array(4*e*s);t.bindFramebuffer(t.FRAMEBUFFER,this.textureBuffer.frameBuffer),t.readPixels(0,0,e,s,t.RGBA,t.UNSIGNED_BYTE,n),t.bindFramebuffer(t.FRAMEBUFFER,null);var r=new PIXI.CanvasBuffer(e,s),o=r.context.getImageData(0,0,e,s);return o.data.set(n),r.context.putImageData(o,0,0),r.canvas}return this.textureBuffer.canvas},i.Text=function(t,e,s,n,r){e=e||0,s=s||0,n=void 0===n||null===n?"":n.toString(),this.type=i.TEXT,this.physicsType=i.SPRITE,this.padding=new i.Point,this.textBounds=null,this.canvas=i.CanvasPool.create(this),this.context=this.canvas.getContext("2d"),this.colors=[],this.strokeColors=[],this.fontStyles=[],this.fontWeights=[],this.autoRound=!1,this.useAdvancedWrap=!1,this.splitRegExp=/(?:\r\n|\r|\n)/,this.characterLimitSize=-1,this.characterLimitSuffix="",this._res=t.renderer.resolution,this._text=n,this._fontComponents=null,this._lineSpacing=0,this._charCount=0,this._width=0,this._height=0,i.Sprite.call(this,t,e,s,PIXI.Texture.fromCanvas(this.canvas)),this.style={},this.setStyle(r||{}),""!==n&&this.updateText()},i.Text.prototype=Object.create(i.Sprite.prototype),i.Text.prototype.constructor=i.Text,i.Text.prototype.preUpdate=function(){return!!(this.preUpdatePhysics()&&this.preUpdateLifeSpan()&&this.preUpdateInWorld())&&this.preUpdateCore()},i.Text.prototype.update=function(){},i.Text.prototype.destroy=function(t){this.texture.destroy(!0),i.Component.Destroy.prototype.destroy.call(this,t)},i.Text.prototype.setShadow=function(t,e,i,s,n,r){return void 0===t&&(t=0),void 0===e&&(e=0),void 0===i&&(i="rgba(0, 0, 0, 1)"),void 0===s&&(s=0),void 0===n&&(n=!0),void 0===r&&(r=!0),this.style.shadowOffsetX=t,this.style.shadowOffsetY=e,this.style.shadowColor=i,this.style.shadowBlur=s,this.style.shadowStroke=n,this.style.shadowFill=r,this.dirty=!0,this},i.Text.prototype.setStyle=function(t,e){void 0===e&&(e=!1);var i=Object.assign({},t);i.font=t.font||"bold 20pt Arial",i.backgroundColor=t.backgroundColor||null,i.fill=t.fill||"black",i.align=(t.align||"left").toLowerCase(),i.boundsAlignH=(t.boundsAlignH||"left").toLowerCase(),i.boundsAlignV=(t.boundsAlignV||"top").toLowerCase(),i.stroke=t.stroke||"black",i.strokeThickness=Number(t.strokeThickness)||0,i.wordWrap=t.wordWrap||!1,i.wordWrapWidth=t.wordWrapWidth||100,i.maxLines=t.maxLines||0,i.shadowOffsetX=t.shadowOffsetX||0,i.shadowOffsetY=t.shadowOffsetY||0,i.shadowColor=t.shadowColor||"rgba(0,0,0,0)",i.shadowBlur=t.shadowBlur||0,i.tabs=t.tabs||0;var s=this.fontToComponents(i.font);return i.fontStyle&&(s.fontStyle=i.fontStyle),i.fontVariant&&(s.fontVariant=i.fontVariant),i.fontWeight&&(s.fontWeight=i.fontWeight),i.fontSize&&("number"==typeof i.fontSize&&(i.fontSize=i.fontSize+"px"),s.fontSize=i.fontSize),this._fontComponents=s,i.font=this.componentsToFont(this._fontComponents),this.style=i,this.dirty=!0,e&&this.updateText(),this},i.Text.prototype.updateText=function(){this.texture.baseTexture.resolution=this._res,this.context.font=this.style.font;var t=this.text;this.characterLimitSize>-1&&this.characterLimitSize<t.length&&(t=this.text.substring(0,this.characterLimitSize)+this.characterLimitSuffix),this.style.wordWrap&&(t=this.runWordWrap(this.text));var e=t.split(this.splitRegExp),i=this.style.tabs,s=[],n=0,r=this.determineFontProperties(this.style.font),o=e.length;this.style.maxLines>0&&this.style.maxLines<e.length&&(o=this.style.maxLines),this._charCount=0;for(var a=0;a<o;a++){if(0===i){u=this.style.strokeThickness+this.padding.x;this.colors.length>0||this.strokeColors.length>0||this.fontWeights.length>0||this.fontStyles.length>0?u+=this.measureLine(e[a]):u+=this.context.measureText(e[a]).width,this.style.wordWrap&&(u-=this.context.measureText(" ").width)}else{var h=e[a].split(/(?:\t)/),u=this.padding.x+this.style.strokeThickness;if(Array.isArray(i))for(var l=0,c=0;c<h.length;c++){var d=0;d=this.colors.length>0||this.strokeColors.length>0||this.fontWeights.length>0||this.fontStyles.length>0?this.measureLine(h[c]):Math.ceil(this.context.measureText(h[c]).width),c>0&&(l+=i[c-1]),u=l+d}else for(c=0;c<h.length;c++)this.colors.length>0||this.strokeColors.length>0||this.fontWeights.length>0||this.fontStyles.length>0?u+=this.measureLine(h[c]):u+=Math.ceil(this.context.measureText(h[c]).width),u+=this.game.math.snapToCeil(u,i)-u}s[a]=Math.ceil(u),n=Math.max(n,s[a])}this.canvas.width=n*this._res;var p=r.fontSize+this.style.strokeThickness+this.padding.y,f=p*o,g=this._lineSpacing;g<0&&Math.abs(g)>p&&(g=-p),0!==g&&(f+=g>0?g*e.length:g*(e.length-1)),this.canvas.height=f*this._res,this.context.scale(this._res,this._res),navigator.isCocoonJS&&this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.style.backgroundColor&&(this.context.fillStyle=this.style.backgroundColor,this.context.fillRect(0,0,this.canvas.width,this.canvas.height)),this.context.fillStyle=this.style.fill,this.context.font=this.style.font,this.context.strokeStyle=this.style.stroke,this.context.textBaseline="alphabetic",this.context.lineWidth=this.style.strokeThickness,this.context.lineCap="round",this.context.lineJoin="round";var m,y;for(this._charCount=0,a=0;a<o;a++)m=this.style.strokeThickness/2,y=this.style.strokeThickness/2+a*p+r.ascent,a>0&&(y+=g*a),"right"===this.style.align?m+=n-s[a]:"center"===this.style.align&&(m+=(n-s[a])/2),this.autoRound&&(m=Math.round(m),y=Math.round(y)),this.colors.length>0||this.strokeColors.length>0||this.fontWeights.length>0||this.fontStyles.length>0?this.updateLine(e[a],m,y):(this.style.stroke&&this.style.strokeThickness&&(this.updateShadow(this.style.shadowStroke),0===i?this.context.strokeText(e[a],m,y):this.renderTabLine(e[a],m,y,!1)),this.style.fill&&(this.updateShadow(this.style.shadowFill),0===i?this.context.fillText(e[a],m,y):this.renderTabLine(e[a],m,y,!0)));this.updateTexture(),this.dirty=!1},i.Text.prototype.renderTabLine=function(t,e,i,s){var n=t.split(/(?:\t)/),r=this.style.tabs,o=0;if(Array.isArray(r))for(var a=0,h=0;h<n.length;h++)h>0&&(a+=r[h-1]),o=e+a,s?this.context.fillText(n[h],o,i):this.context.strokeText(n[h],o,i);else for(h=0;h<n.length;h++){var u=Math.ceil(this.context.measureText(n[h]).width);o=this.game.math.snapToCeil(e,r),s?this.context.fillText(n[h],o,i):this.context.strokeText(n[h],o,i),e=o+u}},i.Text.prototype.updateShadow=function(t){t?(this.context.shadowOffsetX=this.style.shadowOffsetX,this.context.shadowOffsetY=this.style.shadowOffsetY,this.context.shadowColor=this.style.shadowColor,this.context.shadowBlur=this.style.shadowBlur):(this.context.shadowOffsetX=0,this.context.shadowOffsetY=0,this.context.shadowColor=0,this.context.shadowBlur=0)},i.Text.prototype.measureLine=function(t){for(var e=0,i=0;i<t.length;i++){var s=t[i];if(this.fontWeights.length>0||this.fontStyles.length>0){var n=this.fontToComponents(this.context.font);this.fontStyles[this._charCount]&&(n.fontStyle=this.fontStyles[this._charCount]),this.fontWeights[this._charCount]&&(n.fontWeight=this.fontWeights[this._charCount]),this.context.font=this.componentsToFont(n)}this.style.stroke&&this.style.strokeThickness&&(this.strokeColors[this._charCount]&&(this.context.strokeStyle=this.strokeColors[this._charCount]),this.updateShadow(this.style.shadowStroke)),this.style.fill&&(this.colors[this._charCount]&&(this.context.fillStyle=this.colors[this._charCount]),this.updateShadow(this.style.shadowFill)),e+=this.context.measureText(s).width,this._charCount++}return Math.ceil(e)},i.Text.prototype.updateLine=function(t,e,i){for(var s=0;s<t.length;s++){var n=t[s];if(this.fontWeights.length>0||this.fontStyles.length>0){var r=this.fontToComponents(this.context.font);this.fontStyles[this._charCount]&&(r.fontStyle=this.fontStyles[this._charCount]),this.fontWeights[this._charCount]&&(r.fontWeight=this.fontWeights[this._charCount]),this.context.font=this.componentsToFont(r)}this.style.stroke&&this.style.strokeThickness&&(this.strokeColors[this._charCount]&&(this.context.strokeStyle=this.strokeColors[this._charCount]),this.updateShadow(this.style.shadowStroke),this.context.strokeText(n,e,i)),this.style.fill&&(this.colors[this._charCount]&&(this.context.fillStyle=this.colors[this._charCount]),this.updateShadow(this.style.shadowFill),this.context.fillText(n,e,i)),e+=this.context.measureText(n).width,this._charCount++}},i.Text.prototype.clearColors=function(){return this.colors=[],this.strokeColors=[],this.dirty=!0,this},i.Text.prototype.clearFontValues=function(){return this.fontStyles=[],this.fontWeights=[],this.dirty=!0,this},i.Text.prototype.addColor=function(t,e){return this.colors[e]=t,this.dirty=!0,this},i.Text.prototype.addStrokeColor=function(t,e){return this.strokeColors[e]=t,this.dirty=!0,this},i.Text.prototype.addFontStyle=function(t,e){return this.fontStyles[e]=t,this.dirty=!0,this},i.Text.prototype.addFontWeight=function(t,e){return this.fontWeights[e]=t,this.dirty=!0,this},i.Text.prototype.precalculateWordWrap=function(t){return this.texture.baseTexture.resolution=this._res,this.context.font=this.style.font,this.runWordWrap(t).split(/(?:\r\n|\r|\n)/)},i.Text.prototype.runWordWrap=function(t){return this.useAdvancedWrap?this.advancedWordWrap(t):this.basicWordWrap(t)},i.Text.prototype.advancedWordWrap=function(t){for(var e=this.context,i=this.style.wordWrapWidth,s="",n=t.replace(/ +/gi," ").split(/\r?\n/gi),r=n.length,o=0;o<r;o++){var a=n[o],h="";if(a=a.replace(/^ *|\s*$/gi,""),e.measureText(a).width<i)s+=a+"\n";else{for(var u=i,l=a.split(" "),c=0;c<l.length;c++){var d=l[c],p=d+" ",f=e.measureText(p).width;if(f>u){if(0===c){for(var g=p;g.length&&(g=g.slice(0,-1),!((f=e.measureText(g).width)<=u)););if(!g.length)throw new Error("This text's wordWrapWidth setting is less than a single character!");var m=d.substr(g.length);l[c]=m,h+=g}var y=l[c].length?c:c+1,v=l.slice(y).join(" ").replace(/[ \n]*$/gi,"");n[o+1]=v+" "+(n[o+1]||""),r=n.length;break}h+=p,u-=f}s+=h.replace(/[ \n]*$/gi,"")+"\n"}}return s=s.replace(/[\s|\n]*$/gi,"")},i.Text.prototype.basicWordWrap=function(t){for(var e="",i=t.split("\n"),s=0;s<i.length;s++){for(var n=this.style.wordWrapWidth,r=i[s].split(" "),o=0;o<r.length;o++){var a=this.context.measureText(r[o]).width,h=a+this.context.measureText(" ").width;h>n?(o>0&&(e+="\n"),e+=r[o]+" ",n=this.style.wordWrapWidth-a):(n-=h,e+=r[o]+" ")}s<i.length-1&&(e+="\n")}return e},i.Text.prototype.updateFont=function(t){var e=this.componentsToFont(t);this.style.font!==e&&(this.style.font=e,this.dirty=!0,this.parent&&this.updateTransform())},i.Text.prototype.fontToComponents=function(t){var e=t.match(/^\s*(?:\b(normal|italic|oblique|inherit)?\b)\s*(?:\b(normal|small-caps|inherit)?\b)\s*(?:\b(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit)?\b)\s*(?:\b(xx-small|x-small|small|medium|large|x-large|xx-large|larger|smaller|0|\d*(?:[.]\d*)?(?:%|[a-z]{2,5}))?\b)\s*(.*)\s*$/);if(e){var i=e[5].trim();return/^(?:inherit|serif|sans-serif|cursive|fantasy|monospace)$/.exec(i)||/['",]/.exec(i)||(i="'"+i+"'"),{font:t,fontStyle:e[1]||"normal",fontVariant:e[2]||"normal",fontWeight:e[3]||"normal",fontSize:e[4]||"medium",fontFamily:i}}return console.warn("Phaser.Text - unparsable CSS font: "+t),{font:t}},i.Text.prototype.componentsToFont=function(t){var e,i=[];return(e=t.fontStyle)&&"normal"!==e&&i.push(e),(e=t.fontVariant)&&"normal"!==e&&i.push(e),(e=t.fontWeight)&&"normal"!==e&&i.push(e),(e=t.fontSize)&&"medium"!==e&&i.push(e),(e=t.fontFamily)&&i.push(e),i.length||i.push(t.font),i.join(" ")},i.Text.prototype.setText=function(t,e){return void 0===e&&(e=!1),this.text=t.toString()||"",e?this.updateText():this.dirty=!0,this},i.Text.prototype.parseList=function(t){if(!Array.isArray(t))return this;for(var e="",i=0;i<t.length;i++)Array.isArray(t[i])?(e+=t[i].join("\t"),i<t.length-1&&(e+="\n")):(e+=t[i],i<t.length-1&&(e+="\t"));return this.text=e,this.dirty=!0,this},i.Text.prototype.setTextBounds=function(t,e,s,n){return void 0===t?this.textBounds=null:(this.textBounds?this.textBounds.setTo(t,e,s,n):this.textBounds=new i.Rectangle(t,e,s,n),this.style.wordWrapWidth>s&&(this.style.wordWrapWidth=s)),this.updateTexture(),this},i.Text.prototype.updateTexture=function(){var t=this.texture.baseTexture,e=this.texture.crop,i=this.texture.frame,s=this.canvas.width,n=this.canvas.height;if(t.width=s,t.height=n,e.width=s,e.height=n,i.width=s,i.height=n,this.texture.width=s,this.texture.height=n,this._width=s,this._height=n,this.textBounds){var r=this.textBounds.x,o=this.textBounds.y;"right"===this.style.boundsAlignH?r+=this.textBounds.width-this.canvas.width/this.resolution:"center"===this.style.boundsAlignH&&(r+=this.textBounds.halfWidth-this.canvas.width/this.resolution/2),"bottom"===this.style.boundsAlignV?o+=this.textBounds.height-this.canvas.height/this.resolution:"middle"===this.style.boundsAlignV&&(o+=this.textBounds.halfHeight-this.canvas.height/this.resolution/2),this.pivot.x=-r,this.pivot.y=-o}this.renderable=0!==s&&0!==n,this.texture.requiresReTint=!0,this.texture.baseTexture.dirty()},i.Text.prototype._renderWebGL=function(t){this.dirty&&(this.updateText(),this.dirty=!1),PIXI.Sprite.prototype._renderWebGL.call(this,t)},i.Text.prototype._renderCanvas=function(t){this.dirty&&(this.updateText(),this.dirty=!1),PIXI.Sprite.prototype._renderCanvas.call(this,t)},i.Text.prototype.determineFontProperties=function(t){var e=i.Text.fontPropertiesCache[t];if(!e){e={};var s=i.Text.fontPropertiesCanvas,n=i.Text.fontPropertiesContext;n.font=t;var r=Math.ceil(n.measureText("|MÉq").width),o=Math.ceil(n.measureText("|MÉq").width),a=2*o;if(o=1.4*o|0,s.width=r,s.height=a,n.fillStyle="#f00",n.fillRect(0,0,r,a),n.font=t,n.textBaseline="alphabetic",n.fillStyle="#000",n.fillText("|MÉq",0,o),!n.getImageData(0,0,r,a))return e.ascent=o,e.descent=o+6,e.fontSize=e.ascent+e.descent,i.Text.fontPropertiesCache[t]=e,e;var h,u,l=n.getImageData(0,0,r,a).data,c=l.length,d=4*r,p=0,f=!1;for(h=0;h<o;h++){for(u=0;u<d;u+=4)if(255!==l[p+u]){f=!0;break}if(f)break;p+=d}for(e.ascent=o-h,p=c-d,f=!1,h=a;h>o;h--){for(u=0;u<d;u+=4)if(255!==l[p+u]){f=!0;break}if(f)break;p-=d}e.descent=h-o,e.descent+=6,e.fontSize=e.ascent+e.descent,i.Text.fontPropertiesCache[t]=e}return e},i.Text.prototype.getBounds=function(t){return this.dirty&&(this.updateText(),this.dirty=!1),PIXI.Sprite.prototype.getBounds.call(this,t)},i.Text.prototype.setCharacterLimit=function(t,e){this.characterLimitSuffix=void 0===e?"":e,this.characterLimitSize=t,this.updateText()},Object.defineProperty(i.Text.prototype,"text",{get:function(){return this._text},set:function(t){t!==this._text&&(this._text=t.toString()||"",this.dirty=!0,this.parent&&this.updateTransform())}}),Object.defineProperty(i.Text.prototype,"cssFont",{get:function(){return this.componentsToFont(this._fontComponents)},set:function(t){t=t||"bold 20pt Arial",this._fontComponents=this.fontToComponents(t),this.updateFont(this._fontComponents)}}),Object.defineProperty(i.Text.prototype,"font",{get:function(){return this._fontComponents.fontFamily},set:function(t){t=(t=t||"Arial").trim(),/^(?:inherit|serif|sans-serif|cursive|fantasy|monospace)$/.exec(t)||/['",]/.exec(t)||(t="'"+t+"'"),this._fontComponents.fontFamily=t,this.updateFont(this._fontComponents)}}),Object.defineProperty(i.Text.prototype,"fontSize",{get:function(){var t=this._fontComponents.fontSize;return t&&/(?:^0$|px$)/.exec(t)?parseInt(t,10):t},set:function(t){"number"==typeof(t=t||"0")&&(t+="px"),this._fontComponents.fontSize=t,this.updateFont(this._fontComponents)}}),Object.defineProperty(i.Text.prototype,"fontWeight",{get:function(){return this._fontComponents.fontWeight||"normal"},set:function(t){t=t||"normal",this._fontComponents.fontWeight=t,this.updateFont(this._fontComponents)}}),Object.defineProperty(i.Text.prototype,"fontStyle",{get:function(){return this._fontComponents.fontStyle||"normal"},set:function(t){t=t||"normal",this._fontComponents.fontStyle=t,this.updateFont(this._fontComponents)}}),Object.defineProperty(i.Text.prototype,"fontVariant",{get:function(){return this._fontComponents.fontVariant||"normal"},set:function(t){t=t||"normal",this._fontComponents.fontVariant=t,this.updateFont(this._fontComponents)}}),Object.defineProperty(i.Text.prototype,"fill",{get:function(){return this.style.fill},set:function(t){t!==this.style.fill&&(this.style.fill=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"align",{get:function(){return this.style.align},set:function(t){(t=t.toLowerCase())!==this.style.align&&(this.style.align=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"resolution",{get:function(){return this._res},set:function(t){t!==this._res&&(this._res=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"tabs",{get:function(){return this.style.tabs},set:function(t){t!==this.style.tabs&&(this.style.tabs=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"boundsAlignH",{get:function(){return this.style.boundsAlignH},set:function(t){(t=t.toLowerCase())!==this.style.boundsAlignH&&(this.style.boundsAlignH=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"boundsAlignV",{get:function(){return this.style.boundsAlignV},set:function(t){(t=t.toLowerCase())!==this.style.boundsAlignV&&(this.style.boundsAlignV=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"stroke",{get:function(){return this.style.stroke},set:function(t){t!==this.style.stroke&&(this.style.stroke=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"strokeThickness",{get:function(){return this.style.strokeThickness},set:function(t){t!==this.style.strokeThickness&&(this.style.strokeThickness=Number(t),this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"wordWrap",{get:function(){return this.style.wordWrap},set:function(t){t!==this.style.wordWrap&&(this.style.wordWrap=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"wordWrapWidth",{get:function(){return this.style.wordWrapWidth},set:function(t){t!==this.style.wordWrapWidth&&(this.style.wordWrapWidth=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"lineSpacing",{get:function(){return this._lineSpacing},set:function(t){t!==this._lineSpacing&&(this._lineSpacing=parseFloat(t),this.dirty=!0,this.parent&&this.updateTransform())}}),Object.defineProperty(i.Text.prototype,"shadowOffsetX",{get:function(){return this.style.shadowOffsetX},set:function(t){t!==this.style.shadowOffsetX&&(this.style.shadowOffsetX=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"shadowOffsetY",{get:function(){return this.style.shadowOffsetY},set:function(t){t!==this.style.shadowOffsetY&&(this.style.shadowOffsetY=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"shadowColor",{get:function(){return this.style.shadowColor},set:function(t){t!==this.style.shadowColor&&(this.style.shadowColor=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"shadowBlur",{get:function(){return this.style.shadowBlur},set:function(t){t!==this.style.shadowBlur&&(this.style.shadowBlur=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"shadowStroke",{get:function(){return this.style.shadowStroke},set:function(t){t!==this.style.shadowStroke&&(this.style.shadowStroke=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"shadowFill",{get:function(){return this.style.shadowFill},set:function(t){t!==this.style.shadowFill&&(this.style.shadowFill=t,this.dirty=!0)}}),Object.defineProperty(i.Text.prototype,"width",{get:function(){return this.dirty&&(this.updateText(),this.dirty=!1),this.scale.x*(this.texture.frame.width/this.resolution)},set:function(t){this.scale.x=t/this.texture.frame.width,this._width=t}}),Object.defineProperty(i.Text.prototype,"height",{get:function(){return this.dirty&&(this.updateText(),this.dirty=!1),this.scale.y*(this.texture.frame.height/this.resolution)},set:function(t){this.scale.y=t/this.texture.frame.height,this._height=t}}),i.Text.fontPropertiesCache={},i.Text.fontPropertiesCanvas=document.createElement("canvas"),i.Text.fontPropertiesContext=i.Text.fontPropertiesCanvas.getContext("2d"),i.BitmapText=function(t,e,s,n,r,o,a){e=e||0,s=s||0,n=n||"",r=r||"",o=o||32,a=a||"left",PIXI.DisplayObjectContainer.call(this),this.type=i.BITMAPTEXT,this.physicsType=i.SPRITE,this.textWidth=0,this.textHeight=0,this.anchor=new i.Point,this._prevAnchor=new i.Point,this._glyphs=[],this._maxWidth=0,this._text=r.toString()||"",this._data=t.cache.getBitmapFont(n),this._font=n,this._fontSize=o,this._align=a,this._tint=16777215,this.updateText(),this.dirty=!1,i.Component.Core.init.call(this,t,e,s,"",null)},i.BitmapText.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),i.BitmapText.prototype.constructor=i.BitmapText,i.Component.Core.install.call(i.BitmapText.prototype,["Angle","AutoCull","Bounds","Destroy","FixedToCamera","InputEnabled","InWorld","LifeSpan","PhysicsBody","Reset"]),i.BitmapText.prototype.preUpdatePhysics=i.Component.PhysicsBody.preUpdate,i.BitmapText.prototype.preUpdateLifeSpan=i.Component.LifeSpan.preUpdate,i.BitmapText.prototype.preUpdateInWorld=i.Component.InWorld.preUpdate,i.BitmapText.prototype.preUpdateCore=i.Component.Core.preUpdate,i.BitmapText.prototype.preUpdate=function(){return!!(this.preUpdatePhysics()&&this.preUpdateLifeSpan()&&this.preUpdateInWorld())&&this.preUpdateCore()},i.BitmapText.prototype.postUpdate=function(){i.Component.PhysicsBody.postUpdate.call(this),i.Component.FixedToCamera.postUpdate.call(this),this.body&&this.body.type===i.Physics.ARCADE&&(this.textWidth===this.body.sourceWidth&&this.textHeight===this.body.sourceHeight||this.body.setSize(this.textWidth,this.textHeight))},i.BitmapText.prototype.setText=function(t){this.text=t},i.BitmapText.prototype.scanLine=function(t,e,i){for(var s=0,n=0,r=-1,o=0,a=null,h=this._maxWidth>0?this._maxWidth:null,u=[],l=0;l<i.length;l++){var c=l===i.length-1;if(/(?:\r\n|\r|\n)/.test(i.charAt(l)))return{width:n,text:i.substr(0,l),end:c,chars:u};var d=i.charCodeAt(l),p=t.chars[d],f=0;void 0===p&&(d=32,p=t.chars[d]);var g=a&&p.kerning[a]?p.kerning[a]:0;if(/(\s)/.test(i.charAt(l))&&(r=l,o=n),f=(g+p.texture.width+p.xOffset)*e,h&&n+f>=h&&r>-1)return{width:o||n,text:i.substr(0,l-(l-r)),end:!1,chars:u};n+=(p.xAdvance+g)*e,u.push(s+(p.xOffset+g)*e),s+=(p.xAdvance+g)*e,a=d}return{width:n,text:i,end:c,chars:u}},i.BitmapText.prototype.cleanText=function(t,e){void 0===e&&(e="");var i=this._data.font;if(!i)return"";for(var s=/\r\n|\n\r|\n|\r/g,n=t.replace(s,"\n").split("\n"),r=0;r<n.length;r++){for(var o="",a=n[r],h=0;h<a.length;h++)o=i.chars[a.charCodeAt(h)]?o.concat(a[h]):o.concat(e);n[r]=o}return n.join("\n")},i.BitmapText.prototype.updateText=function(){var t=this._data.font;if(t){var e=this.text,i=this._fontSize/t.size,s=[],n=0;this.textWidth=0;do{(l=this.scanLine(t,i,e)).y=n,s.push(l),l.width>this.textWidth&&(this.textWidth=l.width),n+=t.lineHeight*i,e=e.substr(l.text.length+1)}while(!1===l.end);this.textHeight=n;for(var r=0,o=0,a=this.textWidth*this.anchor.x,h=this.textHeight*this.anchor.y,u=0;u<s.length;u++){var l=s[u];"right"===this._align?o=this.textWidth-l.width:"center"===this._align&&(o=(this.textWidth-l.width)/2);for(var c=0;c<l.text.length;c++){var d=l.text.charCodeAt(c),p=t.chars[d];void 0===p&&(d=32,p=t.chars[d]);var f=this._glyphs[r];f?f.texture=p.texture:((f=new PIXI.Sprite(p.texture)).name=l.text[c],this._glyphs.push(f)),f.position.x=l.chars[c]+o-a,f.position.y=l.y+p.yOffset*i-h,f.scale.set(i),f.tint=this.tint,f.texture.requiresReTint=!0,f.cachedTint=16777215,f.parent||this.addChild(f),r++}}for(u=r;u<this._glyphs.length;u++)this.removeChild(this._glyphs[u])}},i.BitmapText.prototype.purgeGlyphs=function(){for(var t=this._glyphs.length,e=[],i=0;i<this._glyphs.length;i++)this._glyphs[i].parent!==this?this._glyphs[i].destroy():e.push(this._glyphs[i]);return this._glyphs=[],this._glyphs=e,this.updateText(),t-e.length},i.BitmapText.prototype.updateTransform=function(){!this.dirty&&this.anchor.equals(this._prevAnchor)||(this.updateText(),this.dirty=!1,this._prevAnchor.copyFrom(this.anchor)),PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)},Object.defineProperty(i.BitmapText.prototype,"align",{get:function(){return this._align},set:function(t){t===this._align||"left"!==t&&"center"!==t&&"right"!==t||(this._align=t,this.updateText())}}),Object.defineProperty(i.BitmapText.prototype,"tint",{get:function(){return this._tint},set:function(t){t!==this._tint&&(this._tint=t,this.updateText())}}),Object.defineProperty(i.BitmapText.prototype,"font",{get:function(){return this._font},set:function(t){t!==this._font&&(this._font=t.trim(),this._data=this.game.cache.getBitmapFont(this._font),this.updateText())}}),Object.defineProperty(i.BitmapText.prototype,"fontSize",{get:function(){return this._fontSize},set:function(t){(t=parseInt(t,10))!==this._fontSize&&t>0&&(this._fontSize=t,this.updateText())}}),Object.defineProperty(i.BitmapText.prototype,"text",{get:function(){return this._text},set:function(t){t!==this._text&&(this._text=t.toString()||"",this.updateText())}}),Object.defineProperty(i.BitmapText.prototype,"maxWidth",{get:function(){return this._maxWidth},set:function(t){t!==this._maxWidth&&(this._maxWidth=t,this.updateText())}}),Object.defineProperty(i.BitmapText.prototype,"smoothed",{get:function(){return!this._data.base.scaleMode},set:function(t){this._data.base.scaleMode=t?0:1,this._data.base.dirty()}}),i.RetroFont=function(t,e,s,n,r,o,a,h,u,l){if(!t.cache.checkImageKey(e))return!1;void 0!==o&&null!==o||(o=t.cache.getImage(e).width/s),this.characterWidth=s,this.characterHeight=n,this.characterSpacingX=a||0,this.characterSpacingY=h||0,this.characterPerRow=o,this.offsetX=u||0,this.offsetY=l||0,this.align="left",this.multiLine=!1,this.autoUpperCase=!0,this.customSpacingX=0,this.customSpacingY=0,this.fixedWidth=0,this.fontSet=t.cache.getImage(e),this._text="",this.grabData=[],this.frameData=new i.FrameData;for(var c=this.offsetX,d=this.offsetY,p=0,f=0;f<r.length;f++){var g=this.frameData.addFrame(new i.Frame(f,c,d,this.characterWidth,this.characterHeight));this.grabData[r.charCodeAt(f)]=g.index,++p===this.characterPerRow?(p=0,c=this.offsetX,d+=this.characterHeight+this.characterSpacingY):c+=this.characterWidth+this.characterSpacingX}t.cache.updateFrameData(e,this.frameData),this.stamp=new i.Image(t,0,0,e,0),i.RenderTexture.call(this,t,100,100,"",i.scaleModes.NEAREST),this.type=i.RETROFONT},i.RetroFont.prototype=Object.create(i.RenderTexture.prototype),i.RetroFont.prototype.constructor=i.RetroFont,i.RetroFont.ALIGN_LEFT="left",i.RetroFont.ALIGN_RIGHT="right",i.RetroFont.ALIGN_CENTER="center",i.RetroFont.TEXT_SET1=" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",i.RetroFont.TEXT_SET2=" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ",i.RetroFont.TEXT_SET3="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ",i.RetroFont.TEXT_SET4="ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789",i.RetroFont.TEXT_SET5="ABCDEFGHIJKLMNOPQRSTUVWXYZ.,/() '!?-*:0123456789",i.RetroFont.TEXT_SET6="ABCDEFGHIJKLMNOPQRSTUVWXYZ!?:;0123456789\"(),-.' ",i.RetroFont.TEXT_SET7="AGMSY+:4BHNTZ!;5CIOU.?06DJPV,(17EKQW\")28FLRX-'39",i.RetroFont.TEXT_SET8="0123456789 .ABCDEFGHIJKLMNOPQRSTUVWXYZ",i.RetroFont.TEXT_SET9="ABCDEFGHIJKLMNOPQRSTUVWXYZ()-0123456789.:,'\"?!",i.RetroFont.TEXT_SET10="ABCDEFGHIJKLMNOPQRSTUVWXYZ",i.RetroFont.TEXT_SET11="ABCDEFGHIJKLMNOPQRSTUVWXYZ.,\"-+!?()':;0123456789",i.RetroFont.prototype.setFixedWidth=function(t,e){void 0===e&&(e="left"),this.fixedWidth=t,this.align=e},i.RetroFont.prototype.setText=function(t,e,i,s,n,r){this.multiLine=e||!1,this.customSpacingX=i||0,this.customSpacingY=s||0,this.align=n||"left",this.autoUpperCase=!r,t.length>0&&(this.text=t)},i.RetroFont.prototype.buildRetroFontText=function(){var t=0,e=0;if(this.clear(),this.multiLine){var s=this._text.split("\n");this.fixedWidth>0?this.resize(this.fixedWidth,s.length*(this.characterHeight+this.customSpacingY)-this.customSpacingY,!0):this.resize(this.getLongestLine()*(this.characterWidth+this.customSpacingX),s.length*(this.characterHeight+this.customSpacingY)-this.customSpacingY,!0);for(var n=0;n<s.length;n++)t=0,this.align===i.RetroFont.ALIGN_RIGHT?t=this.width-s[n].length*(this.characterWidth+this.customSpacingX):this.align===i.RetroFont.ALIGN_CENTER&&(t=this.width/2-s[n].length*(this.characterWidth+this.customSpacingX)/2,t+=this.customSpacingX/2),t<0&&(t=0),this.pasteLine(s[n],t,e,this.customSpacingX),e+=this.characterHeight+this.customSpacingY}else this.fixedWidth>0?this.resize(this.fixedWidth,this.characterHeight,!0):this.resize(this._text.length*(this.characterWidth+this.customSpacingX),this.characterHeight,!0),t=0,this.align===i.RetroFont.ALIGN_RIGHT?t=this.width-this._text.length*(this.characterWidth+this.customSpacingX):this.align===i.RetroFont.ALIGN_CENTER&&(t=this.width/2-this._text.length*(this.characterWidth+this.customSpacingX)/2,t+=this.customSpacingX/2),t<0&&(t=0),this.pasteLine(this._text,t,0,this.customSpacingX);this.requiresReTint=!0},i.RetroFont.prototype.pasteLine=function(t,e,i,s){for(var n=0;n<t.length;n++)if(" "===t.charAt(n))e+=this.characterWidth+s;else if(this.grabData[t.charCodeAt(n)]>=0&&(this.stamp.frame=this.grabData[t.charCodeAt(n)],this.renderXY(this.stamp,e,i,!1),(e+=this.characterWidth+s)>this.width))break},i.RetroFont.prototype.getLongestLine=function(){var t=0;if(this._text.length>0)for(var e=this._text.split("\n"),i=0;i<e.length;i++)e[i].length>t&&(t=e[i].length);return t},i.RetroFont.prototype.removeUnsupportedCharacters=function(t){for(var e="",i=0;i<this._text.length;i++){var s=this._text[i],n=s.charCodeAt(0);(this.grabData[n]>=0||!t&&"\n"===s)&&(e=e.concat(s))}return e},i.RetroFont.prototype.updateOffset=function(t,e){if(this.offsetX!==t||this.offsetY!==e){for(var i=t-this.offsetX,s=e-this.offsetY,n=this.game.cache.getFrameData(this.stamp.key).getFrames(),r=n.length;r--;)n[r].x+=i,n[r].y+=s;this.buildRetroFontText()}},Object.defineProperty(i.RetroFont.prototype,"text",{get:function(){return this._text},set:function(t){var e;(e=this.autoUpperCase?t.toUpperCase():t)!==this._text&&(this._text=e,this.removeUnsupportedCharacters(this.multiLine),this.buildRetroFontText())}}),Object.defineProperty(i.RetroFont.prototype,"smoothed",{get:function(){return this.stamp.smoothed},set:function(t){this.stamp.smoothed=t,this.buildRetroFontText()}}),i.Rope=function(t,e,s,n,r,o){this.points=o||[],this._hasUpdateAnimation=!1,this._updateAnimationCallback=null,e=e||0,s=s||0,n=n||null,r=r||null,this.type=i.ROPE,PIXI.DisplayObjectContainer.call(this),this.texture=i.Cache.DEFAULT,this.uvs=new Float32Array([0,1,1,1,1,0,0,1]),this.vertices=new Float32Array([0,0,100,0,100,100,0,100]),this.colors=new Float32Array([1,1,1,1]),this.indices=new Uint16Array([0,1,2,3]),o&&(this.vertices=new Float32Array(4*o.length),this.uvs=new Float32Array(4*o.length),this.colors=new Float32Array(2*o.length),this.indices=new Uint16Array(2*o.length)),this.dirty=!0,this.canvasPadding=0,this.drawMode=i.Rope.TRIANGLE_STRIP,i.Component.Core.init.call(this,t,e,s,n,r),this.refresh()},i.Rope.prototype=Object.create(PIXI.DisplayObjectContainer.prototype),i.Rope.prototype.constructor=i.Rope,i.Component.Core.install.call(i.Rope.prototype,["Angle","Animation","AutoCull","Bounds","BringToTop","Crop","Delta","Destroy","FixedToCamera","InWorld","LifeSpan","LoadTexture","Overlap","PhysicsBody","Reset","ScaleMinMax","Smoothed"]),i.Rope.prototype.preUpdatePhysics=i.Component.PhysicsBody.preUpdate,i.Rope.prototype.preUpdateLifeSpan=i.Component.LifeSpan.preUpdate,i.Rope.prototype.preUpdateInWorld=i.Component.InWorld.preUpdate,i.Rope.prototype.preUpdateCore=i.Component.Core.preUpdate,i.Rope.TRIANGLE_STRIP=0,i.Rope.TRIANGLES=1,i.Rope.prototype.preUpdate=function(){return!!(this.preUpdatePhysics()&&this.preUpdateLifeSpan()&&this.preUpdateInWorld())&&this.preUpdateCore()},i.Rope.prototype.update=function(){this._hasUpdateAnimation&&this.updateAnimation.call(this)},i.Rope.prototype.reset=function(t,e){return i.Component.Reset.prototype.reset.call(this,t,e),this},i.Rope.prototype.refresh=function(){var t=this.points;if(!(t.length<1)){var e=this.uvs,i=this.indices,s=this.colors;this.count-=.2,e[0]=0,e[1]=0,e[2]=0,e[3]=1,s[0]=1,s[1]=1,i[0]=0,i[1]=1;for(var n,r,o=t.length,a=1;a<o;a++)r=a/(o-1),e[n=4*a]=r,e[n+1]=0,e[n+2]=r,e[n+3]=1,s[n=2*a]=1,s[n+1]=1,i[n=2*a]=n,i[n+1]=n+1}},i.Rope.prototype.updateTransform=function(){var t=this.points;if(!(t.length<1)){var e,i=t[0],s={x:0,y:0};this.count-=.2;for(var n,r,o,a,h=this.vertices,u=t.length,l=0;l<u;l++)n=t[l],r=4*l,e=l<t.length-1?t[l+1]:n,s.y=-(e.x-i.x),s.x=e.y-i.y,10*(1-l/(u-1))>1&&1,o=Math.sqrt(s.x*s.x+s.y*s.y),a=this.texture.height/2,s.x/=o,s.y/=o,s.x*=a,s.y*=a,h[r]=n.x+s.x,h[r+1]=n.y+s.y,h[r+2]=n.x-s.x,h[r+3]=n.y-s.y,i=n;PIXI.DisplayObjectContainer.prototype.updateTransform.call(this)}},i.Rope.prototype.setTexture=function(t){this.texture=t},i.Rope.prototype._renderWebGL=function(t){!this.visible||this.alpha<=0||(t.spriteBatch.stop(),this._vertexBuffer||this._initWebGL(t),t.shaderManager.setShader(t.shaderManager.stripShader),this._renderStrip(t),t.spriteBatch.start())},i.Rope.prototype._initWebGL=function(t){var e=t.gl;this._vertexBuffer=e.createBuffer(),this._indexBuffer=e.createBuffer(),this._uvBuffer=e.createBuffer(),this._colorBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this._vertexBuffer),e.bufferData(e.ARRAY_BUFFER,this.vertices,e.DYNAMIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this._uvBuffer),e.bufferData(e.ARRAY_BUFFER,this.uvs,e.STATIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,this._colorBuffer),e.bufferData(e.ARRAY_BUFFER,this.colors,e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this._indexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,this.indices,e.STATIC_DRAW)},i.Rope.prototype._renderStrip=function(t){var e=t.gl,s=t.projection,n=t.offset,r=t.shaderManager.stripShader,o=this.drawMode===i.Rope.TRIANGLE_STRIP?e.TRIANGLE_STRIP:e.TRIANGLES;t.blendModeManager.setBlendMode(this.blendMode),e.uniformMatrix3fv(r.translationMatrix,!1,this.worldTransform.toArray(!0)),e.uniform2f(r.projectionVector,s.x,-s.y),e.uniform2f(r.offsetVector,-n.x,-n.y),e.uniform1f(r.alpha,this.worldAlpha),this.dirty?(this.dirty=!1,e.bindBuffer(e.ARRAY_BUFFER,this._vertexBuffer),e.bufferData(e.ARRAY_BUFFER,this.vertices,e.STATIC_DRAW),e.vertexAttribPointer(r.aVertexPosition,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,this._uvBuffer),e.bufferData(e.ARRAY_BUFFER,this.uvs,e.STATIC_DRAW),e.vertexAttribPointer(r.aTextureCoord,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),this.texture.baseTexture._dirty[e.id]?t.renderer.updateTexture(this.texture.baseTexture):e.bindTexture(e.TEXTURE_2D,this.texture.baseTexture._glTextures[e.id]),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this._indexBuffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,this.indices,e.STATIC_DRAW)):(e.bindBuffer(e.ARRAY_BUFFER,this._vertexBuffer),e.bufferSubData(e.ARRAY_BUFFER,0,this.vertices),e.vertexAttribPointer(r.aVertexPosition,2,e.FLOAT,!1,0,0),e.bindBuffer(e.ARRAY_BUFFER,this._uvBuffer),e.vertexAttribPointer(r.aTextureCoord,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),this.texture.baseTexture._dirty[e.id]?t.renderer.updateTexture(this.texture.baseTexture):e.bindTexture(e.TEXTURE_2D,this.texture.baseTexture._glTextures[e.id]),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this._indexBuffer)),e.drawElements(o,this.indices.length,e.UNSIGNED_SHORT,0)},i.Rope.prototype._renderCanvas=function(t){var e=t.context,s=this.worldTransform,n=s.tx*t.resolution+t.shakeX,r=s.ty*t.resolution+t.shakeY;t.roundPixels?e.setTransform(s.a,s.b,s.c,s.d,0|n,0|r):e.setTransform(s.a,s.b,s.c,s.d,n,r),this.drawMode===i.Rope.TRIANGLE_STRIP?this._renderCanvasTriangleStrip(e):this._renderCanvasTriangles(e)},i.Rope.prototype._renderCanvasTriangleStrip=function(t){var e=this.vertices,i=this.uvs,s=e.length/2;this.count++;for(var n=0;n<s-2;n++){var r=2*n;this._renderCanvasDrawTriangle(t,e,i,r,r+2,r+4)}},i.Rope.prototype._renderCanvasTriangles=function(t){var e=this.vertices,i=this.uvs,s=this.indices,n=s.length;this.count++;for(var r=0;r<n;r+=3){var o=2*s[r],a=2*s[r+1],h=2*s[r+2];this._renderCanvasDrawTriangle(t,e,i,o,a,h)}},i.Rope.prototype._renderCanvasDrawTriangle=function(t,e,i,s,n,r){var o=this.texture.baseTexture.source,a=this.texture.width,h=this.texture.height,u=e[s],l=e[n],c=e[r],d=e[s+1],p=e[n+1],f=e[r+1],g=i[s]*a,m=i[n]*a,y=i[r]*a,v=i[s+1]*h,x=i[n+1]*h,_=i[r+1]*h;if(this.canvasPadding>0){var b=this.canvasPadding/this.worldTransform.a,T=this.canvasPadding/this.worldTransform.d,w=(u+l+c)/3,C=(d+p+f)/3,S=u-w,P=d-C,E=Math.sqrt(S*S+P*P);u=w+S/E*(E+b),d=C+P/E*(E+T),P=p-C,l=w+(S=l-w)/(E=Math.sqrt(S*S+P*P))*(E+b),p=C+P/E*(E+T),P=f-C,c=w+(S=c-w)/(E=Math.sqrt(S*S+P*P))*(E+b),f=C+P/E*(E+T)}t.save(),t.beginPath(),t.moveTo(u,d),t.lineTo(l,p),t.lineTo(c,f),t.closePath(),t.clip();var A=g*x+v*y+m*_-x*y-v*m-g*_,R=u*x+v*c+l*_-x*c-v*l-u*_,M=g*l+u*y+m*c-l*y-u*m-g*c,I=g*x*c+v*l*y+u*m*_-u*x*y-v*m*c-g*l*_,L=d*x+v*f+p*_-x*f-v*p-d*_,O=g*p+d*y+m*f-p*y-d*m-g*f,k=g*x*f+v*p*y+d*m*_-d*x*y-v*m*f-g*p*_;t.transform(R/A,L/A,M/A,O/A,I/A,k/A),t.drawImage(o,0,0),t.restore()},i.Rope.prototype.renderStripFlat=function(t){var e=this.context,i=t.vertices,s=i.length/2;this.count++,e.beginPath();for(var n=1;n<s-2;n++){var r=2*n,o=i[r],a=i[r+2],h=i[r+4],u=i[r+1],l=i[r+3],c=i[r+5];e.moveTo(o,u),e.lineTo(a,l),e.lineTo(h,c)}e.fillStyle="#FF0000",e.fill(),e.closePath()},i.Rope.prototype.getBounds=function(t){for(var e=t||this.worldTransform,i=e.a,s=e.b,n=e.c,r=e.d,o=e.tx,a=e.ty,h=-1/0,u=-1/0,l=1/0,c=1/0,d=this.vertices,p=0;p<d.length;p+=2){var f=d[p],g=d[p+1],m=i*f+n*g+o,y=r*g+s*f+a;l=m<l?m:l,c=y<c?y:c,h=m>h?m:h,u=y>u?y:u}if(l===-1/0||u===1/0)return PIXI.EmptyRectangle;var v=this._bounds;return v.x=l,v.width=h-l,v.y=c,v.height=u-c,this._currentBounds=v,v},Object.defineProperty(i.Rope.prototype,"updateAnimation",{get:function(){return this._updateAnimation},set:function(t){t&&"function"==typeof t?(this._hasUpdateAnimation=!0,this._updateAnimation=t):(this._hasUpdateAnimation=!1,this._updateAnimation=null)}}),Object.defineProperty(i.Rope.prototype,"segments",{get:function(){for(var t,e,s,n,r,o,a,h,u=[],l=0;l<this.points.length;l++)t=4*l,e=this.vertices[t]*this.scale.x,s=this.vertices[t+1]*this.scale.y,n=this.vertices[t+4]*this.scale.x,r=this.vertices[t+3]*this.scale.y,o=i.Math.difference(e,n),a=i.Math.difference(s,r),e+=this.world.x,s+=this.world.y,h=new i.Rectangle(e,s,o,a),u.push(h);return u}}),i.TileSprite=function(t,e,s,n,r,o,a){e=e||0,s=s||0,n=n||256,r=r||256,o=o||null,a=a||null,PIXI.Sprite.call(this,new PIXI.Texture(i.Cache.DEFAULT.baseTexture),n,r),this.type=i.TILESPRITE,this.physicsType=i.SPRITE,this._scroll=new i.Point,this.tileScale=new i.Point(1,1),this.tileScaleOffset=new i.Point(1,1),this.tilePosition=new i.Point,this.textureDebug=!1,this.canvasBuffer=null,this.tilingTexture=null,this.tilePattern=null,this.refreshTexture=!0,this.frameWidth=0,this.frameHeight=0,this._width=n,this._height=r,i.Component.Core.init.call(this,t,e,s,o,a)},i.TileSprite.prototype=Object.create(PIXI.Sprite.prototype),i.TileSprite.prototype.constructor=i.TileSprite,i.Component.Core.install.call(i.TileSprite.prototype,["Angle","Animation","AutoCull","Bounds","BringToTop","Destroy","FixedToCamera","Health","InCamera","InputEnabled","InWorld","LifeSpan","LoadTexture","Overlap","PhysicsBody","Reset","Smoothed"]),i.TileSprite.prototype.preUpdatePhysics=i.Component.PhysicsBody.preUpdate,i.TileSprite.prototype.preUpdateLifeSpan=i.Component.LifeSpan.preUpdate,i.TileSprite.prototype.preUpdateInWorld=i.Component.InWorld.preUpdate,i.TileSprite.prototype.preUpdateCore=i.Component.Core.preUpdate,i.TileSprite.prototype.preUpdate=function(){return 0!==this._scroll.x&&(this.tilePosition.x+=this._scroll.x*this.game.time.physicsElapsed),0!==this._scroll.y&&(this.tilePosition.y+=this._scroll.y*this.game.time.physicsElapsed),!!(this.preUpdatePhysics()&&this.preUpdateLifeSpan()&&this.preUpdateInWorld())&&this.preUpdateCore()},i.TileSprite.prototype.autoScroll=function(t,e){return this._scroll.set(t,e),this},i.TileSprite.prototype.stopScroll=function(){return this._scroll.set(0,0),this},i.TileSprite.prototype.destroy=function(t){i.Component.Destroy.prototype.destroy.call(this,t),PIXI.Sprite.prototype.destroy.call(this),this.canvasBuffer&&(this.canvasBuffer.destroy(),this.canvasBuffer=null),this.tileScale=null,this.tileScaleOffset=null,this.tilePosition=null,this.tilingTexture&&(this.tilingTexture.destroy(!0),this.tilingTexture=null)},i.TileSprite.prototype.reset=function(t,e){return i.Component.Reset.prototype.reset.call(this,t,e),this.tilePosition.x=0,this.tilePosition.y=0,this},i.TileSprite.prototype.setTexture=function(t){return this.texture!==t&&(this.texture=t,this.refreshTexture=!0,this.cachedTint=16777215),this},i.TileSprite.prototype._renderWebGL=function(t){if(this.visible&&this.renderable&&0!==this.alpha){if(this._mask&&(t.spriteBatch.stop(),t.maskManager.pushMask(this.mask,t),t.spriteBatch.start()),this._filters&&(t.spriteBatch.flush(),t.filterManager.pushFilter(this._filterBlock)),this.refreshTexture){if(this.generateTilingTexture(!0,t),!this.tilingTexture)return;this.tilingTexture.needsUpdate&&(this.tilingTexture.baseTexture.textureIndex=this.texture.baseTexture.textureIndex,t.renderer.updateTexture(this.tilingTexture.baseTexture),this.tilingTexture.needsUpdate=!1)}t.spriteBatch.renderTilingSprite(this);for(var e=0;e<this.children.length;e++)this.children[e]._renderWebGL(t);var i=!1;this._filters&&(i=!0,t.spriteBatch.stop(),t.filterManager.popFilter()),this._mask&&(i||t.spriteBatch.stop(),t.maskManager.popMask(this._mask,t)),i&&t.spriteBatch.start()}},i.TileSprite.prototype._renderCanvas=function(t){if(this.visible&&this.renderable&&0!==this.alpha){var e=t.context;this._mask&&t.maskManager.pushMask(this._mask,t),e.globalAlpha=this.worldAlpha;var i=this.worldTransform,s=t.resolution,n=i.tx*s+t.shakeX,r=i.ty*s+t.shakeY;if(e.setTransform(i.a*s,i.b*s,i.c*s,i.d*s,n,r),16777215===this.tint||!this.texture.requiresReTint&&this.cachedTint===this.tint||(this.tintedTexture=PIXI.CanvasTinter.getTintedTexture(this,this.tint),this.cachedTint=this.tint,this.texture.requiresReTint=!1,this.refreshTexture=!0),this.refreshTexture){if(this.generateTilingTexture(!1,t),!this.tilingTexture)return;this.tilePattern=e.createPattern(this.tilingTexture.baseTexture.source,"repeat")}var o=t.currentBlendMode;this.blendMode!==t.currentBlendMode&&(t.currentBlendMode=this.blendMode,e.globalCompositeOperation=PIXI.blendModesCanvas[t.currentBlendMode]);var a=this.tilePosition,h=this.tileScale;a.x%=this.tilingTexture.baseTexture.width,a.y%=this.tilingTexture.baseTexture.height,e.scale(h.x,h.y),e.translate(a.x+this.anchor.x*-this._width,a.y+this.anchor.y*-this._height),e.fillStyle=this.tilePattern,n=-a.x,r=-a.y;var u=this._width/h.x,l=this._height/h.y;t.roundPixels&&(n|=0,r|=0,u|=0,l|=0),e.fillRect(n,r,u,l),e.scale(1/h.x,1/h.y),e.translate(-a.x+this.anchor.x*this._width,-a.y+this.anchor.y*this._height),this._mask&&t.maskManager.popMask(t);for(var c=0;c<this.children.length;c++)this.children[c]._renderCanvas(t);o!==this.blendMode&&(t.currentBlendMode=o,e.globalCompositeOperation=PIXI.blendModesCanvas[o])}},i.TileSprite.prototype.onTextureUpdate=function(){},i.TileSprite.prototype.generateTilingTexture=function(t){if(this.texture.baseTexture.hasLoaded){var e=this.texture,s=e.frame,n=this._frame.sourceSizeW||this._frame.width,r=this._frame.sourceSizeH||this._frame.height,o=0,a=0;this._frame.trimmed&&(o=this._frame.spriteSourceSizeX,a=this._frame.spriteSourceSizeY),t&&(n=i.Math.getNextPowerOfTwo(n),r=i.Math.getNextPowerOfTwo(r)),this.canvasBuffer?(this.canvasBuffer.resize(n,r),this.tilingTexture.baseTexture.width=n,this.tilingTexture.baseTexture.height=r,this.tilingTexture.needsUpdate=!0):(this.canvasBuffer=new PIXI.CanvasBuffer(n,r),this.tilingTexture=PIXI.Texture.fromCanvas(this.canvasBuffer.canvas),this.tilingTexture.isTiling=!0,this.tilingTexture.needsUpdate=!0),this.textureDebug&&(this.canvasBuffer.context.strokeStyle="#00ff00",this.canvasBuffer.context.strokeRect(0,0,n,r));var h=e.crop.width,u=e.crop.height;h===n&&u===r||(h=n,u=r);var l=this.tintedTexture?this.tintedTexture:e.baseTexture.source;this.canvasBuffer.context.drawImage(l,e.crop.x,e.crop.y,e.crop.width,e.crop.height,o,a,h,u),this.tileScaleOffset.x=s.width/n,this.tileScaleOffset.y=s.height/r,this.refreshTexture=!1,this.tilingTexture.baseTexture._powerOf2=!0}},i.TileSprite.prototype.getBounds=function(){var t=this._width,e=this._height,i=t*(1-this.anchor.x),s=t*-this.anchor.x,n=e*(1-this.anchor.y),r=e*-this.anchor.y,o=this.worldTransform,a=o.a,h=o.b,u=o.c,l=o.d,c=o.tx,d=o.ty,p=a*s+u*r+c,f=l*r+h*s+d,g=a*i+u*r+c,m=l*r+h*i+d,y=a*i+u*n+c,v=l*n+h*i+d,x=a*s+u*n+c,_=l*n+h*s+d,b=-1/0,T=-1/0,w=1/0,C=1/0;w=x<(w=y<(w=g<(w=p<w?p:w)?g:w)?y:w)?x:w,C=_<(C=v<(C=m<(C=f<C?f:C)?m:C)?v:C)?_:C,b=x>(b=y>(b=g>(b=p>b?p:b)?g:b)?y:b)?x:b,T=_>(T=v>(T=m>(T=f>T?f:T)?m:T)?v:T)?_:T;var S=this._bounds;return S.x=w,S.width=b-w,S.y=C,S.height=T-C,this._currentBounds=S,S},Object.defineProperty(i.TileSprite.prototype,"width",{get:function(){return this._width},set:function(t){this._width=t}}),Object.defineProperty(i.TileSprite.prototype,"height",{get:function(){return this._height},set:function(t){this._height=t}}),i.CanvasPool={create:function(t,e,s){var n,r=i.CanvasPool.getFirst();if(-1===r){var o={parent:t,canvas:document.createElement("canvas")};i.CanvasPool.pool.push(o),n=o.canvas}else i.CanvasPool.pool[r].parent=t,n=i.CanvasPool.pool[r].canvas;return void 0!==e&&(n.width=e,n.height=s),n},getFirst:function(){for(var t=i.CanvasPool.pool,e=0;e<t.length;e++)if(!t[e].parent)return e;return-1},remove:function(t){for(var e=i.CanvasPool.pool,s=0;s<e.length;s++)e[s].parent===t&&(e[s].parent=null,e[s].canvas.width=1,e[s].canvas.height=1)},removeByCanvas:function(t){for(var e=i.CanvasPool.pool,s=0;s<e.length;s++)e[s].canvas===t&&(e[s].parent=null,e[s].canvas.width=1,e[s].canvas.height=1)},getTotal:function(){for(var t=i.CanvasPool.pool,e=0,s=0;s<t.length;s++)t[s].parent&&e++;return e},getFree:function(){for(var t=i.CanvasPool.pool,e=0,s=0;s<t.length;s++)t[s].parent||e++;return e},log:function(){console.log("CanvasPool: %s used, %s free, %s total",this.getTotal(),this.getFree(),this.pool.length)}},i.CanvasPool.pool=[],Object.defineProperty(i.CanvasPool,"length",{get:function(){return this.pool.length}}),i.Device=function(){this.deviceReadyAt=0,this.initialized=!1,this.desktop=!1,this.iOS=!1,this.iOSVersion=0,this.cocoonJS=!1,this.cocoonJSApp=!1,this.cordova=!1,this.node=!1,this.nodeWebkit=!1,this.electron=!1,this.ejecta=!1,this.crosswalk=!1,this.android=!1,this.chromeOS=!1,this.linux=!1,this.macOS=!1,this.windows=!1,this.windowsPhone=!1,this.canvas=!1,this.canvasBitBltShift=null,this.canHandleAlpha=!1,this.canUseMultiply=!1,this.webGL=!1,this.file=!1,this.fileSystem=!1,this.localStorage=!1,this.worker=!1,this.css3D=!1,this.pointerLock=!1,this.typedArray=!1,this.vibration=!1,this.getUserMedia=!0,this.quirksMode=!1,this.touch=!1,this.mspointer=!1,this.wheelEvent=null,this.arora=!1,this.chrome=!1,this.chromeVersion=0,this.epiphany=!1,this.firefox=!1,this.firefoxVersion=0,this.ie=!1,this.ieVersion=0,this.trident=!1,this.tridentVersion=0,this.edge=!1,this.mobileSafari=!1,this.midori=!1,this.opera=!1,this.safari=!1,this.safariVersion=0,this.webApp=!1,this.silk=!1,this.audioData=!1,this.webAudio=!1,this.ogg=!1,this.opus=!1,this.mp3=!1,this.wav=!1,this.m4a=!1,this.webm=!1,this.dolby=!1,this.oggVideo=!1,this.h264Video=!1,this.mp4Video=!1,this.webmVideo=!1,this.vp9Video=!1,this.hlsVideo=!1,this.iPhone=!1,this.iPhone4=!1,this.iPad=!1,this.pixelRatio=0,this.littleEndian=!1,this.LITTLE_ENDIAN=!1,this.support32bit=!1,this.fullscreen=!1,this.requestFullscreen="",this.cancelFullscreen="",this.fullscreenKeyboard=!1},i.Device=new i.Device,i.Device.onInitialized=new i.Signal,i.Device.whenReady=function(t,e,i){var s=this._readyCheck;if(this.deviceReadyAt||!s)t.call(e,this);else if(s._monitor||i)s._queue=s._queue||[],s._queue.push([t,e]);else{s._monitor=s.bind(this),s._queue=s._queue||[],s._queue.push([t,e]);var n=void 0!==window.cordova,r=navigator.isCocoonJS;"complete"===document.readyState||"interactive"===document.readyState?window.setTimeout(s._monitor,0):n&&!r?document.addEventListener("deviceready",s._monitor,!1):(document.addEventListener("DOMContentLoaded",s._monitor,!1),window.addEventListener("load",s._monitor,!1))}},i.Device._readyCheck=function(){var t=this._readyCheck;if(document.body){if(!this.deviceReadyAt){this.deviceReadyAt=Date.now(),document.removeEventListener("deviceready",t._monitor),document.removeEventListener("DOMContentLoaded",t._monitor),window.removeEventListener("load",t._monitor),this._initialize(),this.initialized=!0,this.onInitialized.dispatch(this);for(var e;e=t._queue.shift();){var i=e[0],s=e[1];i.call(s,this)}this._readyCheck=null,this._initialize=null,this.onInitialized=null}}else window.setTimeout(t._monitor,20)},i.Device._initialize=function(){function t(){var t=new ArrayBuffer(4),e=new Uint8Array(t),i=new Uint32Array(t);return e[0]=161,e[1]=178,e[2]=195,e[3]=212,3569595041===i[0]||2712847316!==i[0]&&null}function e(){if(void 0===Uint8ClampedArray)return!1;var t=i.CanvasPool.create(this,1,1).getContext("2d");if(!t)return!1;var e=t.createImageData(1,1);return i.CanvasPool.remove(this),e.data instanceof Uint8ClampedArray}var s=this;!function(){var t=navigator.userAgent;/Playstation Vita/.test(t)?s.vita=!0:/Kindle/.test(t)||/\bKF[A-Z][A-Z]+/.test(t)||/Silk.*Mobile Safari/.test(t)?s.kindle=!0:/Android/.test(t)?s.android=!0:/CrOS/.test(t)?s.chromeOS=!0:/iP[ao]d|iPhone/i.test(t)?(s.iOS=!0,navigator.appVersion.match(/OS (\d+)/),s.iOSVersion=parseInt(RegExp.$1,10)):/Linux/.test(t)?s.linux=!0:/Mac OS/.test(t)?s.macOS=!0:/Windows/.test(t)&&(s.windows=!0),(/Windows Phone/i.test(t)||/IEMobile/i.test(t))&&(s.android=!1,s.iOS=!1,s.macOS=!1,s.windows=!0,s.windowsPhone=!0);var e=/Silk/.test(t);(s.windows||s.macOS||s.linux&&!e||s.chromeOS)&&(s.desktop=!0),(s.windowsPhone||/Windows NT/i.test(t)&&/Touch/i.test(t))&&(s.desktop=!1)}(),function(){var t=navigator.userAgent;if(/Arora/.test(t)?s.arora=!0:/Edge\/\d+/.test(t)?s.edge=!0:/Chrome\/(\d+)/.test(t)&&!s.windowsPhone?(s.chrome=!0,s.chromeVersion=parseInt(RegExp.$1,10)):/Epiphany/.test(t)?s.epiphany=!0:/Firefox\D+(\d+)/.test(t)?(s.firefox=!0,s.firefoxVersion=parseInt(RegExp.$1,10)):/AppleWebKit/.test(t)&&s.iOS?s.mobileSafari=!0:/MSIE (\d+\.\d+);/.test(t)?(s.ie=!0,s.ieVersion=parseInt(RegExp.$1,10)):/Midori/.test(t)?s.midori=!0:/Opera/.test(t)?s.opera=!0:/Safari\/(\d+)/.test(t)&&!s.windowsPhone?(s.safari=!0,/Version\/(\d+)\./.test(t)&&(s.safariVersion=parseInt(RegExp.$1,10))):/Trident\/(\d+\.\d+)(.*)rv:(\d+\.\d+)/.test(t)&&(s.ie=!0,s.trident=!0,s.tridentVersion=parseInt(RegExp.$1,10),s.ieVersion=parseInt(RegExp.$3,10)),/Silk/.test(t)&&(s.silk=!0),navigator.standalone&&(s.webApp=!0),void 0!==window.cordova&&(s.cordova=!0),"undefined"!=typeof process&&"undefined"!=typeof require&&(s.node=!0),s.node&&"object"==typeof process.versions&&(s.nodeWebkit=!!process.versions["node-webkit"],s.electron=!!process.versions.electron),navigator.isCocoonJS&&(s.cocoonJS=!0),s.cocoonJS)try{s.cocoonJSApp="undefined"!=typeof CocoonJS}catch(t){s.cocoonJSApp=!1}void 0!==window.ejecta&&(s.ejecta=!0),/Crosswalk/.test(t)&&(s.crosswalk=!0)}(),function(){s.audioData=!!window.Audio,s.webAudio=!(!window.AudioContext&&!window.webkitAudioContext);var t=document.createElement("audio");try{if(t.canPlayType&&(t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,"")&&(s.ogg=!0),(t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,"")||t.canPlayType("audio/opus;").replace(/^no$/,""))&&(s.opus=!0),t.canPlayType("audio/mpeg;").replace(/^no$/,"")&&(s.mp3=!0),t.canPlayType('audio/wav; codecs="1"').replace(/^no$/,"")&&(s.wav=!0),(t.canPlayType("audio/x-m4a;")||t.canPlayType("audio/aac;").replace(/^no$/,""))&&(s.m4a=!0),t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")&&(s.webm=!0),""!==t.canPlayType('audio/mp4;codecs="ec-3"')))if(s.edge)s.dolby=!0;else if(s.safari&&s.safariVersion>=9&&/Mac OS X (\d+)_(\d+)/.test(navigator.userAgent)){var e=parseInt(RegExp.$1,10),i=parseInt(RegExp.$2,10);(10===e&&i>=11||e>10)&&(s.dolby=!0)}}catch(t){}}(),function(){var t=document.createElement("video");try{!!t.canPlayType&&(t.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,"")&&(s.oggVideo=!0),t.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,"")&&(s.h264Video=!0,s.mp4Video=!0),t.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")&&(s.webmVideo=!0),t.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,"")&&(s.vp9Video=!0),t.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,"")&&(s.hlsVideo=!0))}catch(t){}}(),function(){var t,e=document.createElement("p"),i={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.insertBefore(e,null);for(var n in i)void 0!==e.style[n]&&(e.style[n]="translate3d(1px,1px,1px)",t=window.getComputedStyle(e).getPropertyValue(i[n]));document.body.removeChild(e),s.css3D=void 0!==t&&t.length>0&&"none"!==t}(),s.pixelRatio=window.devicePixelRatio||1,s.iPhone=-1!==navigator.userAgent.toLowerCase().indexOf("iphone"),s.iPhone4=2===s.pixelRatio&&s.iPhone,s.iPad=-1!==navigator.userAgent.toLowerCase().indexOf("ipad"),"undefined"!=typeof Int8Array?s.typedArray=!0:s.typedArray=!1,"undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint32Array&&(s.littleEndian=t(),s.LITTLE_ENDIAN=s.littleEndian),s.support32bit="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof Int32Array&&null!==s.littleEndian&&e(),navigator.vibrate=navigator.vibrate||navigator.webkitVibrate||navigator.mozVibrate||navigator.msVibrate,navigator.vibrate&&(s.vibration=!0),function(){s.canvas=!!window.CanvasRenderingContext2D||s.cocoonJS;try{s.localStorage=!!localStorage.getItem}catch(t){s.localStorage=!1}s.file=!!(window.File&&window.FileReader&&window.FileList&&window.Blob),s.fileSystem=!!window.requestFileSystem,s.webGL=!!window.WebGLRenderingContext,s.worker=!!window.Worker,s.pointerLock="pointerLockElement"in document||"mozPointerLockElement"in document||"webkitPointerLockElement"in document,s.quirksMode="CSS1Compat"!==document.compatMode,navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia,window.URL=window.URL||window.webkitURL||window.mozURL||window.msURL,s.getUserMedia=s.getUserMedia&&!!navigator.getUserMedia&&!!window.URL,s.firefox&&s.firefoxVersion<21&&(s.getUserMedia=!1),!s.iOS&&(s.ie||s.firefox||s.chrome)&&(s.canvasBitBltShift=!0),(s.safari||s.mobileSafari)&&(s.canvasBitBltShift=!1)}(),function(){var t=i.CanvasPool.create(this,6,1),e=t.getContext("2d");e.fillStyle="rgba(10, 20, 30, 0.5)",e.fillRect(0,0,1,1);var n=e.getImageData(0,0,1,1);if(n){e.putImageData(n,1,0);var r=e.getImageData(1,0,1,1);s.canHandleAlpha=r.data[0]===n.data[0]&&r.data[1]===n.data[1]&&r.data[2]===n.data[2]&&r.data[3]===n.data[3]}e.globalCompositeOperation="multiply",s.canUseMultiply="multiply"===e.globalCompositeOperation,i.CanvasPool.removeByCanvas(t),PIXI.CanvasTinter.tintMethod=s.canUseMultiply?PIXI.CanvasTinter.tintWithMultiply:PIXI.CanvasTinter.tintWithPerPixel}(),function(){for(var t=["requestFullscreen","requestFullScreen","webkitRequestFullscreen","webkitRequestFullScreen","msRequestFullscreen","msRequestFullScreen","mozRequestFullScreen","mozRequestFullscreen"],e=document.createElement("div"),i=0;i<t.length;i++)if(e[t[i]]){s.fullscreen=!0,s.requestFullscreen=t[i];break}var n=["cancelFullScreen","exitFullscreen","webkitCancelFullScreen","webkitExitFullscreen","msCancelFullScreen","msExitFullscreen","mozCancelFullScreen","mozExitFullscreen"];if(s.fullscreen)for(i=0;i<n.length;i++)if(document[n[i]]){s.cancelFullscreen=n[i];break}window.Element&&Element.ALLOW_KEYBOARD_INPUT&&(s.fullscreenKeyboard=!0)}(),("ontouchstart"in document.documentElement||window.navigator.maxTouchPoints&&window.navigator.maxTouchPoints>=1)&&(s.touch=!0),(window.PointerEvent||window.MSPointerEvent||window.navigator.msPointerEnabled||window.navigator.pointerEnabled)&&(s.mspointer=!0),s.cocoonJS||("onwheel"in window||s.ie&&"WheelEvent"in window?s.wheelEvent="wheel":"onmousewheel"in window?s.wheelEvent="mousewheel":s.firefox&&"MouseScrollEvent"in window&&(s.wheelEvent="DOMMouseScroll"))},i.Device.canPlayAudio=function(t){return!("mp3"!==t||!this.mp3)||(!("ogg"!==t||!this.ogg&&!this.opus)||(!("m4a"!==t||!this.m4a)||(!("opus"!==t||!this.opus)||(!("wav"!==t||!this.wav)||(!("webm"!==t||!this.webm)||!("mp4"!==t||!this.dolby))))))},i.Device.canPlayVideo=function(t){return!("webm"!==t||!this.webmVideo&&!this.vp9Video)||(!("mp4"!==t||!this.mp4Video&&!this.h264Video)||(!("ogg"!==t&&"ogv"!==t||!this.oggVideo)||!("mpeg"!==t||!this.hlsVideo)))},i.Device.needsTouchUnlock=function(){return!!(!this.cocoonJS&&(this.iOS||this.android)||window.PhaserGlobal&&window.PhaserGlobal.fakeiOSTouchLock)},i.Device.isAndroidStockBrowser=function(){var t=window.navigator.userAgent.match(/Android.*AppleWebKit\/([\d.]+)/);return t&&t[1]<537},i.Canvas={create:function(t,e,s,n,r){e=e||256,s=s||256;var o=r?document.createElement("canvas"):i.CanvasPool.create(t,e,s);return"string"==typeof n&&""!==n&&(o.id=n),o.width=e,o.height=s,o.style.display="block",o},setBackgroundColor:function(t,e){return e=e||"rgb(0,0,0)",t.style.backgroundColor=e,t},setTouchAction:function(t,e){return e=e||"none",t.style.msTouchAction=e,t.style["ms-touch-action"]=e,t.style["touch-action"]=e,t},setUserSelect:function(t,e){return e=e||"none",t.style["-webkit-touch-callout"]=e,t.style["-webkit-user-select"]=e,t.style["-khtml-user-select"]=e,t.style["-moz-user-select"]=e,t.style["-ms-user-select"]=e,t.style["user-select"]=e,t.style["-webkit-tap-highlight-color"]="rgba(0, 0, 0, 0)",t},addToDOM:function(t,e,i){var s;return void 0===i&&(i=!0),e&&("string"==typeof e?s=document.getElementById(e):"object"==typeof e&&1===e.nodeType&&(s=e)),s||(s=document.body),i&&s.style&&(s.style.overflow="hidden"),s.appendChild(t),t},removeFromDOM:function(t){t.parentNode&&t.parentNode.removeChild(t)},setTransform:function(t,e,i,s,n,r,o){return t.setTransform(s,r,o,n,e,i),t},setSmoothingEnabled:function(t,e){var s=i.Canvas.getSmoothingPrefix(t);return s&&(t[s]=e),t},getSmoothingPrefix:function(t){var e=["i","webkitI","msI","mozI","oI"];for(var i in e){var s=e[i]+"mageSmoothingEnabled";if(s in t)return s}return null},getSmoothingEnabled:function(t){var e=i.Canvas.getSmoothingPrefix(t);if(e)return t[e]},setImageRenderingCrisp:function(t){for(var e=["-webkit-optimize-contrast","-moz-crisp-edges","crisp-edges","pixelated"],i=0;i<e.length;i++)t.style["image-rendering"]=e[i];return t.style.msInterpolationMode="nearest-neighbor",t},setImageRenderingBicubic:function(t){return t.style["image-rendering"]="auto",t.style.msInterpolationMode="bicubic",t}},i.RequestAnimationFrame=function(t,e){void 0===e&&(e=!1),this.game=t,this.isRunning=!1,this.forceSetTimeOut=e;for(var i=["ms","moz","webkit","o"],s=0;s<i.length&&!window.requestAnimationFrame;s++)window.requestAnimationFrame=window[i[s]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[s]+"CancelAnimationFrame"]||window[i[s]+"CancelRequestAnimationFrame"];this._isSetTimeOut=!1,this._onLoop=null,this._timeOutID=null},i.RequestAnimationFrame.prototype={start:function(){this.isRunning=!0;var t=this;!window.requestAnimationFrame||this.forceSetTimeOut?(this._isSetTimeOut=!0,this._onLoop=function(){return t.updateSetTimeout()},this._timeOutID=window.setTimeout(this._onLoop,0)):(this._isSetTimeOut=!1,this._onLoop=function(e){return t.updateRAF(e)},this._timeOutID=window.requestAnimationFrame(this._onLoop))},updateRAF:function(t){this.isRunning&&(this.game.update(Math.floor(t)),this._timeOutID=window.requestAnimationFrame(this._onLoop))},updateSetTimeout:function(){this.isRunning&&(this.game.update(Date.now()),this._timeOutID=window.setTimeout(this._onLoop,this.game.time.timeToCall))},stop:function(){this._isSetTimeOut?clearTimeout(this._timeOutID):window.cancelAnimationFrame(this._timeOutID),this.isRunning=!1},isSetTimeOut:function(){return this._isSetTimeOut},isRAF:function(){return!1===this._isSetTimeOut}},i.RequestAnimationFrame.prototype.constructor=i.RequestAnimationFrame,i.Math={PI2:2*Math.PI,HALF_PI:.5*Math.PI,DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,degToRad:function(t){return t*i.Math.DEG_TO_RAD},radToDeg:function(t){return t*i.Math.RAD_TO_DEG},getNextPowerOfTwo:function(t){if(t>0&&0==(t&t-1))return t;for(var e=1;e<t;)e<<=1;return e},isPowerOfTwo:function(t,e){return t>0&&0==(t&t-1)&&e>0&&0==(e&e-1)},random:function(t,e){if(void 0===t&&(t=0),void 0===e&&(e=1),t===e)return t;if(t>e){var i=t;t=e,e=i}return Math.random()*(e-t)+t},between:function(t,e){if(void 0===t&&(t=0),void 0===e&&(e=1),t===e)return t;if(t>e){var i=t;t=e,e=i}return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t},fuzzyEqual:function(t,e,i){return void 0===i&&(i=1e-4),Math.abs(t-e)<i},fuzzyLessThan:function(t,e,i){return void 0===i&&(i=1e-4),t<e+i},fuzzyGreaterThan:function(t,e,i){return void 0===i&&(i=1e-4),t>e-i},fuzzyCeil:function(t,e){return void 0===e&&(e=1e-4),Math.ceil(t-e)},fuzzyFloor:function(t,e){return void 0===e&&(e=1e-4),Math.floor(t+e)},average:function(){for(var t=0,e=arguments.length,i=0;i<e;i++)t+=+arguments[i];return t/e},shear:function(t){return t%1},snapTo:function(t,e,i){return void 0===i&&(i=0),0===e?t:(t-=i,t=e*Math.round(t/e),i+t)},snapToFloor:function(t,e,i){return void 0===i&&(i=0),0===e?t:(t-=i,t=e*Math.floor(t/e),i+t)},snapToCeil:function(t,e,i){return void 0===i&&(i=0),0===e?t:(t-=i,t=e*Math.ceil(t/e),i+t)},roundTo:function(t,e,i){void 0===e&&(e=0),void 0===i&&(i=10);var s=Math.pow(i,-e);return Math.round(t*s)/s},floorTo:function(t,e,i){void 0===e&&(e=0),void 0===i&&(i=10);var s=Math.pow(i,-e);return Math.floor(t*s)/s},ceilTo:function(t,e,i){void 0===e&&(e=0),void 0===i&&(i=10);var s=Math.pow(i,-e);return Math.ceil(t*s)/s},rotateToAngle:function(t,e,s){return void 0===s&&(s=.05),t===e?t:(Math.abs(e-t)<=s||Math.abs(e-t)>=i.Math.PI2-s?t=e:(Math.abs(e-t)>Math.PI&&(e<t?e+=i.Math.PI2:e-=i.Math.PI2),e>t?t+=s:e<t&&(t-=s)),t)},getShortestAngle:function(t,e){var i=e-t;return 0===i?0:i-360*Math.floor((i- -180)/360)},angleBetween:function(t,e,i,s){return Math.atan2(s-e,i-t)},angleBetweenY:function(t,e,i,s){return Math.atan2(i-t,s-e)},angleBetweenPoints:function(t,e){return Math.atan2(e.y-t.y,e.x-t.x)},angleBetweenPointsY:function(t,e){return Math.atan2(e.x-t.x,e.y-t.y)},reverseAngle:function(t){return this.normalizeAngle(t+Math.PI,!0)},normalizeAngle:function(t){return(t%=2*Math.PI)>=0?t:t+2*Math.PI},maxAdd:function(t,e,i){return Math.min(t+e,i)},minSub:function(t,e,i){return Math.max(t-e,i)},wrap:function(t,e,i){var s=i-e;if(s<=0)return 0;var n=(t-e)%s;return n<0&&(n+=s),n+e},wrapValue:function(t,e,i){return t=Math.abs(t),e=Math.abs(e),i=Math.abs(i),(t+e)%i},isOdd:function(t){return!!(1&t)},isEven:function(t){return!(1&t)},min:function(){if(1===arguments.length&&"object"==typeof arguments[0])t=arguments[0];else var t=arguments;for(var e=1,i=0,s=t.length;e<s;e++)t[e]<t[i]&&(i=e);return t[i]},max:function(){if(1===arguments.length&&"object"==typeof arguments[0])t=arguments[0];else var t=arguments;for(var e=1,i=0,s=t.length;e<s;e++)t[e]>t[i]&&(i=e);return t[i]},minProperty:function(t){if(2===arguments.length&&"object"==typeof arguments[1])e=arguments[1];else var e=arguments.slice(1);for(var i=1,s=0,n=e.length;i<n;i++)e[i][t]<e[s][t]&&(s=i);return e[s][t]},maxProperty:function(t){if(2===arguments.length&&"object"==typeof arguments[1])e=arguments[1];else var e=arguments.slice(1);for(var i=1,s=0,n=e.length;i<n;i++)e[i][t]>e[s][t]&&(s=i);return e[s][t]},wrapAngle:function(t,e){return e?this.wrap(t,-Math.PI,Math.PI):this.wrap(t,-180,180)},linearInterpolation:function(t,e){var i=t.length-1,s=i*e,n=Math.floor(s);return e<0?this.linear(t[0],t[1],s):e>1?this.linear(t[i],t[i-1],i-s):this.linear(t[n],t[n+1>i?i:n+1],s-n)},bezierInterpolation:function(t,e){for(var i=0,s=t.length-1,n=0;n<=s;n++)i+=Math.pow(1-e,s-n)*Math.pow(e,n)*t[n]*this.bernstein(s,n);return i},catmullRomInterpolation:function(t,e){var i=t.length-1,s=i*e,n=Math.floor(s);return t[0]===t[i]?(e<0&&(n=Math.floor(s=i*(1+e))),this.catmullRom(t[(n-1+i)%i],t[n],t[(n+1)%i],t[(n+2)%i],s-n)):e<0?t[0]-(this.catmullRom(t[0],t[0],t[1],t[1],-s)-t[0]):e>1?t[i]-(this.catmullRom(t[i],t[i],t[i-1],t[i-1],s-i)-t[i]):this.catmullRom(t[n?n-1:0],t[n],t[i<n+1?i:n+1],t[i<n+2?i:n+2],s-n)},linear:function(t,e,i){return(e-t)*i+t},bernstein:function(t,e){return this.factorial(t)/this.factorial(e)/this.factorial(t-e)},factorial:function(t){if(0===t)return 1;for(var e=t;--t;)e*=t;return e},catmullRom:function(t,e,i,s,n){var r=.5*(i-t),o=.5*(s-e),a=n*n;return(2*e-2*i+r+o)*(n*a)+(-3*e+3*i-2*r-o)*a+r*n+e},difference:function(t,e){return Math.abs(t-e)},roundAwayFromZero:function(t){return t>0?Math.ceil(t):Math.floor(t)},sinCosGenerator:function(t,e,i,s){void 0===e&&(e=1),void 0===i&&(i=1),void 0===s&&(s=1);for(var n=e,r=i,o=s*Math.PI/t,a=[],h=[],u=0;u<t;u++)n+=(r-=n*o)*o,a[u]=r,h[u]=n;return{sin:h,cos:a,length:t}},hypot:function(t,e){return Math.sqrt(t*t+e*e)},distance:function(t,e,i,s){var n=t-i,r=e-s;return Math.sqrt(n*n+r*r)},distanceSq:function(t,e,i,s){var n=t-i,r=e-s;return n*n+r*r},distancePow:function(t,e,i,s,n){return void 0===n&&(n=2),Math.sqrt(Math.pow(i-t,n)+Math.pow(s-e,n))},clamp:function(t,e,i){return t<e?e:i<t?i:t},clampBottom:function(t,e){return t<e?e:t},within:function(t,e,i){return Math.abs(t-e)<=i},mapLinear:function(t,e,i,s,n){return s+(t-e)*(n-s)/(i-e)},smoothstep:function(t,e,i){return(t=Math.max(0,Math.min(1,(t-e)/(i-e))))*t*(3-2*t)},smootherstep:function(t,e,i){return(t=Math.max(0,Math.min(1,(t-e)/(i-e))))*t*t*(t*(6*t-15)+10)},sign:function(t){return t<0?-1:t>0?1:0},percent:function(t,e,i){return void 0===i&&(i=0),t>e||i>e?1:t<i||i>t?0:(t-i)/e}},i.RandomDataGenerator=function(t){void 0===t&&(t=[]),this.c=1,this.s0=0,this.s1=0,this.s2=0,"string"==typeof t?this.state(t):this.sow(t)},i.RandomDataGenerator.prototype={rnd:function(){var t=2091639*this.s0+2.3283064365386963e-10*this.c;return this.c=0|t,this.s0=this.s1,this.s1=this.s2,this.s2=t-this.c,this.s2},sow:function(t){if(this.s0=this.hash(" "),this.s1=this.hash(this.s0),this.s2=this.hash(this.s1),this.c=1,t)for(var e=0;e<t.length&&null!=t[e];e++){var i=t[e];this.s0-=this.hash(i),this.s0+=~~(this.s0<0),this.s1-=this.hash(i),this.s1+=~~(this.s1<0),this.s2-=this.hash(i),this.s2+=~~(this.s2<0)}},hash:function(t){var e,i,s;for(s=4022871197,t=t.toString(),i=0;i<t.length;i++)e=.02519603282416938*(s+=t.charCodeAt(i)),e-=s=e>>>0,s=(e*=s)>>>0,s+=4294967296*(e-=s);return 2.3283064365386963e-10*(s>>>0)},integer:function(){return 4294967296*this.rnd.apply(this)},frac:function(){return this.rnd.apply(this)+1.1102230246251565e-16*(2097152*this.rnd.apply(this)|0)},real:function(){return this.integer()+this.frac()},integerInRange:function(t,e){return Math.floor(this.realInRange(0,e-t+1)+t)},between:function(t,e){return this.integerInRange(t,e)},realInRange:function(t,e){return this.frac()*(e-t)+t},normal:function(){return 1-2*this.frac()},uuid:function(){var t="",e="";for(e=t="";t++<36;e+=~t%5|3*t&4?(15^t?8^this.frac()*(20^t?16:4):4).toString(16):"-");return e},pick:function(t){return t[this.integerInRange(0,t.length-1)]},sign:function(){return this.pick([-1,1])},weightedPick:function(t){return t[~~(Math.pow(this.frac(),2)*(t.length-1)+.5)]},timestamp:function(t,e){return this.realInRange(t||9466848e5,e||1577862e6)},angle:function(){return this.integerInRange(-180,180)},state:function(t){return"string"==typeof t&&t.match(/^!rnd/)&&(t=t.split(","),this.c=parseFloat(t[1]),this.s0=parseFloat(t[2]),this.s1=parseFloat(t[3]),this.s2=parseFloat(t[4])),["!rnd",this.c,this.s0,this.s1,this.s2].join(",")}},i.RandomDataGenerator.prototype.constructor=i.RandomDataGenerator,i.QuadTree=function(t,e,i,s,n,r,o){this.maxObjects=10,this.maxLevels=4,this.level=0,this.bounds={},this.objects=[],this.nodes=[],this._empty=[],this.reset(t,e,i,s,n,r,o)},i.QuadTree.prototype={reset:function(t,e,i,s,n,r,o){this.maxObjects=n||10,this.maxLevels=r||4,this.level=o||0,this.bounds={x:Math.round(t),y:Math.round(e),width:i,height:s,subWidth:Math.floor(i/2),subHeight:Math.floor(s/2),right:Math.round(t)+Math.floor(i/2),bottom:Math.round(e)+Math.floor(s/2)},this.objects.length=0,this.nodes.length=0},populate:function(t){t.forEach(this.populateHandler,this,!0)},populateHandler:function(t){t.body&&t.exists&&this.insert(t.body)},split:function(){this.nodes[0]=new i.QuadTree(this.bounds.right,this.bounds.y,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level+1),this.nodes[1]=new i.QuadTree(this.bounds.x,this.bounds.y,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level+1),this.nodes[2]=new i.QuadTree(this.bounds.x,this.bounds.bottom,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level+1),this.nodes[3]=new i.QuadTree(this.bounds.right,this.bounds.bottom,this.bounds.subWidth,this.bounds.subHeight,this.maxObjects,this.maxLevels,this.level+1)},insert:function(t){var e,i=0;if(null==this.nodes[0]||-1===(e=this.getIndex(t))){if(this.objects.push(t),this.objects.length>this.maxObjects&&this.level<this.maxLevels)for(null==this.nodes[0]&&this.split();i<this.objects.length;)-1!==(e=this.getIndex(this.objects[i]))?this.nodes[e].insert(this.objects.splice(i,1)[0]):i++}else this.nodes[e].insert(t)},getIndex:function(t){var e=-1;return t.x<this.bounds.right&&t.right<this.bounds.right?t.y<this.bounds.bottom&&t.bottom<this.bounds.bottom?e=1:t.y>this.bounds.bottom&&(e=2):t.x>this.bounds.right&&(t.y<this.bounds.bottom&&t.bottom<this.bounds.bottom?e=0:t.y>this.bounds.bottom&&(e=3)),e},retrieve:function(t){if(t instanceof i.Rectangle)var e=this.objects,s=this.getIndex(t);else{if(!t.body)return this._empty;var e=this.objects,s=this.getIndex(t.body)}return this.nodes[0]&&(e=-1!==s?e.concat(this.nodes[s].retrieve(t)):(e=(e=(e=e.concat(this.nodes[0].retrieve(t))).concat(this.nodes[1].retrieve(t))).concat(this.nodes[2].retrieve(t))).concat(this.nodes[3].retrieve(t))),e},clear:function(){this.objects.length=0;for(var t=this.nodes.length;t--;)this.nodes[t].clear(),this.nodes.splice(t,1);this.nodes.length=0}},i.QuadTree.prototype.constructor=i.QuadTree,i.Net=function(t){this.game=t},i.Net.prototype={getHostName:function(){return window.location&&window.location.hostname?window.location.hostname:null},checkDomainName:function(t){return-1!==window.location.hostname.indexOf(t)},updateQueryString:function(t,e,i,s){void 0===i&&(i=!1),void 0!==s&&""!==s||(s=window.location.href);var n="",r=new RegExp("([?|&])"+t+"=.*?(&|#|$)(.*)","gi");if(r.test(s))n=void 0!==e&&null!==e?s.replace(r,"$1"+t+"="+e+"$2$3"):s.replace(r,"$1$3").replace(/(&|\?)$/,"");else if(void 0!==e&&null!==e){var o=-1!==s.indexOf("?")?"&":"?",a=s.split("#");s=a[0]+o+t+"="+e,a[1]&&(s+="#"+a[1]),n=s}else n=s;if(!i)return n;window.location.href=n},getQueryString:function(t){void 0===t&&(t="");var e={},i=location.search.substring(1).split("&");for(var s in i){var n=i[s].split("=");if(n.length>1){if(t&&t===this.decodeURI(n[0]))return this.decodeURI(n[1]);e[this.decodeURI(n[0])]=this.decodeURI(n[1])}}return e},decodeURI:function(t){return decodeURIComponent(t.replace(/\+/g," "))}},i.Net.prototype.constructor=i.Net,i.TweenManager=function(t){this.game=t,this.frameBased=!1,this._tweens=[],this._add=[],this.easeMap={Power0:i.Easing.Power0,Power1:i.Easing.Power1,Power2:i.Easing.Power2,Power3:i.Easing.Power3,Power4:i.Easing.Power4,Linear:i.Easing.Linear.None,Quad:i.Easing.Quadratic.Out,Cubic:i.Easing.Cubic.Out,Quart:i.Easing.Quartic.Out,Quint:i.Easing.Quintic.Out,Sine:i.Easing.Sinusoidal.Out,Expo:i.Easing.Exponential.Out,Circ:i.Easing.Circular.Out,Elastic:i.Easing.Elastic.Out,Back:i.Easing.Back.Out,Bounce:i.Easing.Bounce.Out,"Quad.easeIn":i.Easing.Quadratic.In,"Cubic.easeIn":i.Easing.Cubic.In,"Quart.easeIn":i.Easing.Quartic.In,"Quint.easeIn":i.Easing.Quintic.In,"Sine.easeIn":i.Easing.Sinusoidal.In,"Expo.easeIn":i.Easing.Exponential.In,"Circ.easeIn":i.Easing.Circular.In,"Elastic.easeIn":i.Easing.Elastic.In,"Back.easeIn":i.Easing.Back.In,"Bounce.easeIn":i.Easing.Bounce.In,"Quad.easeOut":i.Easing.Quadratic.Out,"Cubic.easeOut":i.Easing.Cubic.Out,"Quart.easeOut":i.Easing.Quartic.Out,"Quint.easeOut":i.Easing.Quintic.Out,"Sine.easeOut":i.Easing.Sinusoidal.Out,"Expo.easeOut":i.Easing.Exponential.Out,"Circ.easeOut":i.Easing.Circular.Out,"Elastic.easeOut":i.Easing.Elastic.Out,"Back.easeOut":i.Easing.Back.Out,"Bounce.easeOut":i.Easing.Bounce.Out,"Quad.easeInOut":i.Easing.Quadratic.InOut,"Cubic.easeInOut":i.Easing.Cubic.InOut,"Quart.easeInOut":i.Easing.Quartic.InOut,"Quint.easeInOut":i.Easing.Quintic.InOut,"Sine.easeInOut":i.Easing.Sinusoidal.InOut,"Expo.easeInOut":i.Easing.Exponential.InOut,"Circ.easeInOut":i.Easing.Circular.InOut,"Elastic.easeInOut":i.Easing.Elastic.InOut,"Back.easeInOut":i.Easing.Back.InOut,"Bounce.easeInOut":i.Easing.Bounce.InOut},this.game.onPause.add(this._pauseAll,this),this.game.onResume.add(this._resumeAll,this)},i.TweenManager.prototype={getAll:function(){return this._tweens},removeAll:function(){for(var t=0;t<this._tweens.length;t++)this._tweens[t].pendingDelete=!0;this._add=[]},removeFrom:function(t,e){void 0===e&&(e=!0);if(Array.isArray(t))for(s=0,n=t.length;s<n;s++)this.removeFrom(t[s]);else if(t.type===i.GROUP&&e)for(var s=0,n=t.children.length;s<n;s++)this.removeFrom(t.children[s]);else{for(s=0,n=this._tweens.length;s<n;s++)t===this._tweens[s].target&&this.remove(this._tweens[s]);for(s=0,n=this._add.length;s<n;s++)t===this._add[s].target&&this.remove(this._add[s])}},add:function(t){t._manager=this,this._add.push(t)},create:function(t){return new i.Tween(t,this.game,this)},remove:function(t){var e=this._tweens.indexOf(t);-1!==e?this._tweens[e].pendingDelete=!0:-1!==(e=this._add.indexOf(t))&&(this._add[e].pendingDelete=!0)},update:function(){var t=this._add.length,e=this._tweens.length;if(0===e&&0===t)return!1;for(var i=0;i<e;)this._tweens[i].update(this.game.time.time)?i++:(this._tweens.splice(i,1),e--);return t>0&&(this._tweens=this._tweens.concat(this._add),this._add.length=0),!0},isTweening:function(t,e){return e||(e=!1),this._tweens.some(function(i){return i.target===t&&(!e||i.isRunning&&!i.pendingDelete)})},_pauseAll:function(){for(var t=this._tweens.length-1;t>=0;t--)this._tweens[t]._pause()},_resumeAll:function(){for(var t=this._tweens.length-1;t>=0;t--)this._tweens[t]._resume()},pauseAll:function(){for(var t=this._tweens.length-1;t>=0;t--)this._tweens[t].pause()},resumeAll:function(){for(var t=this._tweens.length-1;t>=0;t--)this._tweens[t].resume(!0)}},i.TweenManager.prototype.constructor=i.TweenManager,i.Tween=function(t,e,s){this.game=e,this.target=t,this.manager=s,this.timeline=[],this.reverse=!1,this.timeScale=1,this.repeatCounter=0,this.pendingDelete=!1,this.onStart=new i.Signal,this.onLoop=new i.Signal,this.onRepeat=new i.Signal,this.onChildComplete=new i.Signal,this.onComplete=new i.Signal,this.isRunning=!1,this.current=0,this.properties={},this.chainedTween=null,this.isPaused=!1,this.frameBased=s.frameBased,this._onUpdateCallback=null,this._onUpdateCallbackContext=null,this._pausedTime=0,this._codePaused=!1,this._hasStarted=!1},i.Tween.updateColor=function(t){i.Color.updateColor(t.target)},i.Tween.prototype={to:function(t,e,s,n,r,o,a){return(void 0===e||e<=0)&&(e=1e3),void 0!==s&&null!==s||(s=i.Easing.Default),void 0===n&&(n=!1),void 0===r&&(r=0),void 0===o&&(o=0),void 0===a&&(a=!1),"string"==typeof s&&this.manager.easeMap[s]&&(s=this.manager.easeMap[s]),this.isRunning?(console.warn("Phaser.Tween.to cannot be called after Tween.start"),this):(this.timeline.push(new i.TweenData(this).to(t,e,s,r,o,a)),n&&this.start(),this)},from:function(t,e,s,n,r,o,a){return void 0===e&&(e=1e3),void 0!==s&&null!==s||(s=i.Easing.Default),void 0===n&&(n=!1),void 0===r&&(r=0),void 0===o&&(o=0),void 0===a&&(a=!1),"string"==typeof s&&this.manager.easeMap[s]&&(s=this.manager.easeMap[s]),this.isRunning?(console.warn("Phaser.Tween.from cannot be called after Tween.start"),this):(this.timeline.push(new i.TweenData(this).from(t,e,s,r,o,a)),n&&this.start(),this)},start:function(t){if(void 0===t&&(t=0),this.pendingDelete)return console.warn("Phaser.Tween.start cannot be called after Tween.stop"),this;if(null===this.game||null===this.target||0===this.timeline.length||this.isRunning)return this;for(i=0;i<this.timeline.length;i++)for(var e in this.timeline[i].vEnd)this.properties[e]=this.target[e]||0,Array.isArray(this.properties[e])||(this.properties[e]*=1);for(var i=0;i<this.timeline.length;i++)this.timeline[i].loadValues();return this.manager.add(this),this.isRunning=!0,(t<0||t>this.timeline.length-1)&&(t=0),this.current=t,this.timeline[this.current].start(),this},stop:function(t){return void 0===t&&(t=!1),this.isRunning=!1,this._onUpdateCallback=null,this._onUpdateCallbackContext=null,t&&(this.onComplete.dispatch(this.target,this),this._hasStarted=!1,this.chainedTween&&this.chainedTween.start()),this.manager.remove(this),this},updateTweenData:function(t,e,i){if(0===this.timeline.length)return this;if(void 0===i&&(i=0),-1===i)for(var s=0;s<this.timeline.length;s++)this.timeline[s][t]=e;else this.timeline[i][t]=e;return this},delay:function(t,e){return this.updateTweenData("delay",t,e)},repeat:function(t,e,i){return void 0===e&&(e=0),this.updateTweenData("repeatCounter",t,i),this.updateTweenData("repeatTotal",t,i),this.updateTweenData("repeatDelay",e,i)},repeatDelay:function(t,e){return this.updateTweenData("repeatDelay",t,e)},yoyo:function(t,e,i){return void 0===e&&(e=0),this.updateTweenData("yoyo",t,i),this.updateTweenData("yoyoDelay",e,i)},yoyoDelay:function(t,e){return this.updateTweenData("yoyoDelay",t,e)},easing:function(t,e){return"string"==typeof t&&this.manager.easeMap[t]&&(t=this.manager.easeMap[t]),this.updateTweenData("easingFunction",t,e)},interpolation:function(t,e,s){return void 0===e&&(e=i.Math),this.updateTweenData("interpolationFunction",t,s),this.updateTweenData("interpolationContext",e,s)},repeatAll:function(t){return void 0===t&&(t=0),this.repeatCounter=t,this},chain:function(){for(var t=arguments.length;t--;)t>0?arguments[t-1].chainedTween=arguments[t]:this.chainedTween=arguments[t];return this},loop:function(t){return void 0===t&&(t=!0),this.repeatCounter=t?-1:0,this},onUpdateCallback:function(t,e){return this._onUpdateCallback=t,this._onUpdateCallbackContext=e,this},pause:function(){this.isPaused=!0,this._codePaused=!0,this._pausedTime=this.game.time.time},_pause:function(){this._codePaused||(this.isPaused=!0,this._pausedTime=this.game.time.time)},resume:function(){if(this.isPaused){this.isPaused=!1,this._codePaused=!1;for(var t=0;t<this.timeline.length;t++)this.timeline[t].isRunning||(this.timeline[t].startTime+=this.game.time.time-this._pausedTime)}},_resume:function(){this._codePaused||this.resume()},update:function(t){if(this.pendingDelete||!this.target)return!1;if(this.isPaused)return!0;var e=this.timeline[this.current].update(t);if(e===i.TweenData.PENDING)return!0;if(e===i.TweenData.RUNNING)return this._hasStarted||(this.onStart.dispatch(this.target,this),this._hasStarted=!0),null!==this._onUpdateCallback&&this._onUpdateCallback.call(this._onUpdateCallbackContext,this,this.timeline[this.current].value,this.timeline[this.current]),this.isRunning;if(e===i.TweenData.LOOPED)return-1===this.timeline[this.current].repeatCounter?this.onLoop.dispatch(this.target,this):this.onRepeat.dispatch(this.target,this),!0;if(e===i.TweenData.COMPLETE){var s=!1;return this.reverse?--this.current<0&&(this.current=this.timeline.length-1,s=!0):++this.current===this.timeline.length&&(this.current=0,s=!0),s?-1===this.repeatCounter?(this.timeline[this.current].start(),this.onLoop.dispatch(this.target,this),!0):this.repeatCounter>0?(this.repeatCounter--,this.timeline[this.current].start(),this.onRepeat.dispatch(this.target,this),!0):(this.isRunning=!1,this.onComplete.dispatch(this.target,this),this._hasStarted=!1,this.chainedTween&&this.chainedTween.start(),!1):(this.onChildComplete.dispatch(this.target,this),this.timeline[this.current].start(),!0)}},generateData:function(t,e){if(null===this.game||null===this.target)return null;void 0===t&&(t=60),void 0===e&&(e=[]);for(s=0;s<this.timeline.length;s++)for(var i in this.timeline[s].vEnd)this.properties[i]=this.target[i]||0,Array.isArray(this.properties[i])||(this.properties[i]*=1);for(s=0;s<this.timeline.length;s++)this.timeline[s].loadValues();for(var s=0;s<this.timeline.length;s++)e=e.concat(this.timeline[s].generateData(t));return e}},Object.defineProperty(i.Tween.prototype,"totalDuration",{get:function(){for(var t=0,e=0;e<this.timeline.length;e++)t+=this.timeline[e].duration;return t}}),i.Tween.prototype.constructor=i.Tween,i.TweenData=function(t){this.parent=t,this.game=t.game,this.vStart={},this.vStartCache={},this.vEnd={},this.vEndCache={},this.duration=1e3,this.percent=0,this.value=0,this.repeatCounter=0,this.repeatDelay=0,this.repeatTotal=0,this.interpolate=!1,this.yoyo=!1,this.yoyoDelay=0,this.inReverse=!1,this.delay=0,this.dt=0,this.startTime=null,this.easingFunction=i.Easing.Default,this.interpolationFunction=i.Math.linearInterpolation,this.interpolationContext=i.Math,this.isRunning=!1,this.isFrom=!1},i.TweenData.PENDING=0,i.TweenData.RUNNING=1,i.TweenData.LOOPED=2,i.TweenData.COMPLETE=3,i.TweenData.prototype={to:function(t,e,i,s,n,r){return this.vEnd=t,this.duration=e,this.easingFunction=i,this.delay=s,this.repeatTotal=n,this.yoyo=r,this.isFrom=!1,this},from:function(t,e,i,s,n,r){return this.vEnd=t,this.duration=e,this.easingFunction=i,this.delay=s,this.repeatTotal=n,this.yoyo=r,this.isFrom=!0,this},start:function(){if(this.startTime=this.game.time.time+this.delay,this.parent.reverse?this.dt=this.duration:this.dt=0,this.delay>0?this.isRunning=!1:this.isRunning=!0,this.isFrom)for(var t in this.vStartCache)this.vStart[t]=this.vEndCache[t],this.vEnd[t]=this.vStartCache[t],this.parent.target[t]=this.vStart[t];return this.value=0,this.repeatCounter=this.repeatTotal,this},loadValues:function(){for(var t in this.parent.properties){if(this.vStart[t]=this.parent.properties[t],Array.isArray(this.vEnd[t])){if(0===this.vEnd[t].length)continue;0===this.percent&&(this.vEnd[t]=[this.vStart[t]].concat(this.vEnd[t]))}void 0!==this.vEnd[t]?("string"==typeof this.vEnd[t]&&(this.vEnd[t]=this.vStart[t]+parseFloat(this.vEnd[t],10)),this.parent.properties[t]=this.vEnd[t]):this.vEnd[t]=this.vStart[t],this.vStartCache[t]=this.vStart[t],this.vEndCache[t]=this.vEnd[t]}return this},update:function(t){if(this.isRunning){if(t<this.startTime)return i.TweenData.RUNNING}else{if(!(t>=this.startTime))return i.TweenData.PENDING;this.isRunning=!0}var e=this.parent.frameBased?this.game.time.physicsElapsedMS:this.game.time.elapsedMS;this.parent.reverse?(this.dt-=e*this.parent.timeScale,this.dt=Math.max(this.dt,0)):(this.dt+=e*this.parent.timeScale,this.dt=Math.min(this.dt,this.duration)),this.percent=this.dt/this.duration,this.value=this.easingFunction(this.percent);for(var s in this.vEnd){var n=this.vStart[s],r=this.vEnd[s];Array.isArray(r)?this.parent.target[s]=this.interpolationFunction.call(this.interpolationContext,r,this.value):this.parent.target[s]=n+(r-n)*this.value}return!this.parent.reverse&&1===this.percent||this.parent.reverse&&0===this.percent?this.repeat():i.TweenData.RUNNING},generateData:function(t){this.parent.reverse?this.dt=this.duration:this.dt=0;var e=[],i=!1,s=1/t*1e3;do{this.parent.reverse?(this.dt-=s,this.dt=Math.max(this.dt,0)):(this.dt+=s,this.dt=Math.min(this.dt,this.duration)),this.percent=this.dt/this.duration,this.value=this.easingFunction(this.percent);var n={};for(var r in this.vEnd){var o=this.vStart[r],a=this.vEnd[r];Array.isArray(a)?n[r]=this.interpolationFunction.call(this.interpolationContext,a,this.value):n[r]=o+(a-o)*this.value}e.push(n),(!this.parent.reverse&&1===this.percent||this.parent.reverse&&0===this.percent)&&(i=!0)}while(!i);if(this.yoyo){var h=e.slice();h.reverse(),e=e.concat(h)}return e},repeat:function(){if(this.yoyo){if(this.inReverse&&0===this.repeatCounter){for(var t in this.vStartCache)this.vStart[t]=this.vStartCache[t],this.vEnd[t]=this.vEndCache[t];return this.inReverse=!1,i.TweenData.COMPLETE}this.inReverse=!this.inReverse}else if(0===this.repeatCounter)return i.TweenData.COMPLETE;if(this.inReverse)for(var t in this.vStartCache)this.vStart[t]=this.vEndCache[t],this.vEnd[t]=this.vStartCache[t];else{for(var t in this.vStartCache)this.vStart[t]=this.vStartCache[t],this.vEnd[t]=this.vEndCache[t];this.repeatCounter>0&&this.repeatCounter--}return this.startTime=this.game.time.time,this.yoyo&&this.inReverse?this.startTime+=this.yoyoDelay:this.inReverse||(this.startTime+=this.repeatDelay),this.parent.reverse?this.dt=this.duration:this.dt=0,i.TweenData.LOOPED}},i.TweenData.prototype.constructor=i.TweenData,i.Easing={Linear:{None:function(t){return t}},Quadratic:{In:function(t){return t*t},Out:function(t){return t*(2-t)},InOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)}},Cubic:{In:function(t){return t*t*t},Out:function(t){return--t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)}},Quartic:{In:function(t){return t*t*t*t},Out:function(t){return 1- --t*t*t*t},InOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)}},Quintic:{In:function(t){return t*t*t*t*t},Out:function(t){return--t*t*t*t*t+1},InOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)}},Sinusoidal:{In:function(t){return 0===t?0:1===t?1:1-Math.cos(t*Math.PI/2)},Out:function(t){return 0===t?0:1===t?1:Math.sin(t*Math.PI/2)},InOut:function(t){return 0===t?0:1===t?1:.5*(1-Math.cos(Math.PI*t))}},Exponential:{In:function(t){return 0===t?0:Math.pow(1024,t-1)},Out:function(t){return 1===t?1:1-Math.pow(2,-10*t)},InOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))}},Circular:{In:function(t){return 1-Math.sqrt(1-t*t)},Out:function(t){return Math.sqrt(1- --t*t)},InOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)}},Elastic:{In:function(t){var e,i=.1;return 0===t?0:1===t?1:(!i||i<1?(i=1,e=.1):e=.4*Math.asin(1/i)/(2*Math.PI),-i*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/.4))},Out:function(t){var e,i=.1;return 0===t?0:1===t?1:(!i||i<1?(i=1,e=.1):e=.4*Math.asin(1/i)/(2*Math.PI),i*Math.pow(2,-10*t)*Math.sin((t-e)*(2*Math.PI)/.4)+1)},InOut:function(t){var e,i=.1;return 0===t?0:1===t?1:(!i||i<1?(i=1,e=.1):e=.4*Math.asin(1/i)/(2*Math.PI),(t*=2)<1?i*Math.pow(2,10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/.4)*-.5:i*Math.pow(2,-10*(t-=1))*Math.sin((t-e)*(2*Math.PI)/.4)*.5+1)}},Back:{In:function(t){var e=1.70158;return t*t*((e+1)*t-e)},Out:function(t){var e=1.70158;return--t*t*((e+1)*t+e)+1},InOut:function(t){var e=2.5949095;return(t*=2)<1?t*t*((e+1)*t-e)*.5:.5*((t-=2)*t*((e+1)*t+e)+2)}},Bounce:{In:function(t){return 1-i.Easing.Bounce.Out(1-t)},Out:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},InOut:function(t){return t<.5?.5*i.Easing.Bounce.In(2*t):.5*i.Easing.Bounce.Out(2*t-1)+.5}}},i.Easing.Default=i.Easing.Linear.None,i.Easing.Power0=i.Easing.Linear.None,i.Easing.Power1=i.Easing.Quadratic.Out,i.Easing.Power2=i.Easing.Cubic.Out,i.Easing.Power3=i.Easing.Quartic.Out,i.Easing.Power4=i.Easing.Quintic.Out,i.Time=function(t){this.game=t,this.time=0,this.prevTime=0,this.now=0,this.elapsed=0,this.elapsedMS=0,this.physicsElapsed=1/60,this.physicsElapsedMS=1/60*1e3,this.desiredFpsMult=1/60,this._desiredFps=60,this.suggestedFps=this.desiredFps,this.slowMotion=1,this.advancedTiming=!1,this.frames=0,this.updates=0,this.renders=0,this.fps=0,this.ups=0,this.rps=0,this.fpsMin=1e3,this.fpsMax=0,this.msMin=1e3,this.msMax=0,this.pauseDuration=0,this.timeToCall=0,this.timeExpected=0,this.events=new i.Timer(this.game,!1),this._frameCount=0,this._elapsedAccumulator=0,this._started=0,this._timeLastSecond=0,this._pauseStarted=0,this._justResumed=!1,this._timers=[]},i.Time.prototype={boot:function(){this._started=Date.now(),this.time=Date.now(),this.events.start(),this.timeExpected=this.time},add:function(t){return this._timers.push(t),t},create:function(t){void 0===t&&(t=!0);var e=new i.Timer(this.game,t);return this._timers.push(e),e},removeAll:function(){for(var t=0;t<this._timers.length;t++)this._timers[t].destroy();this._timers=[],this.events.removeAll()},refresh:function(){var t=this.time;this.time=Date.now(),this.elapsedMS=this.time-t},update:function(t){var e=this.time;this.time=Date.now(),this.elapsedMS=this.time-e,this.prevTime=this.now,this.now=t,this.elapsed=this.now-this.prevTime,this.game.raf._isSetTimeOut&&(this.timeToCall=Math.floor(Math.max(0,1e3/this._desiredFps-(this.timeExpected-t))),this.timeExpected=t+this.timeToCall),this.advancedTiming&&this.updateAdvancedTiming(),this.game.paused||(this.events.update(this.time),this._timers.length&&this.updateTimers())},updateTimers:function(){for(var t=0,e=this._timers.length;t<e;)this._timers[t].update(this.time)?t++:(this._timers.splice(t,1),e--)},updateAdvancedTiming:function(){if(this._frameCount++,this._elapsedAccumulator+=this.elapsed,this._frameCount>=2*this._desiredFps&&(this.suggestedFps=5*Math.floor(200/(this._elapsedAccumulator/this._frameCount)),this._frameCount=0,this._elapsedAccumulator=0),this.msMin=Math.min(this.msMin,this.elapsed),this.msMax=Math.max(this.msMax,this.elapsed),this.frames++,this.now>this._timeLastSecond+1e3){var t=this.now-this._timeLastSecond;this.fps=Math.round(1e3*this.frames/t),this.ups=Math.round(1e3*this.updates/t),this.rps=Math.round(1e3*this.renders/t),this.fpsMin=Math.min(this.fpsMin,this.fps),this.fpsMax=Math.max(this.fpsMax,this.fps),this._timeLastSecond=this.now,this.frames=0,this.updates=0,this.renders=0}},countUpdate:function(){this.advancedTiming&&this.updates++},countRender:function(){this.advancedTiming&&this.renders++},gamePaused:function(){this._pauseStarted=Date.now(),this.events.pause();for(var t=this._timers.length;t--;)this._timers[t]._pause()},gameResumed:function(){this.time=Date.now(),this.pauseDuration=this.time-this._pauseStarted,this.events.resume();for(var t=this._timers.length;t--;)this._timers[t]._resume()},totalElapsedSeconds:function(){return.001*(this.time-this._started)},elapsedSince:function(t){return this.time-t},elapsedSecondsSince:function(t){return.001*(this.time-t)},reset:function(){this._started=this.time,this.removeAll()}},Object.defineProperty(i.Time.prototype,"desiredFps",{get:function(){return this._desiredFps},set:function(t){this._desiredFps=t,this.physicsElapsed=1/t,this.physicsElapsedMS=1e3*this.physicsElapsed,this.desiredFpsMult=1/t}}),i.Time.prototype.constructor=i.Time,i.Timer=function(t,e){void 0===e&&(e=!0),this.game=t,this.running=!1,this.autoDestroy=e,this.expired=!1,this.elapsed=0,this.events=[],this.onComplete=new i.Signal,this.nextTick=0,this.timeCap=1e3,this.paused=!1,this._codePaused=!1,this._started=0,this._pauseStarted=0,this._pauseTotal=0,this._now=Date.now(),this._len=0,this._marked=0,this._i=0,this._diff=0,this._newTick=0},i.Timer.MINUTE=6e4,i.Timer.SECOND=1e3,i.Timer.HALF=500,i.Timer.QUARTER=250,i.Timer.prototype={create:function(t,e,s,n,r,o){var a=t=Math.round(t);0===this._now?a+=this.game.time.time:a+=this._now;var h=new i.TimerEvent(this,t,a,s,e,n,r,o);return this.events.push(h),this.order(),this.expired=!1,h},add:function(t,e,i){return this.create(t,!1,0,e,i,Array.prototype.slice.call(arguments,3))},repeat:function(t,e,i,s){return this.create(t,!1,e,i,s,Array.prototype.slice.call(arguments,4))},loop:function(t,e,i){return this.create(t,!0,0,e,i,Array.prototype.slice.call(arguments,3))},start:function(t){if(!this.running){this._started=this.game.time.time+(t||0),this.running=!0;for(var e=0;e<this.events.length;e++)this.events[e].tick=this.events[e].delay+this._started}},stop:function(t){this.running=!1,void 0===t&&(t=!0),t&&(this.events.length=0)},remove:function(t){for(var e=0;e<this.events.length;e++)if(this.events[e]===t)return this.events[e].pendingDelete=!0,!0;return!1},order:function(){this.events.length>0&&(this.events.sort(this.sortHandler),this.nextTick=this.events[0].tick)},sortHandler:function(t,e){return t.tick<e.tick?-1:t.tick>e.tick?1:0},clearPendingEvents:function(){for(this._i=this.events.length;this._i--;)this.events[this._i].pendingDelete&&this.events.splice(this._i,1);this._len=this.events.length,this._i=0},update:function(t){if(this.paused)return!0;if(this.elapsed=t-this._now,this._now=t,this.elapsed>this.timeCap&&this.adjustEvents(t-this.elapsed),this._marked=0,this.clearPendingEvents(),this.running&&this._now>=this.nextTick&&this._len>0){for(;this._i<this._len&&this.running;){var e=this.events[this._i];if(!(this._now>=e.tick)||e.pendingDelete)break;this._newTick=this._now+e.delay-(this._now-e.tick),this._newTick<0&&(this._newTick=this._now+e.delay),!0===e.loop?(e.tick=this._newTick,e.callback.apply(e.callbackContext,e.args)):e.repeatCount>0?(e.repeatCount--,e.tick=this._newTick,e.callback.apply(e.callbackContext,e.args)):(this._marked++,e.pendingDelete=!0,e.callback.apply(e.callbackContext,e.args)),this._i++}this.events.length>this._marked?this.order():(this.expired=!0,this.onComplete.dispatch(this))}return!this.expired||!this.autoDestroy},pause:function(){this.running&&(this._codePaused=!0,this.paused||(this._pauseStarted=this.game.time.time,this.paused=!0))},_pause:function(){!this.paused&&this.running&&(this._pauseStarted=this.game.time.time,this.paused=!0)},adjustEvents:function(t){for(var e=0;e<this.events.length;e++)if(!this.events[e].pendingDelete){var i=this.events[e].tick-t;i<0&&(i=0),this.events[e].tick=this._now+i}var s=this.nextTick-t;this.nextTick=s<0?this._now:this._now+s},resume:function(){if(this.paused){var t=this.game.time.time;this._pauseTotal+=t-this._now,this._now=t,this.adjustEvents(this._pauseStarted),this.paused=!1,this._codePaused=!1}},_resume:function(){this._codePaused||this.resume()},removeAll:function(){this.onComplete.removeAll(),this.events.length=0,this._len=0,this._i=0},destroy:function(){this.onComplete.removeAll(),this.running=!1,this.expired=!0,this.events=[],this._len=0,this._i=0}},Object.defineProperty(i.Timer.prototype,"next",{get:function(){return this.nextTick}}),Object.defineProperty(i.Timer.prototype,"duration",{get:function(){return this.running&&this.nextTick>this._now?this.nextTick-this._now:0}}),Object.defineProperty(i.Timer.prototype,"length",{get:function(){return this.events.length}}),Object.defineProperty(i.Timer.prototype,"ms",{get:function(){return this.running?this._now-this._started-this._pauseTotal:0}}),Object.defineProperty(i.Timer.prototype,"seconds",{get:function(){return this.running?.001*this.ms:0}}),i.Timer.prototype.constructor=i.Timer,i.TimerEvent=function(t,e,i,s,n,r,o,a){this.timer=t,this.delay=e,this.tick=i,this.repeatCount=s-1,this.loop=n,this.callback=r,this.callbackContext=o,this.args=a,this.pendingDelete=!1},i.TimerEvent.prototype.constructor=i.TimerEvent,i.AnimationManager=function(t){this.sprite=t,this.game=t.game,this.currentFrame=null,this.currentAnim=null,this.updateIfVisible=!0,this.isLoaded=!1,this._frameData=null,this._anims={},this._outputFrames=[]},i.AnimationManager.prototype={loadFrameData:function(t,e){if(void 0===t)return!1;if(this.isLoaded)for(var i in this._anims)this._anims[i].updateFrameData(t);return this._frameData=t,void 0===e||null===e?this.frame=0:"string"==typeof e?this.frameName=e:this.frame=e,this.isLoaded=!0,!0},copyFrameData:function(t,e){if(this._frameData=t.clone(),this.isLoaded)for(var i in this._anims)this._anims[i].updateFrameData(this._frameData);return void 0===e||null===e?this.frame=0:"string"==typeof e?this.frameName=e:this.frame=e,this.isLoaded=!0,!0},add:function(t,e,s,n,r){return e=e||[],s=s||60,void 0===n&&(n=!1),void 0===r&&(r=!(!e||"number"!=typeof e[0])),this._outputFrames=[],this._frameData.getFrameIndexes(e,r,this._outputFrames),this._anims[t]=new i.Animation(this.game,this.sprite,t,this._frameData,this._outputFrames,s,n),this.currentAnim=this._anims[t],this.sprite.tilingTexture&&(this.sprite.refreshTexture=!0),this._anims[t]},validateFrames:function(t,e){void 0===e&&(e=!0);for(var i=0;i<t.length;i++)if(!0===e){if(t[i]>this._frameData.total)return!1}else if(!1===this._frameData.checkFrameName(t[i]))return!1;return!0},play:function(t,e,i,s){if(this._anims[t])return this.currentAnim===this._anims[t]?!1===this.currentAnim.isPlaying?(this.currentAnim.paused=!1,this.currentAnim.play(e,i,s)):this.currentAnim:(this.currentAnim&&this.currentAnim.isPlaying&&this.currentAnim.stop(),this.currentAnim=this._anims[t],this.currentAnim.paused=!1,this.currentFrame=this.currentAnim.currentFrame,this.currentAnim.play(e,i,s))},stop:function(t,e){void 0===e&&(e=!1),!this.currentAnim||"string"==typeof t&&t!==this.currentAnim.name||this.currentAnim.stop(e)},update:function(){return!(this.updateIfVisible&&!this.sprite.visible)&&(!(!this.currentAnim||!this.currentAnim.update())&&(this.currentFrame=this.currentAnim.currentFrame,!0))},next:function(t){this.currentAnim&&(this.currentAnim.next(t),this.currentFrame=this.currentAnim.currentFrame)},previous:function(t){this.currentAnim&&(this.currentAnim.previous(t),this.currentFrame=this.currentAnim.currentFrame)},getAnimation:function(t){return"string"==typeof t&&this._anims[t]?this._anims[t]:null},refreshFrame:function(){},destroy:function(){t=null;for(var t in this._anims)this._anims.hasOwnProperty(t)&&this._anims[t].destroy();this._anims={},this._outputFrames=[],this._frameData=null,this.currentAnim=null,this.currentFrame=null,this.sprite=null,this.game=null}},i.AnimationManager.prototype.constructor=i.AnimationManager,Object.defineProperty(i.AnimationManager.prototype,"frameData",{get:function(){return this._frameData}}),Object.defineProperty(i.AnimationManager.prototype,"frameTotal",{get:function(){return this._frameData.total}}),Object.defineProperty(i.AnimationManager.prototype,"paused",{get:function(){return this.currentAnim.isPaused},set:function(t){this.currentAnim.paused=t}}),Object.defineProperty(i.AnimationManager.prototype,"name",{get:function(){if(this.currentAnim)return this.currentAnim.name}}),Object.defineProperty(i.AnimationManager.prototype,"frame",{get:function(){if(this.currentFrame)return this.currentFrame.index},set:function(t){var e;"number"==typeof t&&this._frameData&&(e=this._frameData.getFrame(t))&&(this.currentFrame=e,this.sprite.setFrame(this.currentFrame))}}),Object.defineProperty(i.AnimationManager.prototype,"frameName",{get:function(){if(this.currentFrame)return this.currentFrame.name},set:function(t){var e;"string"==typeof t&&this._frameData&&(e=this._frameData.getFrameByName(t))?(this.currentFrame=e,this._frameIndex=this.currentFrame.index,this.sprite.setFrame(this.currentFrame)):console.warn("Cannot set frameName: "+t)}}),i.Animation=function(t,e,s,n,r,o,a){void 0===a&&(a=!1),this.game=t,this._parent=e,this._frameData=n,this.name=s,this._frames=[],this._frames=this._frames.concat(r),this.delay=1e3/o,this.loop=a,this.loopCount=0,this.killOnComplete=!1,this.isFinished=!1,this.isPlaying=!1,this.isPaused=!1,this._pauseStartTime=0,this._frameIndex=0,this._frameDiff=0,this._frameSkip=1,this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]),this.onStart=new i.Signal,this.onUpdate=null,this.onComplete=new i.Signal,this.onLoop=new i.Signal,this.isReversed=!1,this.game.onPause.add(this.onPause,this),this.game.onResume.add(this.onResume,this)},i.Animation.prototype={play:function(t,e,i){return"number"==typeof t&&(this.delay=1e3/t),"boolean"==typeof e&&(this.loop=e),void 0!==i&&(this.killOnComplete=i),this.isPlaying=!0,this.isFinished=!1,this.paused=!1,this.loopCount=0,this._timeLastFrame=this.game.time.time,this._timeNextFrame=this.game.time.time+this.delay,this._frameIndex=this.isReversed?this._frames.length-1:0,this.updateCurrentFrame(!1,!0),this._parent.events.onAnimationStart$dispatch(this._parent,this),this.onStart.dispatch(this._parent,this),this._parent.animations.currentAnim=this,this._parent.animations.currentFrame=this.currentFrame,this},restart:function(){this.isPlaying=!0,this.isFinished=!1,this.paused=!1,this.loopCount=0,this._timeLastFrame=this.game.time.time,this._timeNextFrame=this.game.time.time+this.delay,this._frameIndex=0,this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]),this._parent.setFrame(this.currentFrame),this._parent.animations.currentAnim=this,this._parent.animations.currentFrame=this.currentFrame,this.onStart.dispatch(this._parent,this)},reverse:function(){return this.reversed=!this.reversed,this},reverseOnce:function(){return this.onComplete.addOnce(this.reverse,this),this.reverse()},setFrame:function(t,e){var i;if(void 0===e&&(e=!1),"string"==typeof t)for(s=0;s<this._frames.length;s++)this._frameData.getFrame(this._frames[s]).name===t&&(i=s);else if("number"==typeof t)if(e)i=t;else for(var s=0;s<this._frames.length;s++)this._frames[s]===t&&(i=s);if(i){var n=this.isReversed?-1:1;this._frameIndex=i-n,this._timeNextFrame=this.game.time.time,this.update()}},stop:function(t,e){void 0===t&&(t=!1),void 0===e&&(e=!1),this.isPlaying=!1,this.isFinished=!0,this.paused=!1,t&&(this.currentFrame=this._frameData.getFrame(this._frames[0]),this._parent.setFrame(this.currentFrame)),e&&(this._parent.events.onAnimationComplete$dispatch(this._parent,this),this.onComplete.dispatch(this._parent,this))},onPause:function(){this.isPlaying&&(this._frameDiff=this._timeNextFrame-this.game.time.time)},onResume:function(){this.isPlaying&&(this._timeNextFrame=this.game.time.time+this._frameDiff)},update:function(){return!this.isPaused&&(!!(this.isPlaying&&this.game.time.time>=this._timeNextFrame)&&(this._frameSkip=1,this._frameDiff=this.game.time.time-this._timeNextFrame,this._timeLastFrame=this.game.time.time,this._frameDiff>this.delay?(this._frameSkip=Math.floor(this._frameDiff/this.delay),this._frameDiff-=this._frameSkip*this.delay):this._frameDiff=0,this._timeNextFrame=this.game.time.time+(this.delay-this._frameDiff),this.isReversed?this._frameIndex-=this._frameSkip:this._frameIndex+=this._frameSkip,!this.isReversed&&this._frameIndex>=this._frames.length||this.isReversed&&this._frameIndex<=-1?this.loop?(this._frameIndex=Math.abs(this._frameIndex)%this._frames.length,this.isReversed&&(this._frameIndex=this._frames.length-1-this._frameIndex),this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]),this.currentFrame&&this._parent.setFrame(this.currentFrame),this.loopCount++,this._parent.events.onAnimationLoop$dispatch(this._parent,this),this.onLoop.dispatch(this._parent,this),!this.onUpdate||(this.onUpdate.dispatch(this,this.currentFrame),!!this._frameData)):(this.complete(),!1):this.updateCurrentFrame(!0)))},updateCurrentFrame:function(t,e){if(void 0===e&&(e=!1),!this._frameData)return!1;var i=this.currentFrame.index;return this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]),this.currentFrame&&(e||!e&&i!==this.currentFrame.index)&&this._parent.setFrame(this.currentFrame),!this.onUpdate||!t||(this.onUpdate.dispatch(this,this.currentFrame),!!this._frameData)},next:function(t){void 0===t&&(t=1);var e=this._frameIndex+t;e>=this._frames.length&&(this.loop?e%=this._frames.length:e=this._frames.length-1),e!==this._frameIndex&&(this._frameIndex=e,this.updateCurrentFrame(!0))},previous:function(t){void 0===t&&(t=1);var e=this._frameIndex-t;e<0&&(this.loop?e=this._frames.length+e:e++),e!==this._frameIndex&&(this._frameIndex=e,this.updateCurrentFrame(!0))},updateFrameData:function(t){this._frameData=t,this.currentFrame=this._frameData?this._frameData.getFrame(this._frames[this._frameIndex%this._frames.length]):null},destroy:function(){this._frameData&&(this.game.onPause.remove(this.onPause,this),this.game.onResume.remove(this.onResume,this),this.game=null,this._parent=null,this._frames=null,this._frameData=null,this.currentFrame=null,this.isPlaying=!1,this.onStart.dispose(),this.onLoop.dispose(),this.onComplete.dispose(),this.onUpdate&&this.onUpdate.dispose())},complete:function(){this._frameIndex=this._frames.length-1,this.currentFrame=this._frameData.getFrame(this._frames[this._frameIndex]),this.isPlaying=!1,this.isFinished=!0,this.paused=!1,this._parent.events.onAnimationComplete$dispatch(this._parent,this),this.onComplete.dispatch(this._parent,this),this.killOnComplete&&this._parent.kill()}},i.Animation.prototype.constructor=i.Animation,Object.defineProperty(i.Animation.prototype,"paused",{get:function(){return this.isPaused},set:function(t){this.isPaused=t,t?this._pauseStartTime=this.game.time.time:this.isPlaying&&(this._timeNextFrame=this.game.time.time+this.delay)}}),Object.defineProperty(i.Animation.prototype,"reversed",{get:function(){return this.isReversed},set:function(t){this.isReversed=t}}),Object.defineProperty(i.Animation.prototype,"frameTotal",{get:function(){return this._frames.length}}),Object.defineProperty(i.Animation.prototype,"frame",{get:function(){return null!==this.currentFrame?this.currentFrame.index:this._frameIndex},set:function(t){this.currentFrame=this._frameData.getFrame(this._frames[t]),null!==this.currentFrame&&(this._frameIndex=t,this._parent.setFrame(this.currentFrame),this.onUpdate&&this.onUpdate.dispatch(this,this.currentFrame))}}),Object.defineProperty(i.Animation.prototype,"speed",{get:function(){return 1e3/this.delay},set:function(t){t>0&&(this.delay=1e3/t)}}),Object.defineProperty(i.Animation.prototype,"enableUpdate",{get:function(){return null!==this.onUpdate},set:function(t){t&&null===this.onUpdate?this.onUpdate=new i.Signal:t||null===this.onUpdate||(this.onUpdate.dispose(),this.onUpdate=null)}}),i.Animation.generateFrameNames=function(t,e,s,n,r){void 0===n&&(n="");var o=[],a="";if(e<s)for(h=e;h<=s;h++)a=t+(a="number"==typeof r?i.Utils.pad(h.toString(),r,"0",1):h.toString())+n,o.push(a);else for(var h=e;h>=s;h--)a=t+(a="number"==typeof r?i.Utils.pad(h.toString(),r,"0",1):h.toString())+n,o.push(a);return o},i.Frame=function(t,e,s,n,r,o){this.index=t,this.x=e,this.y=s,this.width=n,this.height=r,0!==this.width&&0!==this.height||console.warn('Phaser.Frame: Frame "'+this.name+'" has a width or height of zero'),this.name=o,this.centerX=Math.floor(n/2),this.centerY=Math.floor(r/2),this.distance=i.Math.distance(0,0,n,r),this.rotated=!1,this.trimmed=!1,this.sourceSizeW=n,this.sourceSizeH=r,this.spriteSourceSizeX=0,this.spriteSourceSizeY=0,this.spriteSourceSizeW=0,this.spriteSourceSizeH=0,this.right=this.x+this.width,this.bottom=this.y+this.height},i.Frame.prototype={resize:function(t,e){this.width=t,this.height=e,this.centerX=Math.floor(t/2),this.centerY=Math.floor(e/2),this.distance=i.Math.distance(0,0,t,e),this.sourceSizeW=t,this.sourceSizeH=e,this.right=this.x+t,this.bottom=this.y+e},setTrim:function(t,e,i,s,n,r,o){this.trimmed=t,t&&(this.sourceSizeW=e,this.sourceSizeH=i,this.centerX=Math.floor(e/2),this.centerY=Math.floor(i/2),this.spriteSourceSizeX=s,this.spriteSourceSizeY=n,this.spriteSourceSizeW=r,this.spriteSourceSizeH=o)},clone:function(){var t=new i.Frame(this.index,this.x,this.y,this.width,this.height,this.name);for(var e in this)this.hasOwnProperty(e)&&(t[e]=this[e]);return t},getRect:function(t){return void 0===t?t=new i.Rectangle(this.x,this.y,this.width,this.height):t.setTo(this.x,this.y,this.width,this.height),t}},i.Frame.prototype.constructor=i.Frame,i.FrameData=function(){this._frames=[],this._frameNames=[]},i.FrameData.prototype={addFrame:function(t){return t.index=this._frames.length,this._frames.push(t),""!==t.name&&(this._frameNames[t.name]=t.index),t},getFrame:function(t){return t>=this._frames.length&&(t=0),this._frames[t]},getFrameByName:function(t){return"number"==typeof this._frameNames[t]?this._frames[this._frameNames[t]]:null},checkFrameName:function(t){return null!=this._frameNames[t]},clone:function(){for(var t=new i.FrameData,e=0;e<this._frames.length;e++)t._frames.push(this._frames[e].clone());for(var s in this._frameNames)this._frameNames.hasOwnProperty(s)&&t._frameNames.push(this._frameNames[s]);return t},getFrameRange:function(t,e,i){void 0===i&&(i=[]);for(var s=t;s<=e;s++)i.push(this._frames[s]);return i},getFrames:function(t,e,i){if(void 0===e&&(e=!0),void 0===i&&(i=[]),void 0===t||0===t.length)for(s=0;s<this._frames.length;s++)i.push(this._frames[s]);else for(var s=0;s<t.length;s++)e?i.push(this.getFrame(t[s])):i.push(this.getFrameByName(t[s]));return i},getFrameIndexes:function(t,e,i){if(void 0===e&&(e=!0),void 0===i&&(i=[]),void 0===t||0===t.length)for(s=0;s<this._frames.length;s++)i.push(this._frames[s].index);else for(var s=0;s<t.length;s++)e&&this._frames[t[s]]?i.push(this._frames[t[s]].index):this.getFrameByName(t[s])&&i.push(this.getFrameByName(t[s]).index);return i},destroy:function(){this._frames=null,this._frameNames=null}},i.FrameData.prototype.constructor=i.FrameData,Object.defineProperty(i.FrameData.prototype,"total",{get:function(){return this._frames.length}}),i.AnimationParser={spriteSheet:function(t,e,s,n,r,o,a,h){void 0===r&&(r=-1),void 0===o&&(o=0),void 0===a&&(a=0),void 0===h&&(h=0);var u=e;if("string"==typeof e&&(u=t.cache.getImage(e)),null===u)return null;var l=u.width,c=u.height;s<=0&&(s=Math.floor(-l/Math.min(-1,s))),n<=0&&(n=Math.floor(-c/Math.min(-1,n)));var d=Math.floor((l-o)/(s+a))*Math.floor((c-o)/(n+a));if(h>d||h<-d)return console.warn("Phaser.AnimationParser.spriteSheet: skipFrames = "+h.toString()+" is larger than total sprite number "+d.toString()),null;if(h<0&&(h=d+h),-1!==r&&(d=h+r),0===l||0===c||l<s||c<n||0===d)return console.warn("Phaser.AnimationParser.spriteSheet: '"+e+"'s width/height zero or width/height < given frameWidth/frameHeight"),null;for(var p=new i.FrameData,f=o,g=o,m=0;m<d;m++)p.addFrame(new i.Frame(m,f,g,s,n,"")),(f+=s+a)+s>l&&(f=o,g+=n+a);return p},JSONData:function(t,e){if(!e.frames)return console.warn("Phaser.AnimationParser.JSONData: Invalid Texture Atlas JSON given, missing 'frames' array"),void console.log(e);for(var s,n=new i.FrameData,r=e.frames,o=0;o<r.length;o++)s=n.addFrame(new i.Frame(o,r[o].frame.x,r[o].frame.y,r[o].frame.w,r[o].frame.h,r[o].filename)),r[o].trimmed&&s.setTrim(r[o].trimmed,r[o].sourceSize.w,r[o].sourceSize.h,r[o].spriteSourceSize.x,r[o].spriteSourceSize.y,r[o].spriteSourceSize.w,r[o].spriteSourceSize.h),r[o].rotated&&(s.rotated=!0);return n},JSONDataPyxel:function(t,e){if(["layers","tilewidth","tileheight","tileswide","tileshigh"].forEach(function(t){if(!e[t])return console.warn('Phaser.AnimationParser.JSONDataPyxel: Invalid Pyxel Tilemap JSON given, missing "'+t+'" key.'),void console.log(e)}),1!==e.layers.length)return console.warn("Phaser.AnimationParser.JSONDataPyxel: Too many layers, this parser only supports flat Tilemaps."),void console.log(e);for(var s=new i.FrameData,n=e.tileheight,r=e.tilewidth,o=e.layers[0].tiles,a=0;a<o.length;a++)s.addFrame(new i.Frame(a,o[a].x,o[a].y,r,n,"frame_"+a)).setTrim(!1);return s},JSONDataHash:function(t,e){if(!e.frames)return console.warn("Phaser.AnimationParser.JSONDataHash: Invalid Texture Atlas JSON given, missing 'frames' object"),void console.log(e);var s,n=new i.FrameData,r=e.frames,o=0;for(var a in r)s=n.addFrame(new i.Frame(o,r[a].frame.x,r[a].frame.y,r[a].frame.w,r[a].frame.h,a)),r[a].trimmed&&s.setTrim(r[a].trimmed,r[a].sourceSize.w,r[a].sourceSize.h,r[a].spriteSourceSize.x,r[a].spriteSourceSize.y,r[a].spriteSourceSize.w,r[a].spriteSourceSize.h),r[a].rotated&&(s.rotated=!0),o++;return n},XMLData:function(t,e){if(e.getElementsByTagName("TextureAtlas")){for(var s,n,r,o,a,h,u,l,c,d,p,f=new i.FrameData,g=e.getElementsByTagName("SubTexture"),m=0;m<g.length;m++)n=(r=g[m].attributes).name.value,o=parseInt(r.x.value,10),a=parseInt(r.y.value,10),h=parseInt(r.width.value,10),u=parseInt(r.height.value,10),l=null,c=null,r.frameX&&(l=Math.abs(parseInt(r.frameX.value,10)),c=Math.abs(parseInt(r.frameY.value,10)),d=parseInt(r.frameWidth.value,10),p=parseInt(r.frameHeight.value,10)),s=f.addFrame(new i.Frame(m,o,a,h,u,n)),null===l&&null===c||s.setTrim(!0,h,u,l,c,d,p);return f}console.warn("Phaser.AnimationParser.XMLData: Invalid Texture Atlas XML given, missing <TextureAtlas> tag")}},i.Cache=function(t){this.game=t,this.autoResolveURL=!1,this._cache={canvas:{},image:{},texture:{},sound:{},video:{},text:{},json:{},xml:{},physics:{},tilemap:{},binary:{},bitmapData:{},bitmapFont:{},shader:{},renderTexture:{},compressedTexture:{}},this._urlMap={},this._urlResolver=new Image,this._urlTemp=null,this.onSoundUnlock=new i.Signal,this._cacheMap=[],this._cacheMap[i.Cache.CANVAS]=this._cache.canvas,this._cacheMap[i.Cache.IMAGE]=this._cache.image,this._cacheMap[i.Cache.TEXTURE]=this._cache.texture,this._cacheMap[i.Cache.SOUND]=this._cache.sound,this._cacheMap[i.Cache.TEXT]=this._cache.text,this._cacheMap[i.Cache.PHYSICS]=this._cache.physics,this._cacheMap[i.Cache.TILEMAP]=this._cache.tilemap,this._cacheMap[i.Cache.BINARY]=this._cache.binary,this._cacheMap[i.Cache.BITMAPDATA]=this._cache.bitmapData,this._cacheMap[i.Cache.BITMAPFONT]=this._cache.bitmapFont,this._cacheMap[i.Cache.JSON]=this._cache.json,this._cacheMap[i.Cache.XML]=this._cache.xml,this._cacheMap[i.Cache.VIDEO]=this._cache.video,this._cacheMap[i.Cache.SHADER]=this._cache.shader,this._cacheMap[i.Cache.RENDER_TEXTURE]=this._cache.renderTexture,this._pendingCount=0,this.onReady=new i.Signal,this._addImages()},i.Cache.CANVAS=1,i.Cache.IMAGE=2,i.Cache.TEXTURE=3,i.Cache.SOUND=4,i.Cache.TEXT=5,i.Cache.PHYSICS=6,i.Cache.TILEMAP=7,i.Cache.BINARY=8,i.Cache.BITMAPDATA=9,i.Cache.BITMAPFONT=10,i.Cache.JSON=11,i.Cache.XML=12,i.Cache.VIDEO=13,i.Cache.SHADER=14,i.Cache.RENDER_TEXTURE=15,i.Cache.DEFAULT=null,i.Cache.DEFAULT_KEY="__default",i.Cache.DEFAULT_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABVJREFUeF7NwIEAAAAAgKD9qdeocAMAoAABm3DkcAAAAABJRU5ErkJggg==",i.Cache.MISSING=null,i.Cache.MISSING_KEY="__missing",i.Cache.MISSING_SRC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJ9JREFUeNq01ssOwyAMRFG46v//Mt1ESmgh+DFmE2GPOBARKb2NVjo+17PXLD8a1+pl5+A+wSgFygymWYHBb0FtsKhJDdZlncG2IzJ4ayoMDv20wTmSMzClEgbWYNTAkQ0Z+OJ+A/eWnAaR9+oxCF4Os0H8htsMUp+pwcgBBiMNnAwF8GqIgL2hAzaGFFgZauDPKABmowZ4GL369/0rwACp2yA/ttmvsQAAAABJRU5ErkJggg==",i.Cache.READY_TIMEOUT=1e3,i.Cache.prototype={addCompressedTextureMetaData:function(t,e,s,n){this.checkImageKey(t)&&this.removeImage(t);var r=s in i.LoaderParser?i.LoaderParser[s](n):n,o={key:t,url:e,data:r,base:new PIXI.BaseTexture(r,null,this.game.resolution),frame:new i.Frame(0,0,0,r.width,r.height,t),frameData:new i.FrameData,fileFormat:s};return o.frameData.addFrame(new i.Frame(0,0,0,r.width,r.height,e)),this._cache.image[t]=o,this._resolveURL(e,o),o},addCanvas:function(t,e,i){void 0===i&&(i=e.getContext("2d")),this._cache.canvas[t]={canvas:e,context:i}},addImage:function(t,e,s){this.checkImageKey(t)&&this.removeImage(t),!1===s.complete&&console.warn('Phaser.Cache.addImage: Image "'+t+"\" hasn't been retrieved yet");var n={key:t,url:e,data:s,base:new PIXI.BaseTexture(s,null,this.game.resolution),frame:new i.Frame(0,0,0,s.width,s.height,t),frameData:new i.FrameData};return n.frameData.addFrame(new i.Frame(0,0,0,s.width,s.height,e)),this._cache.image[t]=n,this._resolveURL(e,n),"__default"===t?i.Cache.DEFAULT=new PIXI.Texture(n.base):"__missing"===t&&(i.Cache.MISSING=new PIXI.Texture(n.base)),n},addImageAsync:function(t,e,i){var s=this,n=new Image;n.onload=function(){i.call(this,s.addImage(t,null,n)),s._removePending(),n.onload=null},this._addPending(),n.src=e},addDefaultImage:function(){this.addImageAsync(i.Cache.DEFAULT_KEY,i.Cache.DEFAULT_SRC,function(t){t.base.skipRender=!0,i.Cache.DEFAULT=new PIXI.Texture(t.base)})},addMissingImage:function(){this.addImageAsync(i.Cache.MISSING_KEY,i.Cache.MISSING_SRC,function(t){i.Cache.MISSING=new PIXI.Texture(t.base)})},addSound:function(t,e,i,s,n){void 0===s&&(s=!0,n=!1),void 0===n&&(s=!1,n=!0);var r=!1;n&&(r=!0),this._cache.sound[t]={url:e,data:i,isDecoding:!1,decoded:r,webAudio:s,audioTag:n,locked:this.game.sound.touchLocked},this._resolveURL(e,this._cache.sound[t])},addText:function(t,e,i){this._cache.text[t]={url:e,data:i},this._resolveURL(e,this._cache.text[t])},addPhysicsData:function(t,e,i,s){this._cache.physics[t]={url:e,data:i,format:s},this._resolveURL(e,this._cache.physics[t])},addTilemap:function(t,e,i,s){this._cache.tilemap[t]={url:e,data:i,format:s},this._resolveURL(e,this._cache.tilemap[t])},addBinary:function(t,e){this._cache.binary[t]=e},addBitmapData:function(t,e,s){return e.key=t,void 0===s&&(s=new i.FrameData).addFrame(e.textureFrame),this._cache.bitmapData[t]={data:e,frameData:s},e},addBitmapFont:function(t,e,s,n,r,o,a){var h={url:e,data:s,font:null,base:new PIXI.BaseTexture(s,null,this.game.resolution)};void 0===o&&(o=0),void 0===a&&(a=0),h.font="json"===r?i.LoaderParser.jsonBitmapFont(n,h.base,o,a,!1,this.game.resolution):i.LoaderParser.xmlBitmapFont(n,h.base,o,a,!1,this.game.resolution),this._cache.bitmapFont[t]=h,this._resolveURL(e,h)},addBitmapFontFromAtlas:function(t,e,s,n,r,o,a){var h=this.getFrameByName(e,s);if(h){var u={font:null,base:this.getBaseTexture(e),frame:h};void 0===o&&(o=0),void 0===a&&(a=0);var l;"json"===r?(l=this.getJSON(n),u.font=i.LoaderParser.jsonBitmapFont(l,u.base,o,a,h,this.game.resolution)):(l=this.getXML(n),u.font=i.LoaderParser.xmlBitmapFont(l,u.base,o,a,h,this.game.resolution)),this._cache.bitmapFont[t]=u}},addJSON:function(t,e,i){this._cache.json[t]={url:e,data:i},this._resolveURL(e,this._cache.json[t])},addXML:function(t,e,i){this._cache.xml[t]={url:e,data:i},this._resolveURL(e,this._cache.xml[t])},addVideo:function(t,e,i,s){this._cache.video[t]={url:e,data:i,isBlob:s,locked:!0},this._resolveURL(e,this._cache.video[t])},addShader:function(t,e,i){this._cache.shader[t]={url:e,data:i},this._resolveURL(e,this._cache.shader[t])},addRenderTexture:function(t,e){this._cache.renderTexture[t]={texture:e,frame:new i.Frame(0,0,0,e.width,e.height,"","")}},addSpriteSheet:function(t,e,s,n,r,o,a,h,u){void 0===o&&(o=-1),void 0===a&&(a=0),void 0===h&&(h=0);var l={key:t,url:e,data:s,frameWidth:n,frameHeight:r,margin:a,spacing:h,base:new PIXI.BaseTexture(s,null,this.game.resolution),frameData:i.AnimationParser.spriteSheet(this.game,s,n,r,o,a,h,u)};this._cache.image[t]=l,this._resolveURL(e,l)},addTextureAtlas:function(t,e,s,n,r){var o={key:t,url:e,data:s,base:new PIXI.BaseTexture(s,null,this.game.resolution)};r===i.Loader.TEXTURE_ATLAS_XML_STARLING?o.frameData=i.AnimationParser.XMLData(this.game,n,t):r===i.Loader.TEXTURE_ATLAS_JSON_PYXEL?o.frameData=i.AnimationParser.JSONDataPyxel(this.game,n,t):Array.isArray(n.frames)?o.frameData=i.AnimationParser.JSONData(this.game,n,t):o.frameData=i.AnimationParser.JSONDataHash(this.game,n,t),this._cache.image[t]=o,this._resolveURL(e,o)},reloadSound:function(t){var e=this,i=this.getSound(t);i&&(i.data.src=i.url,i.data.addEventListener("canplaythrough",function(){return e.reloadSoundComplete(t)},!1),i.data.load())},reloadSoundComplete:function(t){var e=this.getSound(t);e&&(e.locked=!1,this.onSoundUnlock.dispatch(t))},updateSound:function(t,e,i){var s=this.getSound(t);s&&(s[e]=i)},decodedSound:function(t,e){var i=this.getSound(t);i.data=e,i.decoded=!0,i.isDecoding=!1},isSoundDecoded:function(t){var e=this.getItem(t,i.Cache.SOUND,"isSoundDecoded");if(e)return e.decoded},isSoundReady:function(t){var e=this.getItem(t,i.Cache.SOUND,"isSoundDecoded");if(e)return e.decoded&&!this.game.sound.touchLocked},checkKey:function(t,e){return!!this._cacheMap[t][e]},checkURL:function(t){return!!this._urlMap[this._resolveURL(t)]},checkCanvasKey:function(t){return this.checkKey(i.Cache.CANVAS,t)},checkImageKey:function(t){return this.checkKey(i.Cache.IMAGE,t)},checkTextureKey:function(t){return this.checkKey(i.Cache.TEXTURE,t)},checkSoundKey:function(t){return this.checkKey(i.Cache.SOUND,t)},checkTextKey:function(t){return this.checkKey(i.Cache.TEXT,t)},checkPhysicsKey:function(t){return this.checkKey(i.Cache.PHYSICS,t)},checkTilemapKey:function(t){return this.checkKey(i.Cache.TILEMAP,t)},checkBinaryKey:function(t){return this.checkKey(i.Cache.BINARY,t)},checkBitmapDataKey:function(t){return this.checkKey(i.Cache.BITMAPDATA,t)},checkBitmapFontKey:function(t){return this.checkKey(i.Cache.BITMAPFONT,t)},checkJSONKey:function(t){return this.checkKey(i.Cache.JSON,t)},checkXMLKey:function(t){return this.checkKey(i.Cache.XML,t)},checkVideoKey:function(t){return this.checkKey(i.Cache.VIDEO,t)},checkShaderKey:function(t){return this.checkKey(i.Cache.SHADER,t)},checkRenderTextureKey:function(t){return this.checkKey(i.Cache.RENDER_TEXTURE,t)},getItem:function(t,e,i,s){return this.checkKey(e,t)?void 0===s?this._cacheMap[e][t]:this._cacheMap[e][t][s]:(i&&console.warn("Phaser.Cache."+i+': Key "'+t+'" not found in Cache.'),null)},getCanvas:function(t){return this.getItem(t,i.Cache.CANVAS,"getCanvas","canvas")},getImage:function(t,e){void 0!==t&&null!==t||(t="__default"),void 0===e&&(e=!1);var s=this.getItem(t,i.Cache.IMAGE,"getImage");return null===s&&(s=this.getItem("__missing",i.Cache.IMAGE,"getImage")),e?s:s.data},getTextureFrame:function(t){return this.getItem(t,i.Cache.TEXTURE,"getTextureFrame","frame")},getSound:function(t){return this.getItem(t,i.Cache.SOUND,"getSound")},getSoundData:function(t){return this.getItem(t,i.Cache.SOUND,"getSoundData","data")},getText:function(t){return this.getItem(t,i.Cache.TEXT,"getText","data")},getPhysicsData:function(t,e,s){var n=this.getItem(t,i.Cache.PHYSICS,"getPhysicsData","data");if(null===n||void 0===e||null===e)return n;if(n[e]){var r=n[e];if(!r||!s)return r;for(var o in r)if((o=r[o]).fixtureKey===s)return o;console.warn('Phaser.Cache.getPhysicsData: Could not find given fixtureKey: "'+s+" in "+t+'"')}else console.warn('Phaser.Cache.getPhysicsData: Invalid key/object: "'+t+" / "+e+'"');return null},getTilemapData:function(t){return this.getItem(t,i.Cache.TILEMAP,"getTilemapData")},getBinary:function(t){return this.getItem(t,i.Cache.BINARY,"getBinary")},getBitmapData:function(t){return this.getItem(t,i.Cache.BITMAPDATA,"getBitmapData","data")},getBitmapFont:function(t){return this.getItem(t,i.Cache.BITMAPFONT,"getBitmapFont")},getJSON:function(t,e){var s=this.getItem(t,i.Cache.JSON,"getJSON","data");return s?e?i.Utils.extend(!0,Array.isArray(s)?[]:{},s):s:null},getXML:function(t){return this.getItem(t,i.Cache.XML,"getXML","data")},getVideo:function(t){return this.getItem(t,i.Cache.VIDEO,"getVideo")},getShader:function(t){return this.getItem(t,i.Cache.SHADER,"getShader","data")},getRenderTexture:function(t){return this.getItem(t,i.Cache.RENDER_TEXTURE,"getRenderTexture")},getBaseTexture:function(t,e){return void 0===e&&(e=i.Cache.IMAGE),this.getItem(t,e,"getBaseTexture","base")},getFrame:function(t,e){return void 0===e&&(e=i.Cache.IMAGE),this.getItem(t,e,"getFrame","frame")},getFrameCount:function(t,e){var i=this.getFrameData(t,e);return i?i.total:0},getFrameData:function(t,e){return void 0===e&&(e=i.Cache.IMAGE),this.getItem(t,e,"getFrameData","frameData")},hasFrameData:function(t,e){return void 0===e&&(e=i.Cache.IMAGE),null!==this.getItem(t,e,"","frameData")},updateFrameData:function(t,e,s){void 0===s&&(s=i.Cache.IMAGE),this._cacheMap[s][t]&&(this._cacheMap[s][t].frameData=e)},getFrameByIndex:function(t,e,i){var s=this.getFrameData(t,i);return s?s.getFrame(e):null},getFrameByName:function(t,e,i){var s=this.getFrameData(t,i);return s?s.getFrameByName(e):null},getURL:function(t){return(t=this._resolveURL(t))?this._urlMap[t]:(console.warn('Phaser.Cache.getUrl: Invalid url: "'+t+'" or Cache.autoResolveURL was false'),null)},getKeys:function(t){void 0===t&&(t=i.Cache.IMAGE);var e=[];if(this._cacheMap[t])for(var s in this._cacheMap[t])"__default"!==s&&"__missing"!==s&&e.push(s);return e},removeCanvas:function(t){delete this._cache.canvas[t]},removeImage:function(t,e){void 0===e&&(e=!0);var i=this.getImage(t,!0);e&&i.base&&i.base.destroy(),delete this._cache.image[t]},removeSound:function(t){delete this._cache.sound[t]},removeText:function(t){delete this._cache.text[t]},removePhysics:function(t){delete this._cache.physics[t]},removeTilemap:function(t){delete this._cache.tilemap[t]},removeBinary:function(t){delete this._cache.binary[t]},removeBitmapData:function(t){delete this._cache.bitmapData[t]},removeBitmapFont:function(t){delete this._cache.bitmapFont[t]},removeJSON:function(t){delete this._cache.json[t]},removeXML:function(t){delete this._cache.xml[t]},removeVideo:function(t){delete this._cache.video[t]},removeShader:function(t){delete this._cache.shader[t]},removeRenderTexture:function(t){delete this._cache.renderTexture[t]},removeSpriteSheet:function(t){delete this._cache.spriteSheet[t]},removeTextureAtlas:function(t){delete this._cache.image[t]},clearGLTextures:function(){for(var t in this._cache.image)this._cache.image[t].base._glTextures=[]},_resolveURL:function(t,e){return this.autoResolveURL?(this._urlResolver.src=this.game.load.baseURL+t,this._urlTemp=this._urlResolver.src,this._urlResolver.src="",e&&(this._urlMap[this._urlTemp]=e),this._urlTemp):null},destroy:function(){for(var t=0;t<this._cacheMap.length;t++){var e=this._cacheMap[t];for(var i in e)"__default"!==i&&"__missing"!==i&&(this.destroyItem(e[i]),delete e[i])}this._urlMap=null,this._urlResolver=null,this._urlTemp=null},destroyItem:function(t){t.destroy?t.destroy():(t.base&&t.base.destroy&&t.base.destroy(),t.data&&t.data.destroy&&t.data.destroy(),t.frameData&&t.frameData.destroy&&t.frameData.destroy(),t.texture&&t.texture.destroy&&t.texture.destroy(!0))},_addImages:function(){this._pendingCount=0,this.addDefaultImage(),this.addMissingImage();var t=this,e=i.Cache.READY_TIMEOUT;i.Cache.READY_TIMEOUT>0?setTimeout(function(){t.isReady||(console.warn("Phaser.Cache: Still waiting for images after %s ms.",e),t._ready())},i.Cache.READY_TIMEOUT):this._ready()},_addPending:function(){this._pendingCount+=1},_removePending:function(){this._pendingCount-=1,this._checkReady()},_checkReady:function(){this.isReady&&this._ready()},_ready:function(){this._pendingCount=0,this.onReady.dispatch(this)}},i.Cache.prototype.constructor=i.Cache,Object.defineProperty(i.Cache.prototype,"isReady",{get:function(){return this._pendingCount<=0}}),i.Loader=function(t){this.game=t,this.cache=t.cache,this.resetLocked=!1,this.isLoading=!1,this.hasLoaded=!1,this.preloadSprite=null,this.crossOrigin=!1,this.baseURL="",this.path="",this.headers={requestedWith:!1,json:"application/json",xml:"application/xml"},this.onLoadStart=new i.Signal,this.onBeforeLoadComplete=new i.Signal,this.onLoadComplete=new i.Signal,this.onPackComplete=new i.Signal,this.onFileStart=new i.Signal,this.onFileComplete=new i.Signal,this.onFileError=new i.Signal,this.enableParallel=!0,this.maxParallelDownloads=4,this._withSyncPointDepth=0,this._fileList=[],this._flightQueue=[],this._processingHead=0,this._fileLoadStarted=!1,this._totalPackCount=0,this._totalFileCount=0,this._loadedPackCount=0,this._loadedFileCount=0},i.Loader.TEXTURE_ATLAS_JSON_ARRAY=0,i.Loader.TEXTURE_ATLAS_JSON_HASH=1,i.Loader.TEXTURE_ATLAS_XML_STARLING=2,i.Loader.PHYSICS_LIME_CORONA_JSON=3,i.Loader.PHYSICS_PHASER_JSON=4,i.Loader.TEXTURE_ATLAS_JSON_PYXEL=5,i.Loader.prototype={setPreloadSprite:function(t,e){e=e||0,this.preloadSprite={sprite:t,direction:e,width:t.width,height:t.height,rect:null},this.preloadSprite.rect=0===e?new i.Rectangle(0,0,1,t.height):new i.Rectangle(0,0,t.width,1),t.crop(this.preloadSprite.rect),t.visible=!0},resize:function(){this.preloadSprite&&this.preloadSprite.height!==this.preloadSprite.sprite.height&&(this.preloadSprite.rect.height=this.preloadSprite.sprite.height)},checkKeyExists:function(t,e){return this.getAssetIndex(t,e)>-1},getAssetIndex:function(t,e){for(var i=-1,s=0;s<this._fileList.length;s++){var n=this._fileList[s];if(n.type===t&&n.key===e&&(i=s,!n.loaded&&!n.loading))break}return i},getAsset:function(t,e){var i=this.getAssetIndex(t,e);return i>-1&&{index:i,file:this._fileList[i]}},reset:function(t,e){void 0===e&&(e=!1),this.resetLocked||(t&&(this.preloadSprite=null),this.isLoading=!1,this._processingHead=0,this._fileList.length=0,this._flightQueue.length=0,this._fileLoadStarted=!1,this._totalFileCount=0,this._totalPackCount=0,this._loadedPackCount=0,this._loadedFileCount=0,e&&(this.onLoadStart.removeAll(),this.onLoadComplete.removeAll(),this.onPackComplete.removeAll(),this.onFileStart.removeAll(),this.onFileComplete.removeAll(),this.onFileError.removeAll()))},addToFileList:function(t,e,i,s,n,r){if(void 0===n&&(n=!1),void 0===e||""===e)return console.warn("Phaser.Loader: Invalid or no key given of type "+t),this;if(void 0===i||null===i){if(!r)return console.warn("Phaser.Loader: No URL given for file type: "+t+" key: "+e),this;i=e+r}var o={type:t,key:e,path:this.path,url:i,syncPoint:this._withSyncPointDepth>0,data:null,loading:!1,loaded:!1,error:!1};if(s)for(var a in s)o[a]=s[a];var h=this.getAssetIndex(t,e);if(n&&h>-1){var u=this._fileList[h];u.loading||u.loaded?(this._fileList.push(o),this._totalFileCount++):this._fileList[h]=o}else-1===h&&(this._fileList.push(o),this._totalFileCount++);return this},replaceInFileList:function(t,e,i,s){return this.addToFileList(t,e,i,s,!0)},pack:function(t,e,i,s){if(void 0===e&&(e=null),void 0===i&&(i=null),void 0===s&&(s=null),!e&&!i)return console.warn("Phaser.Loader.pack - Both url and data are null. One must be set."),this;var n={type:"packfile",key:t,url:e,path:this.path,syncPoint:!0,data:null,loading:!1,loaded:!1,error:!1,callbackContext:s};i&&("string"==typeof i&&(i=JSON.parse(i)),n.data=i||{},n.loaded=!0);for(var r=0;r<this._fileList.length+1;r++){var o=this._fileList[r];if(!o||!o.loaded&&!o.loading&&"packfile"!==o.type){this._fileList.splice(r,0,n),this._totalPackCount++;break}}return this},image:function(t,e,i){return"object"==typeof e?this.texture(t,e,i):this.addToFileList("image",t,e,void 0,i,".png")},imageFromBitmapData:function(t,e,i){return this.image(t,e.canvas.toDataURL("image/png"),i)},imageFromGrid:function(t,e,i,s,n,r){return this.imageFromBitmapData(t,this.game.create.grid(t,e,i,s,n,r,!1))},imageFromTexture:function(t,e,i,s,n){return this.imageFromBitmapData(t,this.game.create.texture(t,e,i,s,n,!1))},texture:function(t,e,s){if(this.game.renderType===i.WEBGL){var n,r=this.game.renderer.extensions.compression;for(n in e)if(n.toUpperCase()in r)return this.addToFileList("texture",t,e[n],void 0,s,".pvr")}return e.truecolor&&this.addToFileList("image",t,e.truecolor,void 0,s,".png"),this},images:function(t,e){if(Array.isArray(e))for(i=0;i<t.length;i++)this.image(t[i],e[i]);else for(var i=0;i<t.length;i++)this.image(t[i]);return this},text:function(t,e,i){return this.addToFileList("text",t,e,void 0,i,".txt")},json:function(t,e,i){return this.addToFileList("json",t,e,void 0,i,".json")},shader:function(t,e,i){return this.addToFileList("shader",t,e,void 0,i,".frag")},xml:function(t,e,i){return this.addToFileList("xml",t,e,void 0,i,".xml")},script:function(t,e,i,s){return void 0===i&&(i=!1),!1!==i&&void 0===s&&(s=this),this.addToFileList("script",t,e,{syncPoint:!0,callback:i,callbackContext:s},!1,".js")},binary:function(t,e,i,s){return void 0===i&&(i=!1),!1!==i&&void 0===s&&(s=i),this.addToFileList("binary",t,e,{callback:i,callbackContext:s},!1,".bin")},spritesheet:function(t,e,i,s,n,r,o,a){return void 0===n&&(n=-1),void 0===r&&(r=0),void 0===o&&(o=0),void 0===a&&(a=0),this.addToFileList("spritesheet",t,e,{frameWidth:i,frameHeight:s,frameMax:n,margin:r,spacing:o,skipFrames:a},!1,".png")},audio:function(t,e,i){return this.game.sound.noAudio?this:(void 0===i&&(i=!0),"string"==typeof e&&(e=[e]),this.addToFileList("audio",t,e,{buffer:null,autoDecode:i}))},audioSprite:function(t,e,i,s,n){return this.game.sound.noAudio?this:(void 0===i&&(i=null),void 0===s&&(s=null),void 0===n&&(n=!0),this.audio(t,e,n),i?this.json(t+"-audioatlas",i):s?("string"==typeof s&&(s=JSON.parse(s)),this.cache.addJSON(t+"-audioatlas","",s)):console.warn("Phaser.Loader.audiosprite - You must specify either a jsonURL or provide a jsonData object"),this)},audiosprite:function(t,e,i,s,n){return this.audioSprite(t,e,i,s,n)},video:function(t,e,i,s){return void 0===i&&(i=this.game.device.firefox?"loadeddata":"canplaythrough"),void 0===s&&(s=!1),"string"==typeof e&&(e=[e]),this.addToFileList("video",t,e,{buffer:null,asBlob:s,loadEvent:i})},tilemap:function(t,e,s,n){if(void 0===e&&(e=null),void 0===s&&(s=null),void 0===n&&(n=i.Tilemap.CSV),e||s||(e=n===i.Tilemap.CSV?t+".csv":t+".json"),s){switch(n){case i.Tilemap.CSV:break;case i.Tilemap.TILED_JSON:"string"==typeof s&&(s=JSON.parse(s))}this.cache.addTilemap(t,null,s,n)}else this.addToFileList("tilemap",t,e,{format:n});return this},physics:function(t,e,s,n){return void 0===e&&(e=null),void 0===s&&(s=null),void 0===n&&(n=i.Physics.LIME_CORONA_JSON),e||s||(e=t+".json"),s?("string"==typeof s&&(s=JSON.parse(s)),this.cache.addPhysicsData(t,null,s,n)):this.addToFileList("physics",t,e,{format:n}),this},bitmapFont:function(t,e,i,s,n,r){if(void 0!==e&&null!==e||(e=t+".png"),void 0===i&&(i=null),void 0===s&&(s=null),null===i&&null===s&&(i=t+".xml"),void 0===n&&(n=0),void 0===r&&(r=0),i)this.addToFileList("bitmapfont",t,e,{atlasURL:i,xSpacing:n,ySpacing:r});else if("string"==typeof s){var o,a;try{o=JSON.parse(s)}catch(t){a=this.parseXml(s)}if(!a&&!o)throw new Error("Phaser.Loader. Invalid Bitmap Font atlas given");this.addToFileList("bitmapfont",t,e,{atlasURL:null,atlasData:o||a,atlasType:o?"json":"xml",xSpacing:n,ySpacing:r})}return this},atlasJSONArray:function(t,e,s,n){return this.atlas(t,e,s,n,i.Loader.TEXTURE_ATLAS_JSON_ARRAY)},atlasJSONHash:function(t,e,s,n){return this.atlas(t,e,s,n,i.Loader.TEXTURE_ATLAS_JSON_HASH)},atlasXML:function(t,e,s,n){return void 0===s&&(s=null),void 0===n&&(n=null),s||n||(s=t+".xml"),this.atlas(t,e,s,n,i.Loader.TEXTURE_ATLAS_XML_STARLING)},atlas:function(t,e,s,n,r){if(void 0!==e&&null!==e||(e=t+".png"),void 0===s&&(s=null),void 0===n&&(n=null),void 0===r&&(r=i.Loader.TEXTURE_ATLAS_JSON_ARRAY),s||n||(s=r===i.Loader.TEXTURE_ATLAS_XML_STARLING?t+".xml":t+".json"),s)this.addToFileList("textureatlas",t,e,{atlasURL:s,format:r});else{switch(r){case i.Loader.TEXTURE_ATLAS_JSON_ARRAY:"string"==typeof n&&(n=JSON.parse(n));break;case i.Loader.TEXTURE_ATLAS_XML_STARLING:if("string"==typeof n){var o=this.parseXml(n);if(!o)throw new Error("Phaser.Loader. Invalid Texture Atlas XML given");n=o}}this.addToFileList("textureatlas",t,e,{atlasURL:null,atlasData:n,format:r})}return this},withSyncPoint:function(t,e){this._withSyncPointDepth++;try{t.call(e||this,this)}finally{this._withSyncPointDepth--}return this},addSyncPoint:function(t,e){var i=this.getAsset(t,e);return i&&(i.file.syncPoint=!0),this},removeFile:function(t,e){var i=this.getAsset(t,e);i&&(i.loaded||i.loading||this._fileList.splice(i.index,1))},removeAll:function(){this._fileList.length=0,this._flightQueue.length=0},start:function(){this.isLoading||(this.hasLoaded=!1,this.isLoading=!0,this.updateProgress(),this.processLoadQueue())},processLoadQueue:function(){if(!this.isLoading)return console.warn("Phaser.Loader - active loading canceled / reset"),void this.finishedLoading(!0);for(i=0;i<this._flightQueue.length;i++)((s=this._flightQueue[i]).loaded||s.error)&&(this._flightQueue.splice(i,1),i--,s.loading=!1,s.requestUrl=null,s.requestObject=null,s.error&&this.onFileError.dispatch(s.key,s),"packfile"!==s.type?(this._loadedFileCount++,this.onFileComplete.dispatch(this.progress,s.key,!s.error,this._loadedFileCount,this._totalFileCount)):"packfile"===s.type&&s.error&&(this._loadedPackCount++,this.onPackComplete.dispatch(s.key,!s.error,this._loadedPackCount,this._totalPackCount)));for(var t=!1,e=this.enableParallel?Math.max(1,this.maxParallelDownloads):1,i=this._processingHead;i<this._fileList.length;i++){var s=this._fileList[i];if("packfile"===s.type&&!s.error&&s.loaded&&i===this._processingHead&&(this.processPack(s),this._loadedPackCount++,this.onPackComplete.dispatch(s.key,!s.error,this._loadedPackCount,this._totalPackCount)),s.loaded||s.error?i===this._processingHead&&(this._processingHead=i+1):!s.loading&&this._flightQueue.length<e&&("packfile"!==s.type||s.data?t||(this._fileLoadStarted||(this._fileLoadStarted=!0,this.onLoadStart.dispatch()),this._flightQueue.push(s),s.loading=!0,this.onFileStart.dispatch(this.progress,s.key,s.url),this.loadFile(s)):(this._flightQueue.push(s),s.loading=!0,this.loadFile(s))),!s.loaded&&s.syncPoint&&(t=!0),this._flightQueue.length>=e||t&&this._loadedPackCount===this._totalPackCount)break}if(this.updateProgress(),this._processingHead>=this._fileList.length)this.finishedLoading();else if(!this._flightQueue.length){console.warn("Phaser.Loader - aborting: processing queue empty, loading may have stalled");var n=this;setTimeout(function(){n.finishedLoading(!0)},2e3)}},finishedLoading:function(t){this.hasLoaded||(this.hasLoaded=!0,this.isLoading=!1,t||this._fileLoadStarted||(this._fileLoadStarted=!0,this.onLoadStart.dispatch()),this.game.state.loadUpdate(),this.onBeforeLoadComplete.dispatch(),this.reset(),this.onLoadComplete.dispatch(),this.game.state&&this.game.state.loadComplete())},asyncComplete:function(t,e){void 0===e&&(e=""),t.loaded=!0,t.error=!!e,e&&(t.errorMessage=e,console.warn("Phaser.Loader - "+t.type+"["+t.key+"]: "+e)),this.processLoadQueue()},processPack:function(t){var e=t.data[t.key];if(e)for(var s=0;s<e.length;s++){var n=e[s];switch(n.type){case"image":this.image(n.key,n.url,n.overwrite);break;case"text":this.text(n.key,n.url,n.overwrite);break;case"json":this.json(n.key,n.url,n.overwrite);break;case"xml":this.xml(n.key,n.url,n.overwrite);break;case"script":this.script(n.key,n.url,n.callback,t.callbackContext||this);break;case"binary":this.binary(n.key,n.url,n.callback,t.callbackContext||this);break;case"spritesheet":this.spritesheet(n.key,n.url,n.frameWidth,n.frameHeight,n.frameMax,n.margin,n.spacing,n.skipFrames);break;case"video":this.video(n.key,n.urls);break;case"audio":this.audio(n.key,n.urls,n.autoDecode);break;case"audiosprite":this.audiosprite(n.key,n.urls,n.jsonURL,n.jsonData,n.autoDecode);break;case"tilemap":this.tilemap(n.key,n.url,n.data,i.Tilemap[n.format]);break;case"physics":this.physics(n.key,n.url,n.data,i.Loader[n.format]);break;case"bitmapFont":this.bitmapFont(n.key,n.textureURL,n.atlasURL,n.atlasData,n.xSpacing,n.ySpacing);break;case"atlasJSONArray":this.atlasJSONArray(n.key,n.textureURL,n.atlasURL,n.atlasData);break;case"atlasJSONHash":this.atlasJSONHash(n.key,n.textureURL,n.atlasURL,n.atlasData);break;case"atlasXML":this.atlasXML(n.key,n.textureURL,n.atlasURL,n.atlasData);break;case"atlas":this.atlas(n.key,n.textureURL,n.atlasURL,n.atlasData,i.Loader[n.format]);break;case"shader":this.shader(n.key,n.url,n.overwrite)}}else console.warn("Phaser.Loader - "+t.key+": pack has data, but not for pack key")},transformUrl:function(t,e){return!!t&&(t.match(/^(?:blob:|data:|http:\/\/|https:\/\/|\/\/)/)?t:this.baseURL+e.path+t)},loadFile:function(t){switch(t.type){case"packfile":this.xhrLoad(t,this.transformUrl(t.url,t),"text",this.fileComplete);break;case"image":case"spritesheet":case"textureatlas":case"bitmapfont":this.loadImageTag(t);break;case"audio":t.url=this.getAudioURL(t.url),t.url?this.game.sound.usingWebAudio?this.xhrLoad(t,this.transformUrl(t.url,t),"arraybuffer",this.fileComplete):this.game.sound.usingAudioTag&&this.loadAudioTag(t):this.fileError(t,null,"No supported audio URL specified or device does not have audio playback support");break;case"video":t.url=this.getVideoURL(t.url),t.url?t.asBlob?this.xhrLoad(t,this.transformUrl(t.url,t),"blob",this.fileComplete):this.loadVideoTag(t):this.fileError(t,null,"No supported video URL specified or device does not have video playback support");break;case"json":this.xhrLoad(t,this.transformUrl(t.url,t),"text",this.jsonLoadComplete);break;case"xml":this.xhrLoad(t,this.transformUrl(t.url,t),"text",this.xmlLoadComplete);break;case"tilemap":t.format===i.Tilemap.TILED_JSON?this.xhrLoad(t,this.transformUrl(t.url,t),"text",this.jsonLoadComplete):t.format===i.Tilemap.CSV?this.xhrLoad(t,this.transformUrl(t.url,t),"text",this.csvLoadComplete):this.asyncComplete(t,"invalid Tilemap format: "+t.format);break;case"text":case"script":case"shader":case"physics":this.xhrLoad(t,this.transformUrl(t.url,t),"text",this.fileComplete);break;case"texture":"truecolor"===t.key.split("_").pop()?this.loadImageTag(t):this.xhrLoad(t,this.transformUrl(t.url,t),"arraybuffer",this.fileComplete);break;case"binary":this.xhrLoad(t,this.transformUrl(t.url,t),"arraybuffer",this.fileComplete)}},loadImageTag:function(t){var e=this;t.data=new Image,t.data.name=t.key,this.crossOrigin&&(t.data.crossOrigin=this.crossOrigin),t.data.onload=function(){t.data.onload&&(t.data.onload=null,t.data.onerror=null,e.fileComplete(t))},t.data.onerror=function(){t.data.onload&&(t.data.onload=null,t.data.onerror=null,e.fileError(t))},t.data.src=this.transformUrl(t.url,t),!this.game.device.firefox&&t.data.complete&&t.data.width&&t.data.height&&(t.data.onload=null,t.data.onerror=null,this.fileComplete(t))},loadVideoTag:function(t){var e=this;t.data=document.createElement("video"),t.data.name=t.key,t.data.controls=!1,t.data.autoplay=!1;var s=function(){t.data.removeEventListener(t.loadEvent,s,!1),t.data.onerror=null,t.data.canplay=!0,i.GAMES[e.game.id].load.fileComplete(t)};t.data.onerror=function(){t.data.removeEventListener(t.loadEvent,s,!1),t.data.onerror=null,t.data.canplay=!1,e.fileError(t)},t.data.addEventListener(t.loadEvent,s,!1),t.data.src=this.transformUrl(t.url,t),t.data.load()},loadAudioTag:function(t){var e=this;if(this.game.sound.touchLocked)t.data=new Audio,t.data.name=t.key,t.data.preload="auto",t.data.src=this.transformUrl(t.url,t),this.fileComplete(t);else{t.data=new Audio,t.data.name=t.key;var i=function(){t.data.removeEventListener("canplaythrough",i,!1),t.data.onerror=null,e.fileComplete(t)};t.data.onerror=function(){t.data.removeEventListener("canplaythrough",i,!1),t.data.onerror=null,e.fileError(t)},t.data.preload="auto",t.data.src=this.transformUrl(t.url,t),t.data.addEventListener("canplaythrough",i,!1),t.data.load()}},xhrLoad:function(t,e,i,s,n){var r=new XMLHttpRequest;r.open("GET",e,!0),r.responseType=i,!1!==this.headers.requestedWith&&r.setRequestHeader("X-Requested-With",this.headers.requestedWith),this.headers[t.type]&&r.setRequestHeader("Accept",this.headers[t.type]),n=n||this.fileError;var o=this;r.onload=function(){try{return 4===r.readyState&&r.status>=400&&r.status<=599?n.call(o,t,r):s.call(o,t,r)}catch(e){o.hasLoaded?window.console&&console.error(e):o.asyncComplete(t,e.message||"Exception")}},r.onerror=function(){try{return n.call(o,t,r)}catch(e){o.hasLoaded?window.console&&console.error(e):o.asyncComplete(t,e.message||"Exception")}},t.requestObject=r,t.requestUrl=e,r.send()},getVideoURL:function(t){for(var e=0;e<t.length;e++){var i,s=t[e];if(s.uri){if(i=s.type,s=s.uri,this.game.device.canPlayVideo(i))return s}else{if(0===s.indexOf("blob:")||0===s.indexOf("data:"))return s;if(s.indexOf("?")>=0&&(s=s.substr(0,s.indexOf("?"))),i=s.substr((Math.max(0,s.lastIndexOf("."))||1/0)+1).toLowerCase(),this.game.device.canPlayVideo(i))return t[e]}}return null},getAudioURL:function(t){if(this.game.sound.noAudio)return null;for(var e=0;e<t.length;e++){var i,s=t[e];if(s.uri){if(i=s.type,s=s.uri,this.game.device.canPlayAudio(i))return s}else{if(0===s.indexOf("blob:")||0===s.indexOf("data:"))return s;if(s.indexOf("?")>=0&&(s=s.substr(0,s.indexOf("?"))),i=s.substr((Math.max(0,s.lastIndexOf("."))||1/0)+1).toLowerCase(),this.game.device.canPlayAudio(i))return t[e]}}return null},fileError:function(t,e,i){var s="error loading asset from URL "+(t.requestUrl||this.transformUrl(t.url,t));!i&&e&&(i=e.status),i&&(s=s+" ("+i+")"),this.asyncComplete(t,s)},fileComplete:function(t,e){var s=!0;switch(t.type){case"packfile":r=JSON.parse(e.responseText);t.data=r||{};break;case"texture":var n=/\.([^.]+)$/.exec(t.url.split("?",1)[0])[1].toLowerCase();null!==t.data?this.cache.addCompressedTextureMetaData(t.key,t.url,n,t.data):this.cache.addCompressedTextureMetaData(t.key,t.url,n,e.response);break;case"image":this.cache.addImage(t.key,t.url,t.data);break;case"spritesheet":this.cache.addSpriteSheet(t.key,t.url,t.data,t.frameWidth,t.frameHeight,t.frameMax,t.margin,t.spacing,t.skipFrames);break;case"textureatlas":if(null==t.atlasURL)this.cache.addTextureAtlas(t.key,t.url,t.data,t.atlasData,t.format);else if(s=!1,t.format===i.Loader.TEXTURE_ATLAS_JSON_ARRAY||t.format===i.Loader.TEXTURE_ATLAS_JSON_HASH||t.format===i.Loader.TEXTURE_ATLAS_JSON_PYXEL)this.xhrLoad(t,this.transformUrl(t.atlasURL,t),"text",this.jsonLoadComplete);else{if(t.format!==i.Loader.TEXTURE_ATLAS_XML_STARLING)throw new Error("Phaser.Loader. Invalid Texture Atlas format: "+t.format);this.xhrLoad(t,this.transformUrl(t.atlasURL,t),"text",this.xmlLoadComplete)}break;case"bitmapfont":t.atlasURL?(s=!1,this.xhrLoad(t,this.transformUrl(t.atlasURL,t),"text",function(t,e){var i;try{i=JSON.parse(e.responseText)}catch(t){}i?(t.atlasType="json",this.jsonLoadComplete(t,e)):(t.atlasType="xml",this.xmlLoadComplete(t,e))})):this.cache.addBitmapFont(t.key,t.url,t.data,t.atlasData,t.atlasType,t.xSpacing,t.ySpacing);break;case"video":if(t.asBlob)try{t.data=e.response}catch(e){throw new Error("Phaser.Loader. Unable to parse video file as Blob: "+t.key)}this.cache.addVideo(t.key,t.url,t.data,t.asBlob);break;case"audio":this.game.sound.usingWebAudio?(t.data=e.response,this.cache.addSound(t.key,t.url,t.data,!0,!1),t.autoDecode&&this.game.sound.decode(t.key)):this.cache.addSound(t.key,t.url,t.data,!1,!0);break;case"text":t.data=e.responseText,this.cache.addText(t.key,t.url,t.data);break;case"shader":t.data=e.responseText,this.cache.addShader(t.key,t.url,t.data);break;case"physics":var r=JSON.parse(e.responseText);this.cache.addPhysicsData(t.key,t.url,r,t.format);break;case"script":t.data=document.createElement("script"),t.data.language="javascript",t.data.type="text/javascript",t.data.defer=!1,t.data.text=e.responseText,document.head.appendChild(t.data),t.callback&&(t.data=t.callback.call(t.callbackContext,t.key,e.responseText));break;case"binary":t.callback?t.data=t.callback.call(t.callbackContext,t.key,e.response):t.data=e.response,this.cache.addBinary(t.key,t.data)}s&&this.asyncComplete(t)},jsonLoadComplete:function(t,e){var i=JSON.parse(e.responseText);"tilemap"===t.type?this.cache.addTilemap(t.key,t.url,i,t.format):"bitmapfont"===t.type?this.cache.addBitmapFont(t.key,t.url,t.data,i,t.atlasType,t.xSpacing,t.ySpacing):"json"===t.type?this.cache.addJSON(t.key,t.url,i):this.cache.addTextureAtlas(t.key,t.url,t.data,i,t.format),this.asyncComplete(t)},csvLoadComplete:function(t,e){var i=e.responseText;this.cache.addTilemap(t.key,t.url,i,t.format),this.asyncComplete(t)},xmlLoadComplete:function(t,e){var i=e.responseText,s=this.parseXml(i);if(!s){var n=e.responseType||e.contentType;return console.warn("Phaser.Loader - "+t.key+": invalid XML ("+n+")"),void this.asyncComplete(t,"invalid XML")}"bitmapfont"===t.type?this.cache.addBitmapFont(t.key,t.url,t.data,s,t.atlasType,t.xSpacing,t.ySpacing):"textureatlas"===t.type?this.cache.addTextureAtlas(t.key,t.url,t.data,s,t.format):"xml"===t.type&&this.cache.addXML(t.key,t.url,s),this.asyncComplete(t)},parseXml:function(t){var e;try{if(window.DOMParser){var i=new DOMParser;e=i.parseFromString(t,"text/xml")}else(e=new ActiveXObject("Microsoft.XMLDOM")).async="false",e.loadXML(t)}catch(t){e=null}return e&&e.documentElement&&!e.getElementsByTagName("parsererror").length?e:null},updateProgress:function(){this.preloadSprite&&(0===this.preloadSprite.direction?this.preloadSprite.rect.width=Math.floor(this.preloadSprite.width/100*this.progress):this.preloadSprite.rect.height=Math.floor(this.preloadSprite.height/100*this.progress),this.preloadSprite.sprite?this.preloadSprite.sprite.updateCrop():this.preloadSprite=null)},totalLoadedFiles:function(){return this._loadedFileCount},totalQueuedFiles:function(){return this._totalFileCount-this._loadedFileCount},totalLoadedPacks:function(){return this._totalPackCount},totalQueuedPacks:function(){return this._totalPackCount-this._loadedPackCount}},Object.defineProperty(i.Loader.prototype,"progressFloat",{get:function(){var t=this._loadedFileCount/this._totalFileCount*100;return i.Math.clamp(t||0,0,100)}}),Object.defineProperty(i.Loader.prototype,"progress",{get:function(){return Math.round(this.progressFloat)}}),i.Loader.prototype.constructor=i.Loader,i.LoaderParser={bitmapFont:function(t,e,i,s,n,r){return this.xmlBitmapFont(t,e,i,s,n,r)},xmlBitmapFont:function(t,e,i,s,n,r){null==r&&(r=1);var o={},a=t.getElementsByTagName("info")[0],h=t.getElementsByTagName("common")[0];o.font=a.getAttribute("face"),o.size=parseInt(a.getAttribute("size"),10),o.lineHeight=parseInt(h.getAttribute("lineHeight"),10)+s,o.chars={};for(var u=t.getElementsByTagName("char"),l=n?n.x:0,c=n?n.y:0,d=0;d<u.length;d++){var p=parseInt(u[d].getAttribute("id"),10);o.chars[p]={x:l+parseInt(u[d].getAttribute("x"),10),y:c+parseInt(u[d].getAttribute("y"),10),width:parseInt(u[d].getAttribute("width"),10),height:parseInt(u[d].getAttribute("height"),10),xOffset:parseInt(u[d].getAttribute("xoffset"),10)/r,yOffset:parseInt(u[d].getAttribute("yoffset"),10)/r,xAdvance:(parseInt(u[d].getAttribute("xadvance"),10)+i)/r,kerning:{}}}var f=t.getElementsByTagName("kerning");for(d=0;d<f.length;d++){var g=parseInt(f[d].getAttribute("first"),10),m=parseInt(f[d].getAttribute("second"),10),y=parseInt(f[d].getAttribute("amount"),10)/r;o.chars[m].kerning[g]=y}return this.finalizeBitmapFont(e,o)},jsonBitmapFont:function(t,e,i,s,n,r){null==r&&(r=1);var o={font:t.font.info._face,size:parseInt(t.font.info._size,10),lineHeight:parseInt(t.font.common._lineHeight,10)+s,chars:{}},a=n?n.x:0,h=n?n.y:0;return t.font.chars.char.forEach(function(t){var e=parseInt(t._id,10);o.chars[e]={x:a+parseInt(t._x,10),y:h+parseInt(t._y,10),width:parseInt(t._width,10),height:parseInt(t._height,10),xOffset:parseInt(t._xoffset,10)/r,yOffset:parseInt(t._yoffset,10)/r,xAdvance:(parseInt(t._xadvance,10)+i)/r,kerning:{}}}),t.font.kernings&&t.font.kernings.kerning&&t.font.kernings.kerning.forEach(function(t){o.chars[t._second].kerning[t._first]=parseInt(t._amount,10)/r}),this.finalizeBitmapFont(e,o)},finalizeBitmapFont:function(t,e){return Object.keys(e.chars).forEach(function(s){var n=e.chars[s];n.texture=new PIXI.Texture(t,new i.Rectangle(n.x,n.y,n.width,n.height))}),e},pvr:function(t){var e,i=new Uint32Array(t.slice(0,52)),s=new Uint8Array(t),n=null,r=i[3]<<32|i[2],o=0;if(55727696===i[0]&&[0,1,2,3,6,7,9,11].indexOf(r)>=0){switch(r>=0&&r<=3?e="PVRTC":r>=7&&r<=11?e="S3TC":6===r&&(e="ETC1"),r){case 0:o=35841;break;case 1:o=35843;break;case 2:o=35840;break;case 3:o=35842;break;case 6:o=36196;break;case 7:o=33777;break;case 9:o=33778;break;case 11:o=33779;break;default:o=-1}n={complete:!0,fileFormat:"PVR",compressionAlgorithm:e,flags:i[1],pixelFormat:r,colorSpace:i[4],channelType:i[5],height:i[6],width:i[7],depth:i[8],numberOfSurfaces:i[9],numberOfFaces:i[10],numberOfMipmaps:i[11],metaDataSize:i[12],textureData:s.subarray(52+i[12],s.byteLength),glExtensionFormat:o}}return n},dds:function(t){var e=new Uint8Array(t),i=new Uint32Array(t),s=null;return 68===e[0]&&68===e[1]&&83===e[2]&&32===e[3]&&"DX10"===(s={complete:!0,fileFormat:"DDS",compressionAlgorithm:"S3TC",size:i[1],flags:i[2],height:i[3],width:i[4],pitch:i[5],depth:i[6],mipmapCount:i[7],formatSize:i[19],formatFlag:i[19],formatFourCC:[String.fromCharCode(e[84]),String.fromCharCode(e[85]),String.fromCharCode(e[86]),String.fromCharCode(e[87])].join(""),formatBitCount:i[21],formatRBitMask:i[22],formatGBitMask:i[23],formatBBitMask:i[24],formatABitMask:i[25],caps1:i[26],caps2:i[27],caps3:i[28],caps4:i[29],reserved2:i[30],DXGIFormat:null,resourceDimension:null,miscFlag:null,arraySize:null,textureData:e.subarray(i[1]+4,e.byteLength)}).formatFourCC&&(s.DXGIFormat=i[31],s.resourceDimension=i[32],s.miscFlag=i[33],s.arraySize=i[34],s.miscFlag=i[35]),s},ktx:function(t){var e=new Uint8Array(t),i=new Uint32Array(t),s=null,n=16+i[15]/4|0,r=i[n],o=i[7],a=0;if(171===e[0]&&75===e[1]&&84===e[2]&&88===e[3]&&32===e[4]&&49===e[5]&&49===e[6]&&187===e[7]&&13===e[8]&&10===e[9]&&26===e[10]&&10===e[11]&&[36196,35840,35841,35842,35843,33776,33777,33778,33779].indexOf(o)>=0){switch(o){case 36196:a="ETC1";break;case 35840:case 35841:case 35842:case 35843:a="PVRTC";break;case 33776:case 33777:case 33778:case 33779:a="S3TC"}s={complete:!0,fileFormat:"KTX",compressionAlgorithm:a,endianness:i[3],glType:i[4],glTypeSize:i[5],glFormat:i[6],glInternalFormat:i[7],glBaseInternalFormat:i[8],width:i[9],height:i[10],pixelDepth:i[11],numberOfArrayElements:i[12],numberOfFaces:i[13],numberOfMipmapLevels:i[14],bytesOfKeyValueData:i[15],keyAndValueByteSize:i[16],imageSize:r,textureData:e.subarray(4*(n+1),r+100)}}return s},pkm:function(t){var e=new Uint8Array(t),i=null;return 80===e[0]&&75===e[1]&&77===e[2]&&32===e[3]&&(i={complete:!0,fileFormat:"PKM",compressionAlgorithm:"ETC1",format:65535&(e[6]<<8|e[7]),width:65535&(e[8]<<8|e[9]),height:65535&(e[10]<<8|e[11]),originalWidth:65535&(e[12]<<8|e[13]),originalHeight:65535&(e[14]<<8|e[15]),textureData:e.subarray(16,e.length)}),i}},i.AudioSprite=function(t,e){this.game=t,this.key=e,this.config=this.game.cache.getJSON(e+"-audioatlas"),this.autoplayKey=null,this.autoplay=!1,this.sounds={};for(var i in this.config.spritemap){var s=this.config.spritemap[i],n=this.game.add.sound(this.key);n.addMarker(i,s.start,s.end-s.start,null,s.loop),this.sounds[i]=n}this.config.autoplay&&(this.autoplayKey=this.config.autoplay,this.play(this.autoplayKey),this.autoplay=this.sounds[this.autoplayKey])},i.AudioSprite.prototype={play:function(t,e){return void 0===e&&(e=1),this.sounds[t].play(t,null,e)},stop:function(t){if(t)this.sounds[t].stop();else for(var e in this.sounds)this.sounds[e].stop()},get:function(t){return this.sounds[t]}},i.AudioSprite.prototype.constructor=i.AudioSprite,i.Sound=function(t,e,s,n,r){void 0===s&&(s=1),void 0===n&&(n=!1),void 0===r&&(r=t.sound.connectToMaster),this.game=t,this.name=e,this.key=e,this.loop=n,this.markers={},this.context=null,this.autoplay=!1,this.totalDuration=0,this.startTime=0,this.currentTime=0,this.duration=0,this.durationMS=0,this.position=0,this.stopTime=0,this.paused=!1,this.pausedPosition=0,this.pausedTime=0,this.isPlaying=!1,this.currentMarker="",this.fadeTween=null,this.pendingPlayback=!1,this.override=!1,this.allowMultiple=!1,this.playOnce=!1,this.usingWebAudio=this.game.sound.usingWebAudio,this.usingAudioTag=this.game.sound.usingAudioTag,this.externalNode=null,this.masterGainNode=null,this.gainNode=null,this._sound=null,this._globalVolume=1,this._markedToDelete=!1,this._removeFromSoundManager=!1,this.usingWebAudio?(this.context=this.game.sound.context,this.masterGainNode=this.game.sound.masterGain,void 0===this.context.createGain?this.gainNode=this.context.createGainNode():this.gainNode=this.context.createGain(),this.gainNode.gain.value=s,r&&this.gainNode.connect(this.masterGainNode)):this.usingAudioTag&&(this.game.cache.getSound(e)&&this.game.cache.isSoundReady(e)?(this._sound=this.game.cache.getSoundData(e),this.totalDuration=0,this._sound.duration&&(this.totalDuration=this._sound.duration)):this.game.cache.onSoundUnlock.add(this.soundHasUnlocked,this)),this.onDecoded=new i.Signal,this.onPlay=new i.Signal,this.onPause=new i.Signal,this.onResume=new i.Signal,this.onLoop=new i.Signal,this.onStop=new i.Signal,this.onMute=new i.Signal,this.onMarkerComplete=new i.Signal,this.onFadeComplete=new i.Signal,this._volume=s,this._buffer=null,this._muted=!1,this._tempMarker=0,this._tempPosition=0,this._tempVolume=0,this._tempPause=0,this._muteVolume=0,this._tempLoop=0,this._paused=!1,this._onDecodedEventDispatched=!1},i.Sound.prototype={soundHasUnlocked:function(t){t===this.key&&(this._sound=this.game.cache.getSoundData(this.key),this.totalDuration=this._sound.duration)},addMarker:function(t,e,i,s,n){void 0!==i&&null!==i||(i=1),void 0!==s&&null!==s||(s=1),void 0===n&&(n=!1),this.markers[t]={name:t,start:e,stop:e+i,volume:s,duration:i,durationMS:1e3*i,loop:n}},removeMarker:function(t){delete this.markers[t]},onEndedHandler:function(){this._sound.onended=null,this.isPlaying=!1,this.currentTime=this.durationMS,this.stop(),this.playOnce&&(this._markedToDelete=!0,this._removeFromSoundManager=!0),this._markedToDelete&&(this.externalNode?this._sound.disconnect(this.externalNode):this.gainNode&&this._sound.disconnect(this.gainNode),this._removeFromSoundManager?this.game.sound.remove(this):(this.markers={},this.context=null,this._buffer=null,this.externalNode=null,this.onDecoded.dispose(),this.onPlay.dispose(),this.onPause.dispose(),this.onResume.dispose(),this.onLoop.dispose(),this.onStop.dispose(),this.onMute.dispose(),this.onMarkerComplete.dispose()))},update:function(){this.game.cache.checkSoundKey(this.key)?(this.isDecoded&&!this._onDecodedEventDispatched&&(this.onDecoded.dispatch(this),this._onDecodedEventDispatched=!0),this.pendingPlayback&&this.game.cache.isSoundReady(this.key)&&(this.pendingPlayback=!1,this.play(this._tempMarker,this._tempPosition,this._tempVolume,this._tempLoop)),this.isPlaying&&(this.currentTime=this.game.time.time-this.startTime,this.currentTime>=this.durationMS&&(this.usingWebAudio?this.loop?(this.onLoop.dispatch(this),this.isPlaying=!1,""===this.currentMarker?(this.currentTime=0,this.startTime=this.game.time.time,this.isPlaying=!0):(this.onMarkerComplete.dispatch(this.currentMarker,this),this.play(this.currentMarker,0,this.volume,!0,!0))):""!==this.currentMarker&&this.stop():this.loop?(this.onLoop.dispatch(this),""===this.currentMarker&&(this.currentTime=0,this.startTime=this.game.time.time),this.isPlaying=!1,this.play(this.currentMarker,0,this.volume,!0,!0)):this.stop()))):this.destroy()},loopFull:function(t){return this.play(null,0,t,!0)},play:function(t,e,i,s,n){if(void 0!==t&&!1!==t&&null!==t||(t=""),void 0===n&&(n=!0),this.isPlaying&&!this.allowMultiple&&!n&&!this.override)return this;if(this._sound&&this.isPlaying&&!this.allowMultiple&&(this.override||n)){if(this.usingWebAudio){if(void 0===this._sound.stop)this._sound.noteOff(0);else try{this._sound.stop(0)}catch(t){}this.externalNode?this._sound.disconnect(this.externalNode):this.gainNode&&this._sound.disconnect(this.gainNode)}else this.usingAudioTag&&(this._sound.pause(),this._sound.currentTime=0);this.isPlaying=!1}if(""===t&&Object.keys(this.markers).length>0)return this;if(""!==t){if(!this.markers[t])return console.warn("Phaser.Sound.play: audio marker "+t+" doesn't exist"),this;this.currentMarker=t,this.position=this.markers[t].start,this.volume=this.markers[t].volume,this.loop=this.markers[t].loop,this.duration=this.markers[t].duration,this.durationMS=this.markers[t].durationMS,void 0!==i&&(this.volume=i),void 0!==s&&(this.loop=s),this._tempMarker=t,this._tempPosition=this.position,this._tempVolume=this.volume,this._tempLoop=this.loop}else e=e||0,void 0===i&&(i=this._volume),void 0===s&&(s=this.loop),this.position=Math.max(0,e),this.volume=i,this.loop=s,this.duration=0,this.durationMS=0,this._tempMarker=t,this._tempPosition=e,this._tempVolume=i,this._tempLoop=s;return this.usingWebAudio?this.game.cache.isSoundDecoded(this.key)?(this._sound=this.context.createBufferSource(),this.externalNode?this._sound.connect(this.externalNode):this._sound.connect(this.gainNode),this._buffer=this.game.cache.getSoundData(this.key),this._sound.buffer=this._buffer,this.loop&&""===t&&(this._sound.loop=!0),this.loop||""!==t||(this._sound.onended=this.onEndedHandler.bind(this)),this.totalDuration=this._sound.buffer.duration,0===this.duration&&(this.duration=this.totalDuration,this.durationMS=Math.ceil(1e3*this.totalDuration)),void 0===this._sound.start?this._sound.noteGrainOn(0,this.position,this.duration):this.loop&&""===t?this._sound.start(0,0):this._sound.start(0,this.position,this.duration),this.isPlaying=!0,this.startTime=this.game.time.time,this.currentTime=0,this.stopTime=this.startTime+this.durationMS,this.onPlay.dispatch(this)):(this.pendingPlayback=!0,this.game.cache.getSound(this.key)&&!1===this.game.cache.getSound(this.key).isDecoding&&this.game.sound.decode(this.key,this)):this.game.cache.getSound(this.key)&&this.game.cache.getSound(this.key).locked?(this.game.cache.reloadSound(this.key),this.pendingPlayback=!0):this._sound&&(this.game.device.cocoonJS||4===this._sound.readyState)?(this._sound.play(),this._sound.loop=this.loop,this.totalDuration=this._sound.duration,0===this.duration&&(this.duration=this.totalDuration,this.durationMS=1e3*this.totalDuration),this._sound.currentTime=this.position,this._sound.muted=this._muted,this._muted||this.game.sound.mute?this._sound.volume=0:this._sound.volume=this._volume,this.isPlaying=!0,this.startTime=this.game.time.time,this.currentTime=0,this.stopTime=this.startTime+this.durationMS,this.onPlay.dispatch(this)):this.pendingPlayback=!0,this.playOnce&&(this.loop&&console.warn("Phaser.Sound.play: audio clip "+this.name+" cannot be deleted while looping."),this._markedToDelete=!0,this._removeFromSoundManager=!0),this},restart:function(t,e,i,s){t=t||"",e=e||0,i=i||1,void 0===s&&(s=!1),this.play(t,e,i,s,!0)},pause:function(){this.isPlaying&&this._sound&&(this.paused=!0,this.pausedPosition=this.currentTime,this.pausedTime=this.game.time.time,this._tempPause=this._sound.currentTime,this.onPause.dispatch(this),this.stop())},resume:function(){if(this.paused&&this._sound){if(this.usingWebAudio){var t=Math.max(0,this.position+this.pausedPosition/1e3);this._sound=this.context.createBufferSource(),this._sound.buffer=this._buffer,this.externalNode?this._sound.connect(this.externalNode):this._sound.connect(this.gainNode),""===this.currentMarker&&(this.loop?this._sound.loop=!0:this._sound.onended=this.onEndedHandler.bind(this));var e=this.duration-this.pausedPosition/1e3;void 0===this._sound.start?this._sound.noteGrainOn(0,t,e):this.loop&&this.game.device.chrome?42===this.game.device.chromeVersion?this._sound.start(0):""===this.currentMarker?this._sound.start(0,t):this._sound.start(0,t,e):this._sound.start(0,t,e)}else this._sound.currentTime=this._tempPause,this._sound.play();this.isPlaying=!0,this.paused=!1,this.startTime+=this.game.time.time-this.pausedTime,this.onResume.dispatch(this)}},stop:function(){if(this.isPlaying&&this._sound)if(this.usingWebAudio){if(void 0===this._sound.stop)this._sound.noteOff(0);else try{this._sound.stop(0)}catch(t){}this.externalNode?this._sound.disconnect(this.externalNode):this.gainNode&&this._sound.disconnect(this.gainNode)}else this.usingAudioTag&&(this._sound.pause(),this._sound.currentTime=0);if(this.pendingPlayback=!1,this.isPlaying=!1,!this.paused){var t=this.currentMarker;""!==this.currentMarker&&this.onMarkerComplete.dispatch(this.currentMarker,this),this.currentMarker="",null!==this.fadeTween&&this.fadeTween.stop(),this.onStop.dispatch(this,t)}},fadeIn:function(t,e,i){void 0===e&&(e=!1),void 0===i&&(i=this.currentMarker),this.paused||(this.play(i,0,0,e),this.fadeTo(t,1))},fadeOut:function(t){this.fadeTo(t,0)},fadeTo:function(t,e){this.isPlaying&&!this.paused&&e!==this.volume&&(void 0===t&&(t=1e3),void 0!==e?(this.fadeTween=this.game.add.tween(this).to({volume:e},t,i.Easing.Linear.None,!0),this.fadeTween.onComplete.add(this.fadeComplete,this)):console.warn("Phaser.Sound.fadeTo: No Volume Specified."))},fadeComplete:function(){this.onFadeComplete.dispatch(this,this.volume),0===this.volume&&this.stop()},updateGlobalVolume:function(t){this.usingAudioTag&&this._sound&&(this._globalVolume=t,this._sound.volume=this._globalVolume*this._volume)},destroy:function(t){void 0===t&&(t=!0),this._markedToDelete=!0,this._removeFromSoundManager=t,this.stop(),t?this.game.sound.remove(this):(this.markers={},this.context=null,this._buffer=null,this.externalNode=null,this.onDecoded.dispose(),this.onPlay.dispose(),this.onPause.dispose(),this.onResume.dispose(),this.onLoop.dispose(),this.onStop.dispose(),this.onMute.dispose(),this.onMarkerComplete.dispose())}},i.Sound.prototype.constructor=i.Sound,Object.defineProperty(i.Sound.prototype,"isDecoding",{get:function(){return this.game.cache.getSound(this.key).isDecoding}}),Object.defineProperty(i.Sound.prototype,"isDecoded",{get:function(){return this.game.cache.isSoundDecoded(this.key)}}),Object.defineProperty(i.Sound.prototype,"mute",{get:function(){return this._muted||this.game.sound.mute},set:function(t){(t=t||!1)!==this._muted&&(t?(this._muted=!0,this._muteVolume=this._tempVolume,this.usingWebAudio?this.gainNode.gain.value=0:this.usingAudioTag&&this._sound&&(this._sound.volume=0)):(this._muted=!1,this.usingWebAudio?this.gainNode.gain.value=this._muteVolume:this.usingAudioTag&&this._sound&&(this._sound.volume=this._muteVolume)),this.onMute.dispatch(this))}}),Object.defineProperty(i.Sound.prototype,"volume",{get:function(){return this._volume},set:function(t){this.usingAudioTag&&(t=this.game.math.clamp(t,0,1)),this._muted?this._muteVolume=t:(this._tempVolume=t,this._volume=t,this.usingWebAudio?this.gainNode.gain.value=t:this.usingAudioTag&&this._sound&&(this._sound.volume=this._globalVolume*t))}}),i.SoundManager=function(t){this.game=t,this.onSoundDecode=new i.Signal,this.onVolumeChange=new i.Signal,this.onMute=new i.Signal,this.onUnMute=new i.Signal,this.onTouchUnlock=new i.Signal,this.context=null,this.usingWebAudio=!1,this.usingAudioTag=!1,this.noAudio=!1,this.connectToMaster=!0,this.touchLocked=!1,this.channels=32,this.muteOnPause=!0,this._codeMuted=!1,this._muted=!1,this._unlockSource=null,this._volume=1,this._sounds=[],this._watchList=new i.ArraySet,this._watching=!1,this._watchCallback=null,this._watchContext=null},i.SoundManager.prototype={boot:function(){var t=this.game.device,e=window.PhaserGlobal;if(t.iOS&&!1===t.webAudio&&(this.channels=1),e){if(!0===e.disableAudio)return this.noAudio=!0,void(this.touchLocked=!1);if(!0===e.disableWebAudio)return this.usingAudioTag=!0,void(this.touchLocked=!1)}if(e&&e.audioContext)this.context=e.audioContext;else if(window.AudioContext)try{this.context=new window.AudioContext}catch(t){this.context=null,this.usingWebAudio=!1,this.touchLocked=!1}else if(window.webkitAudioContext)try{this.context=new window.webkitAudioContext}catch(t){this.context=null,this.usingWebAudio=!1,this.touchLocked=!1}if(null===this.context){if(void 0===window.Audio)return void(this.noAudio=!0);this.usingAudioTag=!0}else this.usingWebAudio=!0,void 0===this.context.createGain?this.masterGain=this.context.createGainNode():this.masterGain=this.context.createGain(),this.masterGain.gain.value=1,this.masterGain.connect(this.context.destination);this.noAudio||t.needsTouchUnlock()&&this.setTouchLock(),this.usingWebAudio&&t.chrome&&t.chromeVersion<=65&&console.log('A "GainNode.gain.value setter smoothing is deprecated" notice in Chrome is normal. <https://github.com/photonstorm/phaser-ce/issues/385>')},setTouchLock:function(){this.noAudio||window.PhaserGlobal&&!0===window.PhaserGlobal.disableAudio||(this.game.input.addTouchLockCallback(this.unlock,this,!0),this.touchLocked=!0)},setTouchUnlock:function(){this.touchLocked=!1,this._unlockSource=null,this.onTouchUnlock.dispatch()},unlock:function(){if(this.noAudio||!this.touchLocked||null!==this._unlockSource)return!0;if(this.usingAudioTag)this.setTouchUnlock();else if(this.usingWebAudio){var t=this.context.createBuffer(1,1,22050);this._unlockSource=this.context.createBufferSource(),this._unlockSource.buffer=t,this._unlockSource.connect(this.context.destination),void 0===this._unlockSource.start?this._unlockSource.noteOn(0):this._unlockSource.start(0),"suspended"===this._unlockSource.context.state&&this._unlockSource.context.resume()}return!0},stopAll:function(){if(!this.noAudio)for(var t=0;t<this._sounds.length;t++)this._sounds[t]&&this._sounds[t].stop()},pauseAll:function(){if(!this.noAudio)for(var t=0;t<this._sounds.length;t++)this._sounds[t]&&this._sounds[t].pause()},resumeAll:function(){if(!this.noAudio)for(var t=0;t<this._sounds.length;t++)this._sounds[t]&&this._sounds[t].resume()},decode:function(t,e){e=e||null;var i=this.game.cache.getSoundData(t);if(i&&!1===this.game.cache.isSoundDecoded(t)){this.game.cache.updateSound(t,"isDecoding",!0);var s=this;try{this.context.decodeAudioData(i,function(i){i&&(s.game.cache.decodedSound(t,i),s.onSoundDecode.dispatch(t,e))})}catch(t){}}},setDecodedCallback:function(t,e,s){"string"==typeof t&&(t=[t]),this._watchList.reset();for(var n=0;n<t.length;n++)t[n]instanceof i.Sound?this.game.cache.isSoundDecoded(t[n].key)||this._watchList.add(t[n].key):this.game.cache.isSoundDecoded(t[n])||this._watchList.add(t[n]);0===this._watchList.total?(this._watching=!1,e.call(s)):(this._watching=!0,this._watchCallback=e,this._watchContext=s)},update:function(){if(!this.noAudio){!this.touchLocked||null===this._unlockSource||this._unlockSource.playbackState!==this._unlockSource.PLAYING_STATE&&this._unlockSource.playbackState!==this._unlockSource.FINISHED_STATE||this.setTouchUnlock();for(var t=0;t<this._sounds.length;t++)this._sounds[t].update();if(this._watching){for(var e=this._watchList.first;e;)this.game.cache.isSoundDecoded(e)&&this._watchList.remove(e),e=this._watchList.next;0===this._watchList.total&&(this._watching=!1,this._watchCallback.call(this._watchContext))}}},add:function(t,e,s,n){void 0===e&&(e=1),void 0===s&&(s=!1),void 0===n&&(n=this.connectToMaster);var r=new i.Sound(this.game,t,e,s,n);return this._sounds.push(r),r},addSprite:function(t){return new i.AudioSprite(this.game,t)},remove:function(t){for(var e=this._sounds.length;e--;)if(this._sounds[e]===t)return this._sounds[e].destroy(!1),this._sounds.splice(e,1),!0;return!1},removeAll:function(){this.stopAll();for(var t=0;t<this._sounds.length;t++)this._sounds[t]&&this._sounds[t].destroy();this._sounds.length=0},removeByKey:function(t){for(var e=this._sounds.length,i=0;e--;)this._sounds[e].key===t&&(this._sounds[e].destroy(!1),this._sounds.splice(e,1),i++);return i},play:function(t,e,i){if(!this.noAudio){var s=this.add(t,e,i);return s.play(),s}},setMute:function(){if(!this._muted){this._muted=!0,this.usingWebAudio&&(this._muteVolume=this.masterGain.gain.value,this.masterGain.gain.value=0);for(var t=0;t<this._sounds.length;t++)this._sounds[t].usingAudioTag&&(this._sounds[t].mute=!0);this.onMute.dispatch()}},unsetMute:function(){if(this._muted&&!this._codeMuted){this._muted=!1,this.usingWebAudio&&(this.masterGain.gain.value=this._muteVolume);for(var t=0;t<this._sounds.length;t++)this._sounds[t].usingAudioTag&&(this._sounds[t].mute=!1);this.onUnMute.dispatch()}},destroy:function(){this.removeAll(),this.onSoundDecode.dispose(),this.context&&(window.PhaserGlobal?window.PhaserGlobal.audioContext=this.context:this.context.close&&this.context.close())}},i.SoundManager.prototype.constructor=i.SoundManager,Object.defineProperty(i.SoundManager.prototype,"mute",{get:function(){return this._muted},set:function(t){if(t=t||!1){if(this._muted)return;this._codeMuted=!0,this.setMute()}else{if(!this._muted)return;this._codeMuted=!1,this.unsetMute()}}}),Object.defineProperty(i.SoundManager.prototype,"volume",{get:function(){return this._volume},set:function(t){if(t<0?t=0:t>1&&(t=1),this._volume!==t){if(this._volume=t,this.usingWebAudio)this.masterGain.gain.value=t;else for(var e=0;e<this._sounds.length;e++)this._sounds[e].usingAudioTag&&this._sounds[e].updateGlobalVolume(t);this.onVolumeChange.dispatch(t)}}}),i.ScaleManager=function(t,e,s){this.game=t,this.dom=i.DOM,this.grid=null,this.width=0,this.height=0,this.minWidth=null,this.maxWidth=null,this.minHeight=null,this.maxHeight=null,this.offset=new i.Point,this.forceLandscape=!1,this.forcePortrait=!1,this.incorrectOrientation=!1,this._pageAlignHorizontally=!1,this._pageAlignVertically=!1,this.onOrientationChange=new i.Signal,this.enterIncorrectOrientation=new i.Signal,this.leaveIncorrectOrientation=new i.Signal,this.hasPhaserSetFullScreen=!1,this.fullScreenTarget=null,this._createdFullScreenTarget=null,this.onFullScreenInit=new i.Signal,this.onFullScreenChange=new i.Signal,this.onFullScreenError=new i.Signal,this.screenOrientation=this.dom.getScreenOrientation(),this.scaleFactor=new i.Point(1,1),this.scaleFactorInversed=new i.Point(1,1),this.margin={left:0,top:0,right:0,bottom:0,x:0,y:0},this.bounds=new i.Rectangle,this.aspectRatio=0,this.sourceAspectRatio=0,this.event=null,this.windowConstraints={right:"layout",bottom:""},this.compatibility={supportsFullScreen:!1,orientationFallback:null,noMargins:!1,scrollTo:null,forceMinimumDocumentHeight:!1,canExpandParent:!0,clickTrampoline:""},this._scaleMode=i.ScaleManager.NO_SCALE,this._fullScreenScaleMode=i.ScaleManager.NO_SCALE,this.parentIsWindow=!1,this.parentNode=null,this.parentScaleFactor=new i.Point(1,1),this.trackParentInterval=2e3,this.onSizeChange=new i.Signal,this.onResize=null,this.onResizeContext=null,this._pendingScaleMode=null,this._fullScreenRestore=null,this._gameSize=new i.Rectangle,this._userScaleFactor=new i.Point(1,1),this._userScaleTrim=new i.Point(0,0),this._lastUpdate=0,this._updateThrottle=0,this._updateThrottleReset=100,this._parentBounds=new i.Rectangle,this._tempBounds=new i.Rectangle,this._lastReportedCanvasSize=new i.Rectangle,this._lastReportedGameSize=new i.Rectangle,this._booted=!1,t.config&&this.parseConfig(t.config),this.setupScale(e,s)},i.ScaleManager.EXACT_FIT=0,i.ScaleManager.NO_SCALE=1,i.ScaleManager.SHOW_ALL=2,i.ScaleManager.RESIZE=3,i.ScaleManager.USER_SCALE=4,i.ScaleManager.MODES=["EXACT_FIT","NO_SCALE","SHOW_ALL","RESIZE","USER_SCALE"],i.ScaleManager.prototype={boot:function(){var t=this.compatibility;t.supportsFullScreen=this.game.device.fullscreen&&!this.game.device.cocoonJS,this.game.device.iPad||this.game.device.webApp||this.game.device.desktop||(this.game.device.android&&!this.game.device.chrome?t.scrollTo=new i.Point(0,1):t.scrollTo=new i.Point(0,0)),this.game.device.desktop?(t.orientationFallback="screen",t.clickTrampoline="when-not-mouse"):(t.orientationFallback="",t.clickTrampoline="");var e=this;this._orientationChange=function(t){return e.orientationChange(t)},this._windowResize=function(t){return e.windowResize(t)},window.addEventListener("orientationchange",this._orientationChange,!1),window.addEventListener("resize",this._windowResize,!1),this.compatibility.supportsFullScreen&&(this._fullScreenChange=function(t){return e.fullScreenChange(t)},this._fullScreenError=function(t){return e.fullScreenError(t)},document.addEventListener("webkitfullscreenchange",this._fullScreenChange,!1),document.addEventListener("mozfullscreenchange",this._fullScreenChange,!1),document.addEventListener("MSFullscreenChange",this._fullScreenChange,!1),document.addEventListener("fullscreenchange",this._fullScreenChange,!1),document.addEventListener("webkitfullscreenerror",this._fullScreenError,!1),document.addEventListener("mozfullscreenerror",this._fullScreenError,!1),document.addEventListener("MSFullscreenError",this._fullScreenError,!1),document.addEventListener("fullscreenerror",this._fullScreenError,!1)),this.game.onResume.add(this._gameResumed,this),this.dom.getOffset(this.game.canvas,this.offset),this.bounds.setTo(this.offset.x,this.offset.y,this.width,this.height),this.setGameSize(this.game.width,this.game.height),this.screenOrientation=this.dom.getScreenOrientation(this.compatibility.orientationFallback),i.FlexGrid&&(this.grid=new i.FlexGrid(this,this.width,this.height)),this._booted=!0,null!==this._pendingScaleMode&&(this.scaleMode=this._pendingScaleMode,this._pendingScaleMode=null)},parseConfig:function(t){void 0!==t.scaleMode&&(this._booted?this.scaleMode=t.scaleMode:this._pendingScaleMode=t.scaleMode),void 0!==t.fullScreenScaleMode&&(this.fullScreenScaleMode=t.fullScreenScaleMode),t.fullScreenTarget&&(this.fullScreenTarget=t.fullScreenTarget),this.pageAlignHorizontally=t.alignH||!1,this.pageAlignVertically=t.alignV||!1,t.scaleH&&t.scaleV&&this.setUserScale(t.scaleH,t.scaleV,t.trimH,t.trimV)},setupScale:function(t,e){var s,n=new i.Rectangle;""!==this.game.parent&&("string"==typeof this.game.parent?s=document.getElementById(this.game.parent):this.game.parent&&1===this.game.parent.nodeType&&(s=this.game.parent)),s?(this.parentNode=s,this.parentIsWindow=!1,this.getParentBounds(this._parentBounds,this.parentNode),n.width=this._parentBounds.width,n.height=this._parentBounds.height,this.offset.set(this._parentBounds.x,this._parentBounds.y)):(this.parentNode=null,this.parentIsWindow=!0,n.width=this.dom.visualBounds.width,n.height=this.dom.visualBounds.height,this.offset.set(0,0));var r=0,o=0;"number"==typeof t?r=t:(this.parentScaleFactor.x=parseInt(t,10)/100,r=n.width*this.parentScaleFactor.x),"number"==typeof e?o=e:(this.parentScaleFactor.y=parseInt(e,10)/100,o=n.height*this.parentScaleFactor.y),r=Math.floor(r),o=Math.floor(o),this._gameSize.setTo(0,0,r,o),this.updateDimensions(r,o,!1)},_gameResumed:function(){this.queueUpdate(!0)},setGameSize:function(t,e){this._gameSize.setTo(0,0,t,e),this.currentScaleMode!==i.ScaleManager.RESIZE&&this.updateDimensions(t,e,!0),this.queueUpdate(!0)},setUserScale:function(t,e,i,s,n,r){this._userScaleFactor.setTo(t,e),this._userScaleTrim.setTo(0|i,0|s),void 0===n&&(n=!0),void 0===r&&(r=!0),n&&this.queueUpdate(r)},setResizeCallback:function(t,e){this.onResize=t,this.onResizeContext=e},signalSizeChange:function(){if(!i.Rectangle.sameDimensions(this,this._lastReportedCanvasSize)||!i.Rectangle.sameDimensions(this.game,this._lastReportedGameSize)){var t=this.width,e=this.height;this._lastReportedCanvasSize.setTo(0,0,t,e),this._lastReportedGameSize.setTo(0,0,this.game.width,this.game.height),this.grid&&this.grid.onResize(t,e),this.onSizeChange.dispatch(this,t,e),this.currentScaleMode===i.ScaleManager.RESIZE&&(this.game.state.resize(t,e),this.game.load.resize(t,e))}},setMinMax:function(t,e,i,s){this.minWidth=t,this.minHeight=e,void 0!==i&&(this.maxWidth=i),void 0!==s&&(this.maxHeight=s)},preUpdate:function(){if(!(this.game.time.time<this._lastUpdate+this._updateThrottle)){var t=this._updateThrottle;this._updateThrottleReset=t>=400?0:100,this.dom.getOffset(this.game.canvas,this.offset);var e=this._parentBounds.width,s=this._parentBounds.height,n=this.getParentBounds(this._parentBounds),r=n.width!==e||n.height!==s,o=this.updateOrientationState();(r||o)&&(this.onResize&&this.onResize.call(this.onResizeContext,this,n),this.updateLayout(),this.signalSizeChange());var a=2*this._updateThrottle;this._updateThrottle<t&&(a=Math.min(t,this._updateThrottleReset)),this._updateThrottle=i.Math.clamp(a,25,this.trackParentInterval),this._lastUpdate=this.game.time.time}},pauseUpdate:function(){this.preUpdate(),this._updateThrottle=this.trackParentInterval},updateDimensions:function(t,e,i){this.width=t*this.parentScaleFactor.x,this.height=e*this.parentScaleFactor.y,this.game.width=this.width,this.game.height=this.height,this.sourceAspectRatio=this.width/this.height,this.updateScalingAndBounds(),i&&(this.game.renderer.resize(this.width,this.height),this.game.camera.setSize(this.width,this.height),this.game.world.resize(this.width,this.height))},updateScalingAndBounds:function(){this.scaleFactor.x=this.game.width/this.width,this.scaleFactor.y=this.game.height/this.height,this.scaleFactorInversed.x=this.width/this.game.width,this.scaleFactorInversed.y=this.height/this.game.height,this.aspectRatio=this.width/this.height,this.game.canvas&&this.dom.getOffset(this.game.canvas,this.offset),this.bounds.setTo(this.offset.x,this.offset.y,this.width,this.height),this.game.input&&this.game.input.scale&&this.game.input.scale.setTo(this.scaleFactor.x,this.scaleFactor.y)},forceOrientation:function(t,e){void 0===e&&(e=!1),!0!==t||!0!==e?(this.forceLandscape=t,this.forcePortrait=e,this.queueUpdate(!0)):console.warn("Phaser.ScaleManager: forceLandscape and forcePortrait cannot both be true.")},classifyOrientation:function(t){return"portrait-primary"===t||"portrait-secondary"===t?"portrait":"landscape-primary"===t||"landscape-secondary"===t?"landscape":null},updateOrientationState:function(){var t=this.screenOrientation,e=this.incorrectOrientation;this.screenOrientation=this.dom.getScreenOrientation(this.compatibility.orientationFallback),this.incorrectOrientation=this.forceLandscape&&!this.isLandscape||this.forcePortrait&&!this.isPortrait;var i=t!==this.screenOrientation,s=e!==this.incorrectOrientation;return s&&(this.incorrectOrientation?this.enterIncorrectOrientation.dispatch():this.leaveIncorrectOrientation.dispatch()),(i||s)&&this.onOrientationChange.dispatch(this,t,e),i||s},orientationChange:function(t){this.event=t,this.queueUpdate(!0)},windowResize:function(t){this.event=t,this.queueUpdate(!0)},scrollTop:function(){var t=this.compatibility.scrollTo;t&&window.scrollTo(t.x,t.y)},refresh:function(){this.scrollTop(),this.queueUpdate(!0)},updateLayout:function(){var t=this.currentScaleMode;if(t!==i.ScaleManager.RESIZE){if(this.scrollTop(),this.compatibility.forceMinimumDocumentHeight&&(document.documentElement.style.minHeight=window.innerHeight+"px"),this.incorrectOrientation?this.setMaximum():t===i.ScaleManager.EXACT_FIT?this.setExactFit():t===i.ScaleManager.SHOW_ALL?!this.isFullScreen&&this.boundingParent&&this.compatibility.canExpandParent?(this.setShowAll(!0),this.resetCanvas(),this.setShowAll()):this.setShowAll():t===i.ScaleManager.NO_SCALE?(this.width=this.game.width,this.height=this.game.height):t===i.ScaleManager.USER_SCALE&&(this.width=this.game.width*this._userScaleFactor.x-this._userScaleTrim.x,this.height=this.game.height*this._userScaleFactor.y-this._userScaleTrim.y),!this.compatibility.canExpandParent&&(t===i.ScaleManager.SHOW_ALL||t===i.ScaleManager.USER_SCALE)){var e=this.getParentBounds(this._tempBounds);this.width=Math.min(this.width,e.width),this.height=Math.min(this.height,e.height)}this.width=0|this.width,this.height=0|this.height,this.reflowCanvas()}else this.reflowGame()},getParentBounds:function(t,e){var s=t||new i.Rectangle,n=e||this.boundingParent,r=this.dom.visualBounds,o=this.dom.layoutBounds;if(n){var a=n.getBoundingClientRect(),h=n.offsetParent?n.offsetParent.getBoundingClientRect():n.getBoundingClientRect();s.setTo(a.left-h.left,a.top-h.top,a.width,a.height);var u=this.windowConstraints;if(u.right){l="layout"===u.right?o:r;s.right=Math.min(s.right,l.width)}if(u.bottom){var l="layout"===u.bottom?o:r;s.bottom=Math.min(s.bottom,l.height)}}else s.setTo(0,0,r.width,r.height);return s.setTo(Math.round(s.x),Math.round(s.y),Math.round(s.width),Math.round(s.height)),s},align:function(t,e){null!=t&&(this.pageAlignHorizontally=t),null!=e&&(this.pageAlignVertically=e)},alignCanvas:function(t,e){var i=this.getParentBounds(this._tempBounds),s=this.game.canvas,n=this.margin;if(t){n.left=n.right=0;h=s.getBoundingClientRect();if(this.width<i.width&&!this.incorrectOrientation){var r=h.left-i.x,o=i.width/2-this.width/2,a=(o=Math.max(o,0))-r;n.left=Math.round(a)}s.style.marginLeft=n.left+"px",0!==n.left&&(n.right=-(i.width-h.width-n.left),s.style.marginRight=n.right+"px")}if(e){n.top=n.bottom=0;var h=s.getBoundingClientRect();if(this.height<i.height&&!this.incorrectOrientation){var r=h.top-i.y,o=i.height/2-this.height/2,a=(o=Math.max(o,0))-r;n.top=Math.round(a)}s.style.marginTop=n.top+"px",0!==n.top&&(n.bottom=-(i.height-h.height-n.top),s.style.marginBottom=n.bottom+"px")}n.x=n.left,n.y=n.top},reflowGame:function(){this.resetCanvas("","");var t=this.getParentBounds(this._tempBounds);this.updateDimensions(t.width,t.height,!0)},reflowCanvas:function(){this.incorrectOrientation||(this.width=i.Math.clamp(this.width,this.minWidth||0,this.maxWidth||this.width),this.height=i.Math.clamp(this.height,this.minHeight||0,this.maxHeight||this.height)),this.resetCanvas(),this.compatibility.noMargins||(this.isFullScreen&&this._createdFullScreenTarget?this.alignCanvas(!0,!0):this.alignCanvas(this.pageAlignHorizontally,this.pageAlignVertically)),this.updateScalingAndBounds()},resetCanvas:function(t,e){void 0===t&&(t=this.width+"px"),void 0===e&&(e=this.height+"px");var i=this.game.canvas;this.compatibility.noMargins||(i.style.marginLeft="",i.style.marginTop="",i.style.marginRight="",i.style.marginBottom=""),i.style.width=t,i.style.height=e},queueUpdate:function(t){t&&(this._parentBounds.width=0,this._parentBounds.height=0),this._updateThrottle=this._updateThrottleReset},reset:function(t){t&&this.grid&&this.grid.reset()},setMaximum:function(){this.width=this.dom.visualBounds.width,this.height=this.dom.visualBounds.height},setShowAll:function(t){var e,i=this.getParentBounds(this._tempBounds),s=i.width,n=i.height;e=t?Math.max(n/this.game.height,s/this.game.width):Math.min(n/this.game.height,s/this.game.width),this.width=Math.round(this.game.width*e),this.height=Math.round(this.game.height*e)},setExactFit:function(){var t=this.getParentBounds(this._tempBounds);this.width=t.width,this.height=t.height,this.isFullScreen||(this.maxWidth&&(this.width=Math.min(this.width,this.maxWidth)),this.maxHeight&&(this.height=Math.min(this.height,this.maxHeight)))},createFullScreenTarget:function(){var t=document.createElement("div");return t.style.margin="0",t.style.padding="0",t.style.background="#000",t},startFullScreen:function(t,e){if(this.isFullScreen)return!1;{if(this.compatibility.supportsFullScreen){if("when-not-mouse"===this.compatibility.clickTrampoline){var s=this.game.input;if(s.activePointer&&s.activePointer!==s.mousePointer&&(e||!1!==e))return void s.activePointer.addClickTrampoline("startFullScreen",this.startFullScreen,this,[t,!1])}void 0!==t&&this.game.renderType===i.CANVAS&&(this.game.stage.smoothed=t);var n=this.fullScreenTarget;n||(this.cleanupCreatedTarget(),this._createdFullScreenTarget=this.createFullScreenTarget(),n=this._createdFullScreenTarget);var r={targetElement:n};if(this.hasPhaserSetFullScreen=!0,this.onFullScreenInit.dispatch(this,r),this._createdFullScreenTarget){var o=this.game.canvas;o.parentNode.insertBefore(n,o),n.appendChild(o)}return this.game.device.fullscreenKeyboard?n[this.game.device.requestFullscreen](Element.ALLOW_KEYBOARD_INPUT):n[this.game.device.requestFullscreen](),!0}var a=this;setTimeout(function(){a.fullScreenError()},10)}},stopFullScreen:function(){return!(!this.isFullScreen||!this.compatibility.supportsFullScreen)&&(this.hasPhaserSetFullScreen=!1,document[this.game.device.cancelFullscreen](),!0)},cleanupCreatedTarget:function(){var t=this._createdFullScreenTarget;if(t&&t.parentNode){var e=t.parentNode;e.insertBefore(this.game.canvas,t),e.removeChild(t)}this._createdFullScreenTarget=null},prepScreenMode:function(t){var e=!!this._createdFullScreenTarget,s=this._createdFullScreenTarget||this.fullScreenTarget;t?(e||this.fullScreenScaleMode===i.ScaleManager.EXACT_FIT)&&s!==this.game.canvas&&(this._fullScreenRestore={targetWidth:s.style.width,targetHeight:s.style.height},s.style.width="100%",s.style.height="100%"):(this._fullScreenRestore&&(s.style.width=this._fullScreenRestore.targetWidth,s.style.height=this._fullScreenRestore.targetHeight,this._fullScreenRestore=null),this.updateDimensions(this._gameSize.width,this._gameSize.height,!0),this.resetCanvas())},fullScreenChange:function(t){this.event=t,this.isFullScreen?(this.prepScreenMode(!0),this.updateLayout(),this.queueUpdate(!0)):(this.prepScreenMode(!1),this.cleanupCreatedTarget(),this.updateLayout(),this.queueUpdate(!0)),this.onFullScreenChange.dispatch(this,this.width,this.height)},fullScreenError:function(t){this.event=t,this.cleanupCreatedTarget(),console.warn("Phaser.ScaleManager: requestFullscreen failed or device does not support the Fullscreen API"),this.onFullScreenError.dispatch(this)},scaleSprite:function(t,e,i,s){if(void 0===e&&(e=this.width),void 0===i&&(i=this.height),void 0===s&&(s=!1),!t||!t.scale)return t;if(t.scale.x=1,t.scale.y=1,t.width<=0||t.height<=0||e<=0||i<=0)return t;var n=e,r=t.height*e/t.width,o=t.width*i/t.height,a=i,h=o>e;return(h=h?s:!s)?(t.width=Math.floor(n),t.height=Math.floor(r)):(t.width=Math.floor(o),t.height=Math.floor(a)),t},destroy:function(){this.game.onResume.remove(this._gameResumed,this),window.removeEventListener("orientationchange",this._orientationChange,!1),window.removeEventListener("resize",this._windowResize,!1),this.compatibility.supportsFullScreen&&(document.removeEventListener("webkitfullscreenchange",this._fullScreenChange,!1),document.removeEventListener("mozfullscreenchange",this._fullScreenChange,!1),document.removeEventListener("MSFullscreenChange",this._fullScreenChange,!1),document.removeEventListener("fullscreenchange",this._fullScreenChange,!1),document.removeEventListener("webkitfullscreenerror",this._fullScreenError,!1),document.removeEventListener("mozfullscreenerror",this._fullScreenError,!1),document.removeEventListener("MSFullscreenError",this._fullScreenError,!1),document.removeEventListener("fullscreenerror",this._fullScreenError,!1))}},i.ScaleManager.prototype.constructor=i.ScaleManager,Object.defineProperty(i.ScaleManager.prototype,"boundingParent",{get:function(){return this.parentIsWindow||this.isFullScreen&&this.hasPhaserSetFullScreen&&!this._createdFullScreenTarget?null:this.game.canvas&&this.game.canvas.parentNode||null}}),Object.defineProperty(i.ScaleManager.prototype,"scaleMode",{get:function(){return this._scaleMode},set:function(t){return t!==this._scaleMode&&(this.isFullScreen||(this.updateDimensions(this._gameSize.width,this._gameSize.height,!0),this.queueUpdate(!0)),this._scaleMode=t),this._scaleMode}}),Object.defineProperty(i.ScaleManager.prototype,"fullScreenScaleMode",{get:function(){return this._fullScreenScaleMode},set:function(t){return t!==this._fullScreenScaleMode&&(this.isFullScreen?(this.prepScreenMode(!1),this._fullScreenScaleMode=t,this.prepScreenMode(!0),this.queueUpdate(!0)):this._fullScreenScaleMode=t),this._fullScreenScaleMode}}),Object.defineProperty(i.ScaleManager.prototype,"currentScaleMode",{get:function(){return this.isFullScreen?this._fullScreenScaleMode:this._scaleMode}}),Object.defineProperty(i.ScaleManager.prototype,"pageAlignHorizontally",{get:function(){return this._pageAlignHorizontally},set:function(t){t!==this._pageAlignHorizontally&&(this._pageAlignHorizontally=t,this.queueUpdate(!0))}}),Object.defineProperty(i.ScaleManager.prototype,"pageAlignVertically",{get:function(){return this._pageAlignVertically},set:function(t){t!==this._pageAlignVertically&&(this._pageAlignVertically=t,this.queueUpdate(!0))}}),Object.defineProperty(i.ScaleManager.prototype,"isFullScreen",{get:function(){return!!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement)}}),Object.defineProperty(i.ScaleManager.prototype,"isPortrait",{get:function(){return"portrait"===this.classifyOrientation(this.screenOrientation)}}),Object.defineProperty(i.ScaleManager.prototype,"isLandscape",{get:function(){return"landscape"===this.classifyOrientation(this.screenOrientation)}}),Object.defineProperty(i.ScaleManager.prototype,"isGamePortrait",{get:function(){return this.height>this.width}}),Object.defineProperty(i.ScaleManager.prototype,"isGameLandscape",{get:function(){return this.width>this.height}}),i.Utils.Debug=function(t){this.game=t,this.sprite=null,this.bmd=null,this.canvas=null,this.context=null,this.font="14px Courier",this.columnWidth=100,this.lineHeight=16,this.lineWidth=1,this.renderShadow=!0,this.currentColor=null,this.currentX=0,this.currentY=0,this.currentAlpha=1,this.dirty=!1,this.isDisabled=!1,this._line=null,this._rect=null},i.Utils.Debug.prototype={boot:function(){this.game.renderType===i.CANVAS?this.context=this.game.context:(this.bmd=new i.BitmapData(this.game,"__DEBUG",this.game.width,this.game.height,!0),this.sprite=this.game.make.image(0,0,this.bmd),this.game.stage.addChild(this.sprite),this.game.scale.onSizeChange.add(this.resize,this),this.canvas=i.CanvasPool.create(this,this.game.width,this.game.height),this.context=this.canvas.getContext("2d")),this._line=new i.Line,this._rect=new i.Rectangle},resize:function(){this.bmd.resize(this.game.width,this.game.height),this.canvas.width=this.game.width,this.canvas.height=this.game.height},preUpdate:function(){this.dirty&&this.sprite&&(this.bmd.clear(),this.bmd.draw(this.canvas,0,0),this.context.clearRect(0,0,this.game.width,this.game.height),this.dirty=!1)},reset:function(){this.context&&this.context.clearRect(0,0,this.game.width,this.game.height),this.sprite&&this.bmd.clear()},start:function(t,e,i,s){"number"!=typeof t&&(t=0),"number"!=typeof e&&(e=0),i=i||"rgb(255,255,255)",void 0===s&&(s=0),this.currentX=t,this.currentY=e,this.currentColor=i,this.columnWidth=s,this.dirty=!0,this.context.save(),this.context.setTransform(1,0,0,1,0,0),this.context.strokeStyle=i,this.context.fillStyle=i,this.context.font=this.font,this.context.globalAlpha=this.currentAlpha},stop:function(){this.context.restore()},line:function(){for(var t=this.currentX,e=0;e<arguments.length;e++)this.renderShadow&&(this.context.fillStyle="rgb(0,0,0)",this.context.fillText(arguments[e],t+1,this.currentY+1),this.context.fillStyle=this.currentColor),this.context.fillText(arguments[e],t,this.currentY),t+=this.columnWidth;this.currentY+=this.lineHeight},sound:function(t,e,i){var s=this.game.sound;this.start(t,e,i),s.noAudio?this.line("Audio is disabled"):(this.line("Volume: "+s.volume.toFixed(2)+(s.mute?" (Mute)":"")),this.line("Mute on pause: "+s.muteOnPause),this.line("Using: "+(s.usingWebAudio?"Web Audio - "+s.context.state:"Audio Tag")),this.line("Touch locked: "+s.touchLocked),this.line("Sounds: "+s._sounds.length)),this.stop()},soundInfo:function(t,e,i,s){this.start(e,i,s),this.line("Sound: "+t.key+" Touch locked: "+t.game.sound.touchLocked),this.line("Is Ready?: "+this.game.cache.isSoundReady(t.key)+" Pending Playback: "+t.pendingPlayback),this.line("Decoded: "+t.isDecoded+" Decoding: "+t.isDecoding),this.line("Playing: "+t.isPlaying+" Loop: "+t.loop),this.line("Time: "+t.currentTime+"ms Total: "+t.totalDuration.toFixed(3)+"s"),this.line("Volume: "+t.volume.toFixed(2)+(t.mute?" (Mute)":"")),this.line("Using: "+(t.usingWebAudio?"Web Audio":"Audio Tag")),""!==t.currentMarker&&(this.line("Marker: "+t.currentMarker+" Duration: "+t.duration+" (ms: "+t.durationMS+")"),this.line("Start: "+t.markers[t.currentMarker].start+" Stop: "+t.markers[t.currentMarker].stop),this.line("Position: "+t.position)),this.stop()},camera:function(t,e,i){var s=t.deadzone,n=t.target,r=t.view;s&&(this._rect.setTo(r.x+s.x,r.y+s.y,s.width,s.height),this.rectangle(this._rect,e,i)),n&&(this._line.setTo(r.centerX,r.centerY,n.x,n.y),this.geom(this._line,e,i),this.geom(n,e,!1,3))},cameraInfo:function(t,e,i,s){var n=t.bounds,r=t.deadzone,o=t.target,a=t.view;this.start(e,i,s),this.line("Camera ("+t.width+" x "+t.height+")"),this.line("x: "+t.x+" y: "+t.y),this.line("Bounds: "+(n?"x: "+n.x+" y: "+n.y+" w: "+n.width+" h: "+n.height:"none")),this.line("View: x: "+a.x+" y: "+a.y+" w: "+a.width+" h: "+a.height),this.line("Deadzone: "+(r?"x: "+r.x+" y: "+r.y+" w: "+r.width+" h: "+r.height:r)),this.line("Total in view: "+t.totalInView),this.line("At limit: x: "+t.atLimit.x+" y: "+t.atLimit.y),this.line("Target: "+(o?o.name||o:"none")),this.stop()},timer:function(t,e,i,s){this.start(e,i,s),this.line("Timer (running: "+t.running+" expired: "+t.expired+")"),this.line("Next Tick: "+t.next+" Duration: "+t.duration),this.line("Paused: "+t.paused+" Length: "+t.length),this.stop()},pointer:function(t,e,i,s,n){null!=t&&(void 0===e&&(e=!1),i=i||"rgba(0,255,0,0.5)",s=s||"rgba(255,0,0,0.5)",!0===e&&!0===t.isUp||(this.start(t.x,t.y-100,n),this.context.beginPath(),this.context.arc(t.x,t.y,t.circle.radius,0,2*Math.PI),t.active?this.context.fillStyle=i:this.context.fillStyle=s,this.context.fill(),this.context.closePath(),this.context.beginPath(),this.context.moveTo(t.positionDown.x,t.positionDown.y),this.context.lineTo(t.position.x,t.position.y),this.context.lineWidth=2,this.context.stroke(),this.context.closePath(),this.line("ID: "+t.id+" Active: "+t.active),this.line("World X: "+t.worldX+" World Y: "+t.worldY),this.line("Screen X: "+t.x+" Screen Y: "+t.y+" In: "+t.withinGame),this.line("Duration: "+t.duration+" ms"),this.line("is Down: "+t.isDown+" is Up: "+t.isUp),this.stop()))},spriteInputInfo:function(t,e,i,s){this.start(e,i,s),this.line("Sprite Input: ("+t.width+" x "+t.height+")"),this.line("x: "+t.input.pointerX().toFixed(1)+" y: "+t.input.pointerY().toFixed(1)),this.line("over: "+t.input.pointerOver()+" duration: "+t.input.overDuration().toFixed(0)),this.line("down: "+t.input.pointerDown()+" duration: "+t.input.downDuration().toFixed(0)),this.line("just over: "+t.input.justOver()+" just out: "+t.input.justOut()),this.stop()},key:function(t,e,i,s){this.start(e,i,s,150),this.line("Key:",t.keyCode,"isDown:",t.isDown),this.line("justDown:",t.justDown,"justUp:",t.justUp),this.line("Time Down:",t.timeDown.toFixed(0),"duration:",t.duration.toFixed(0)),this.stop()},inputInfo:function(t,e,i){this.start(t,e,i),this.line("Input"),this.line("X: "+this.game.input.x+" Y: "+this.game.input.y),this.line("World X: "+this.game.input.worldX+" World Y: "+this.game.input.worldY),this.line("Scale X: "+this.game.input.scale.x.toFixed(1)+" Scale Y: "+this.game.input.scale.x.toFixed(1)),this.line("Screen X: "+this.game.input.activePointer.screenX+" Screen Y: "+this.game.input.activePointer.screenY),this.stop()},spriteBounds:function(t,e,i){var s=t.getBounds();s.x+=this.game.camera.x,s.y+=this.game.camera.y,this.rectangle(s,e,i)},ropeSegments:function(t,e,i){var s=this;t.segments.forEach(function(t){s.rectangle(t,e,i)},this)},spriteInfo:function(t,e,i,s){this.start(e,i,s),this.line("Sprite: "+(t.name||"")+" ("+t.width+" x "+t.height+") anchor: "+t.anchor.x+" x "+t.anchor.y),this.line("x: "+t.x.toFixed(1)+" y: "+t.y.toFixed(1)),this.line("angle: "+t.angle.toFixed(1)+" rotation: "+t.rotation.toFixed(1)),this.line("visible: "+t.visible+" in camera: "+t.inCamera),this.line("bounds x: "+t._bounds.x.toFixed(1)+" y: "+t._bounds.y.toFixed(1)+" w: "+t._bounds.width.toFixed(1)+" h: "+t._bounds.height.toFixed(1)),this.stop()},spriteCoords:function(t,e,i,s){this.start(e,i,s,100),t.name&&this.line(t.name),this.line("x:",t.x.toFixed(2),"y:",t.y.toFixed(2)),this.line("pos x:",t.position.x.toFixed(2),"pos y:",t.position.y.toFixed(2)),this.line("world x:",t.world.x.toFixed(2),"world y:",t.world.y.toFixed(2)),this.stop()},lineInfo:function(t,e,i,s){this.start(e,i,s,80),this.line("start.x:",t.start.x.toFixed(2),"start.y:",t.start.y.toFixed(2)),this.line("end.x:",t.end.x.toFixed(2),"end.y:",t.end.y.toFixed(2)),this.line("length:",t.length.toFixed(2),"angle:",t.angle),this.stop()},pixel:function(t,e,i,s){s=s||2,this.start(),this.context.fillStyle=i,this.context.fillRect(t,e,s,s),this.stop()},geom:function(t,e,s,n){void 0===s&&(s=!0),void 0===n&&(n=0),e=e||"rgba(0,255,0,0.4)",this.start(),this.context.fillStyle=e,this.context.strokeStyle=e,this.context.lineWidth=this.lineWidth,t instanceof i.Rectangle||1===n?s?this.context.fillRect(t.x-this.game.camera.x,t.y-this.game.camera.y,t.width,t.height):this.context.strokeRect(t.x-this.game.camera.x,t.y-this.game.camera.y,t.width,t.height):t instanceof i.Circle||2===n?(this.context.beginPath(),this.context.arc(t.x-this.game.camera.x,t.y-this.game.camera.y,t.radius,0,2*Math.PI,!1),this.context.closePath(),s?this.context.fill():this.context.stroke()):t instanceof i.Point||3===n?this.context.fillRect(t.x-this.game.camera.x,t.y-this.game.camera.y,4,4):t instanceof i.Line||4===n?(this.context.beginPath(),this.context.moveTo(t.start.x+.5-this.game.camera.x,t.start.y+.5-this.game.camera.y),this.context.lineTo(t.end.x+.5-this.game.camera.x,t.end.y+.5-this.game.camera.y),this.context.closePath(),this.context.stroke()):(t instanceof i.Ellipse||5===n)&&(this.context.beginPath(),this.context.ellipse(t.x-this.game.camera.x,t.y-this.game.camera.y,t.width/2,t.height/2,0,2*Math.PI,!1),this.context.closePath(),s?this.context.fill():this.context.stroke()),this.stop()},rectangle:function(t,e,i){void 0===i&&(i=!0),e=e||"rgba(0, 255, 0, 0.4)",this.start(),i?(this.context.fillStyle=e,this.context.fillRect(t.x-this.game.camera.x,t.y-this.game.camera.y,t.width,t.height)):(this.context.lineWidth=this.lineWidth,this.context.strokeStyle=e,this.context.strokeRect(t.x-this.game.camera.x,t.y-this.game.camera.y,t.width,t.height)),this.stop()},text:function(t,e,i,s,n){s=s||"rgb(255,255,255)",n=n||this.font,this.start(),this.context.font=n,this.renderShadow&&(this.context.fillStyle="rgb(0,0,0)",this.context.fillText(t,e+1,i+1)),this.context.fillStyle=s,this.context.fillText(t,e,i),this.stop()},quadTree:function(t,e){e=e||"rgba(255,0,0,0.3)",this.start();var i=t.bounds;if(0===t.nodes.length){this.context.strokeStyle=e,this.context.strokeRect(i.x,i.y,i.width,i.height),this.text("size: "+t.objects.length,i.x+4,i.y+16,"rgb(0,200,0)","12px Courier"),this.context.strokeStyle="rgb(0,255,0)";for(s=0;s<t.objects.length;s++)this.context.strokeRect(t.objects[s].x,t.objects[s].y,t.objects[s].width,t.objects[s].height)}else for(var s=0;s<t.nodes.length;s++)this.quadTree(t.nodes[s]);this.stop()},body:function(t,e,s){t.body&&(this.start(),t.body.type===i.Physics.ARCADE?i.Physics.Arcade.Body.render(this.context,t.body,e,s,this.lineWidth):t.body.type===i.Physics.NINJA?i.Physics.Ninja.Body.render(this.context,t.body,e,s):t.body.type===i.Physics.BOX2D&&i.Physics.Box2D.renderBody(this.context,t.body,e),this.stop())},bodyInfo:function(t,e,s,n){t.body&&(this.start(e,s,n,210),t.body.type===i.Physics.ARCADE?i.Physics.Arcade.Body.renderBodyInfo(this,t.body):t.body.type===i.Physics.BOX2D&&this.game.physics.box2d.renderBodyInfo(this,t.body),this.stop())},box2dWorld:function(){this.start(),this.context.translate(-this.game.camera.view.x,-this.game.camera.view.y,0),this.game.physics.box2d.renderDebugDraw(this.context),this.stop()},box2dBody:function(t,e){this.start(),i.Physics.Box2D.renderBody(this.context,t,e),this.stop()},displayList:function(t){if(void 0===t&&(t=this.game.world),t.hasOwnProperty("renderOrderID")?console.log("["+t.renderOrderID+"]",t):console.log("[]",t),t.children&&t.children.length>0)for(var e=0;e<t.children.length;e++)this.game.debug.displayList(t.children[e])},renderer:function(t,e,i){var s=this.game.renderer,n=s.renderSession;if(this.start(t,e,i),this.line((s.gl?"WebGL":"Canvas")+" Renderer ("+s.width+" x "+s.height+")"),this.line("autoResize: "+s.autoResize),this.line("clearBeforeRender: "+s.clearBeforeRender),this.line("resolution: "+s.resolution),this.line("transparent: "+s.transparent),this.line("renderSession:"),s.gl){this.line("  currentBatchedTextures: ("+s.currentBatchedTextures.length+")");for(var r=0;r<s.currentBatchedTextures.length;r++)this.line("    "+s.currentBatchedTextures[r]);this.line("  drawCount: "+n.drawCount),this.line("  maxTextures: "+s.maxTextures),this.line("  maxTextureSize: "+s.maxTextureSize),this.line("  maxTextureAvailableSpace: "+n.maxTextureAvailableSpace),this.line("  roundPixels: "+n.roundPixels)}else this.line("  roundPixels: "+n.roundPixels),this.line("  scaleMode: "+(0===n.scaleMode?"LINEAR":1===n.scaleMode?"NEAREST":n.scaleMode));this.stop()},canvasPool:function(t,e,s,n){var r=i.CanvasPool;this.start(t,e,s,n||100),this.line("Canvas Pool"),this.line("Used:",r.getTotal()),this.line("Free:",r.getFree()),this.line("Total:",r.length),this.stop()},physicsGroup:function(t,e,i,s){t.forEach(this.body,this,s,e,i)},phaser:function(t,e,s){this.text("Phaser v"+i.VERSION+" "+(this.game.renderType===i.WEBGL?"WebGL":"Canvas")+" "+(this.game.device.webAudio?"WebAudio":"HTML Audio"),t,e,s,this.font)},scale:function(t,e,s){this.start(t,e,s);var n=this.game.scale,r=n.scaleFactorInversed,o=n._parentBounds,t=" x ";this.line("Game: "+this.game.width+t+this.game.height),this.line("Canvas: "+n.width+t+n.height+" ("+r.x.toFixed(2)+t+r.y.toFixed(2)+") ["+n.aspectRatio.toFixed(2)+"]"),this.line("Mode: "+i.ScaleManager.MODES[n.currentScaleMode]+(n.currentScaleMode===i.ScaleManager.USER_SCALE?" ("+n._userScaleFactor.x+t+n._userScaleFactor.y+")":"")),this.line("Parent: "+(n.parentIsWindow?"window":n.parentNode)+(o.empty?"":" ("+o.width+t+o.height+")")),this.line("Screen: "+n.classifyOrientation(n.screenOrientation)+(n.incorrectOrientation?" (incorrect)":"")),this.stop()},loader:function(t,e,s,n){var r=i.Utils.pad;this.start(e,s,n),t.hasLoaded?this.line("Complete"+(t.resetLocked?" [locked]":"")):t.isLoading?this.line("Loading"):this.line("Not started"),t.hasLoaded&&!t.resetLocked||(this.line("Progress: "+r(t.progress,3)+"%"),this.line("Files: "+t._loadedFileCount+" of "+t._totalFileCount),this.line("Packs: "+t._loadedPackCount+" of "+t._loadedPackCount)),this.stop()},destroy:function(){i.CanvasPool.remove(this)}},i.Utils.Debug.prototype.constructor=i.Utils.Debug,i.DOM={getOffset:function(t,e){e=e||new i.Point;var s=t.getBoundingClientRect(),n=i.DOM.scrollY,r=i.DOM.scrollX,o=document.documentElement.clientTop,a=document.documentElement.clientLeft;return e.x=s.left+r-a,e.y=s.top+n-o,e},getBounds:function(t,e){return void 0===e&&(e=0),!(!(t=t&&!t.nodeType?t[0]:t)||1!==t.nodeType)&&this.calibrate(t.getBoundingClientRect(),e)},calibrate:function(t,e){e=+e||0;var i={width:0,height:0,left:0,right:0,top:0,bottom:0};return i.width=(i.right=t.right+e)-(i.left=t.left-e),i.height=(i.bottom=t.bottom+e)-(i.top=t.top-e),i},getAspectRatio:function(t){var e=(t=null==t?this.visualBounds:1===t.nodeType?this.getBounds(t):t).width,i=t.height;return"function"==typeof e&&(e=e.call(t)),"function"==typeof i&&(i=i.call(t)),e/i},inLayoutViewport:function(t,e){var i=this.getBounds(t,e);return!!i&&i.bottom>=0&&i.right>=0&&i.top<=this.layoutBounds.width&&i.left<=this.layoutBounds.height},getScreenOrientation:function(t){var e=window.screen,i=e.orientation||e.mozOrientation||e.msOrientation;if(i&&"string"==typeof i.type)return i.type;if("string"==typeof i)return i;var s="portrait-primary",n="landscape-primary";if("screen"===t)return e.height>e.width?s:n;if("viewport"===t)return this.visualBounds.height>this.visualBounds.width?s:n;if("window.orientation"===t&&"number"==typeof window.orientation)return 0===window.orientation||180===window.orientation?s:n;if(window.matchMedia){if(window.matchMedia("(orientation: portrait)").matches)return s;if(window.matchMedia("(orientation: landscape)").matches)return n}return this.visualBounds.height>this.visualBounds.width?s:n},visualBounds:new i.Rectangle,layoutBounds:new i.Rectangle,documentBounds:new i.Rectangle},i.Device.whenReady(function(t){var e=window&&"pageXOffset"in window?function(){return window.pageXOffset}:function(){return document.documentElement.scrollLeft},s=window&&"pageYOffset"in window?function(){return window.pageYOffset}:function(){return document.documentElement.scrollTop};if(Object.defineProperty(i.DOM,"scrollX",{get:e}),Object.defineProperty(i.DOM,"scrollY",{get:s}),Object.defineProperty(i.DOM.visualBounds,"x",{get:e}),Object.defineProperty(i.DOM.visualBounds,"y",{get:s}),Object.defineProperty(i.DOM.layoutBounds,"x",{value:0}),Object.defineProperty(i.DOM.layoutBounds,"y",{value:0}),t.desktop&&document.documentElement.clientWidth<=window.innerWidth&&document.documentElement.clientHeight<=window.innerHeight){var n=function(){return Math.max(window.innerWidth,document.documentElement.clientWidth)},r=function(){return Math.max(window.innerHeight,document.documentElement.clientHeight)};Object.defineProperty(i.DOM.visualBounds,"width",{get:n}),Object.defineProperty(i.DOM.visualBounds,"height",{get:r}),Object.defineProperty(i.DOM.layoutBounds,"width",{get:n}),Object.defineProperty(i.DOM.layoutBounds,"height",{get:r})}else Object.defineProperty(i.DOM.visualBounds,"width",{get:function(){return window.innerWidth}}),Object.defineProperty(i.DOM.visualBounds,"height",{get:function(){return window.innerHeight}}),Object.defineProperty(i.DOM.layoutBounds,"width",{get:function(){var t=document.documentElement.clientWidth,e=window.innerWidth;return t<e?e:t}}),Object.defineProperty(i.DOM.layoutBounds,"height",{get:function(){var t=document.documentElement.clientHeight,e=window.innerHeight;return t<e?e:t}});Object.defineProperty(i.DOM.documentBounds,"x",{value:0}),Object.defineProperty(i.DOM.documentBounds,"y",{value:0}),Object.defineProperty(i.DOM.documentBounds,"width",{get:function(){var t=document.documentElement;return Math.max(t.clientWidth,t.offsetWidth,t.scrollWidth)}}),Object.defineProperty(i.DOM.documentBounds,"height",{get:function(){var t=document.documentElement;return Math.max(t.clientHeight,t.offsetHeight,t.scrollHeight)}})},null,!0),i.ArraySet=function(t){this.position=0,this.list=t||[]},i.ArraySet.prototype={add:function(t){return this.exists(t)||this.list.push(t),t},getIndex:function(t){return this.list.indexOf(t)},getByKey:function(t,e){for(var i=this.list.length;i--;)if(this.list[i][t]===e)return this.list[i];return null},exists:function(t){return this.list.indexOf(t)>-1},reset:function(){this.list.length=0},remove:function(t){var e=this.list.indexOf(t);if(e>-1)return this.list.splice(e,1),t},setAll:function(t,e){for(var i=this.list.length;i--;)this.list[i]&&(this.list[i][t]=e)},callAll:function(t){for(var e=Array.prototype.slice.call(arguments,1),i=this.list.length;i--;)this.list[i]&&this.list[i][t]&&this.list[i][t].apply(this.list[i],e)},removeAll:function(t){void 0===t&&(t=!1);for(var e=this.list.length;e--;)if(this.list[e]){var i=this.remove(this.list[e]);t&&i.destroy()}this.position=0,this.list=[]}},Object.defineProperty(i.ArraySet.prototype,"total",{get:function(){return this.list.length}}),Object.defineProperty(i.ArraySet.prototype,"first",{get:function(){return this.position=0,this.list.length>0?this.list[0]:null}}),Object.defineProperty(i.ArraySet.prototype,"next",{get:function(){return this.position<this.list.length?(this.position++,this.list[this.position]):null}}),i.ArraySet.prototype.constructor=i.ArraySet,i.ArrayUtils={getRandomItem:function(t,e,i){if(null===t)return null;void 0===e&&(e=0),void 0===i&&(i=t.length);var s=e+Math.floor(Math.random()*i);return void 0===t[s]?null:t[s]},removeRandomItem:function(t,e,i){if(null==t)return null;void 0===e&&(e=0),void 0===i&&(i=t.length);var s=e+Math.floor(Math.random()*i);if(s<t.length){var n=t.splice(s,1);return void 0===n[0]?null:n[0]}return null},remove:function(t,e,i){var s=t.length;if(!(e>=s||0===i)){null==i&&(i=1);for(var n=s-i,r=e;r<n;++r)t[r]=t[r+i];t.length=n}},shuffle:function(t){for(var e=t.length-1;e>0;e--){var i=Math.floor(Math.random()*(e+1)),s=t[e];t[e]=t[i],t[i]=s}return t},transposeMatrix:function(t){for(var e=t.length,i=t[0].length,s=new Array(i),n=0;n<i;n++){s[n]=new Array(e);for(var r=e-1;r>-1;r--)s[n][r]=t[r][n]}return s},rotateMatrix:function(t,e){if("string"!=typeof e&&(e=(e%360+360)%360),90===e||-270===e||"rotateLeft"===e)t=(t=i.ArrayUtils.transposeMatrix(t)).reverse();else if(-90===e||270===e||"rotateRight"===e)t=t.reverse(),t=i.ArrayUtils.transposeMatrix(t);else if(180===Math.abs(e)||"rotate180"===e){for(var s=0;s<t.length;s++)t[s].reverse();t=t.reverse()}return t},findClosest:function(t,e){if(!e.length)return NaN;if(1===e.length||t<e[0])return e[0];for(var i=1;e[i]<t;)i++;var s=e[i-1],n=i<e.length?e[i]:Number.POSITIVE_INFINITY;return n-t<=t-s?n:s},rotateRight:function(t){var e=t.pop();return t.unshift(e),e},rotateLeft:function(t){var e=t.shift();return t.push(e),e},numberArray:function(t,e){void 0!==e&&null!==e||(e=t,t=0);for(var i=[],s=t;s<=e;s++)i.push(s);return i},numberArrayStep:function(t,e,s){void 0!==t&&null!==t||(t=0),void 0!==e&&null!==e||(e=t,t=0),void 0===s&&(s=1);for(var n=[],r=Math.max(i.Math.roundAwayFromZero((e-t)/(s||1)),0),o=0;o<r;o++)n.push(t),t+=s;return n}},i.LinkedList=function(){this.next=null,this.prev=null,this.first=null,this.last=null,this.total=0},i.LinkedList.prototype={add:function(t){return 0===this.total&&null===this.first&&null===this.last?(this.first=t,this.last=t,this.next=t,t.prev=this,this.total++,t):(this.last.next=t,t.prev=this.last,this.last=t,this.total++,t)},reset:function(){this.first=null,this.last=null,this.next=null,this.prev=null,this.total=0},remove:function(t){if(1===this.total)return this.reset(),void(t.next=t.prev=null);t===this.first?this.first=this.first.next:t===this.last&&(this.last=this.last.prev),t.prev&&(t.prev.next=t.next),t.next&&(t.next.prev=t.prev),t.next=t.prev=null,null===this.first&&(this.last=null),this.total--},callAll:function(t){if(this.first&&this.last){var e=this.first;do{e&&e[t]&&e[t].call(e),e=e.next}while(e!==this.last.next)}}},i.LinkedList.prototype.constructor=i.LinkedList,i.Create=function(t){this.game=t,this.bmd=null,this.canvas=null,this.ctx=null,this.palettes=[{0:"#000",1:"#9D9D9D",2:"#FFF",3:"#BE2633",4:"#E06F8B",5:"#493C2B",6:"#A46422",7:"#EB8931",8:"#F7E26B",9:"#2F484E",A:"#44891A",B:"#A3CE27",C:"#1B2632",D:"#005784",E:"#31A2F2",F:"#B2DCEF"},{0:"#000",1:"#191028",2:"#46af45",3:"#a1d685",4:"#453e78",5:"#7664fe",6:"#833129",7:"#9ec2e8",8:"#dc534b",9:"#e18d79",A:"#d6b97b",B:"#e9d8a1",C:"#216c4b",D:"#d365c8",E:"#afaab9",F:"#f5f4eb"},{0:"#000",1:"#2234d1",2:"#0c7e45",3:"#44aacc",4:"#8a3622",5:"#5c2e78",6:"#aa5c3d",7:"#b5b5b5",8:"#5e606e",9:"#4c81fb",A:"#6cd947",B:"#7be2f9",C:"#eb8a60",D:"#e23d69",E:"#ffd93f",F:"#fff"},{0:"#000",1:"#fff",2:"#8b4131",3:"#7bbdc5",4:"#8b41ac",5:"#6aac41",6:"#3931a4",7:"#d5de73",8:"#945a20",9:"#5a4100",A:"#bd736a",B:"#525252",C:"#838383",D:"#acee8b",E:"#7b73de",F:"#acacac"},{0:"#000",1:"#191028",2:"#46af45",3:"#a1d685",4:"#453e78",5:"#7664fe",6:"#833129",7:"#9ec2e8",8:"#dc534b",9:"#e18d79",A:"#d6b97b",B:"#e9d8a1",C:"#216c4b",D:"#d365c8",E:"#afaab9",F:"#fff"}]},i.Create.PALETTE_ARNE=0,i.Create.PALETTE_JMP=1,i.Create.PALETTE_CGA=2,i.Create.PALETTE_C64=3,i.Create.PALETTE_JAPANESE_MACHINE=4,i.Create.prototype={texture:function(t,e,i,s,n,r,o,a){void 0===i&&(i=8),void 0===s&&(s=i),void 0===n&&(n=0),void 0===r&&(r=!0);var h=e[0].length*i,u=e.length*s;null===this.bmd&&(this.bmd=this.game.make.bitmapData(),this.canvas=this.bmd.canvas,this.ctx=this.bmd.context),this.bmd.resize(h,u),this.bmd.clear();for(var l=0;l<e.length;l++)for(var c=e[l],d=0;d<c.length;d++){var p=c[d];"."!==p&&" "!==p&&(this.ctx.fillStyle=this.palettes[n][p],this.ctx.fillRect(d*i,l*s,i,s))}return r?this.bmd.generateTexture(t,o,a):this.copy()},grid:function(t,e,i,s,n,r,o,a,h){void 0===o&&(o=!0),null===this.bmd&&(this.bmd=this.game.make.bitmapData(),this.canvas=this.bmd.canvas,this.ctx=this.bmd.context),this.bmd.resize(e,i),this.ctx.fillStyle=r;for(var u=0;u<i;u+=n)this.ctx.fillRect(0,u,e,1);for(var l=0;l<e;l+=s)this.ctx.fillRect(l,0,1,i);return o?this.bmd.generateTexture(t,a,h):this.copy()},copy:function(t,e,i,s,n,r,o){return null==t&&(t=this.game.make.bitmapData()),t.resize(this.bmd.width,this.bmd.height),t.draw(this.bmd,e,i,s,n,r,o)}},i.Create.prototype.constructor=i.Create,i.FlexGrid=function(t,e,s){this.game=t.game,this.manager=t,this.width=e,this.height=s,this.boundsCustom=new i.Rectangle(0,0,e,s),this.boundsFluid=new i.Rectangle(0,0,e,s),this.boundsFull=new i.Rectangle(0,0,e,s),this.boundsNone=new i.Rectangle(0,0,e,s),this.positionCustom=new i.Point(0,0),this.positionFluid=new i.Point(0,0),this.positionFull=new i.Point(0,0),this.positionNone=new i.Point(0,0),this.scaleCustom=new i.Point(1,1),this.scaleFluid=new i.Point(1,1),this.scaleFluidInversed=new i.Point(1,1),this.scaleFull=new i.Point(1,1),this.scaleNone=new i.Point(1,1),this.customWidth=0,this.customHeight=0,this.customOffsetX=0,this.customOffsetY=0,this.ratioH=e/s,this.ratioV=s/e,this.multiplier=0,this.layers=[]},i.FlexGrid.prototype={setSize:function(t,e){this.width=t,this.height=e,this.ratioH=t/e,this.ratioV=e/t,this.scaleNone=new i.Point(1,1),this.boundsNone.width=this.width,this.boundsNone.height=this.height,this.refresh()},createCustomLayer:function(t,e,s,n){void 0===n&&(n=!0),this.customWidth=t,this.customHeight=e,this.boundsCustom.width=t,this.boundsCustom.height=e;var r=new i.FlexLayer(this,this.positionCustom,this.boundsCustom,this.scaleCustom);return n&&this.game.world.add(r),this.layers.push(r),void 0!==s&&null!==typeof s&&r.addMultiple(s),r},createFluidLayer:function(t,e){void 0===e&&(e=!0);var s=new i.FlexLayer(this,this.positionFluid,this.boundsFluid,this.scaleFluid);return e&&this.game.world.add(s),this.layers.push(s),void 0!==t&&null!==typeof t&&s.addMultiple(t),s},createFullLayer:function(t){var e=new i.FlexLayer(this,this.positionFull,this.boundsFull,this.scaleFluid);return this.game.world.add(e),this.layers.push(e),void 0!==t&&e.addMultiple(t),e},createFixedLayer:function(t){var e=new i.FlexLayer(this,this.positionNone,this.boundsNone,this.scaleNone);return this.game.world.add(e),this.layers.push(e),void 0!==t&&e.addMultiple(t),e},reset:function(){for(var t=this.layers.length;t--;)this.layers[t].persist||(this.layers[t].position=null,this.layers[t].scale=null,this.layers.slice(t,1))},onResize:function(t,e){this.ratioH=t/e,this.ratioV=e/t,this.refresh(t,e)},refresh:function(){this.multiplier=Math.min(this.manager.height/this.height,this.manager.width/this.width),this.boundsFluid.width=Math.round(this.width*this.multiplier),this.boundsFluid.height=Math.round(this.height*this.multiplier),this.scaleFluid.set(this.boundsFluid.width/this.width,this.boundsFluid.height/this.height),this.scaleFluidInversed.set(this.width/this.boundsFluid.width,this.height/this.boundsFluid.height),this.scaleFull.set(this.boundsFull.width/this.width,this.boundsFull.height/this.height),this.boundsFull.width=Math.round(this.manager.width*this.scaleFluidInversed.x),this.boundsFull.height=Math.round(this.manager.height*this.scaleFluidInversed.y),this.boundsFluid.centerOn(this.manager.bounds.centerX,this.manager.bounds.centerY),this.boundsNone.centerOn(this.manager.bounds.centerX,this.manager.bounds.centerY),this.positionFluid.set(this.boundsFluid.x,this.boundsFluid.y),this.positionNone.set(this.boundsNone.x,this.boundsNone.y)},fitSprite:function(t){this.manager.scaleSprite(t),t.x=this.manager.bounds.centerX,t.y=this.manager.bounds.centerY},debug:function(){this.game.debug.text(this.boundsFluid.width+" x "+this.boundsFluid.height,this.boundsFluid.x+4,this.boundsFluid.y+16),this.game.debug.geom(this.boundsFluid,"rgba(255,0,0,0.9",!1)}},i.FlexGrid.prototype.constructor=i.FlexGrid,i.FlexLayer=function(t,e,s,n){i.Group.call(this,t.game,null,"__flexLayer"+t.game.rnd.uuid(),!1),this.manager=t.manager,this.grid=t,this.persist=!1,this.position=e,this.bounds=s,this.scale=n,this.topLeft=s.topLeft,this.topMiddle=new i.Point(s.halfWidth,0),this.topRight=s.topRight,this.bottomLeft=s.bottomLeft,this.bottomMiddle=new i.Point(s.halfWidth,s.bottom),this.bottomRight=s.bottomRight},i.FlexLayer.prototype=Object.create(i.Group.prototype),i.FlexLayer.prototype.constructor=i.FlexLayer,i.FlexLayer.prototype.resize=function(){},i.FlexLayer.prototype.debug=function(){this.game.debug.text(this.bounds.width+" x "+this.bounds.height,this.bounds.x+4,this.bounds.y+16),this.game.debug.geom(this.bounds,"rgba(0,0,255,0.9",!1),this.game.debug.geom(this.topLeft,"rgba(255,255,255,0.9"),this.game.debug.geom(this.topMiddle,"rgba(255,255,255,0.9"),this.game.debug.geom(this.topRight,"rgba(255,255,255,0.9")},i.Color={RED:16711680,ORANGE:16750848,YELLOW:16776960,GREEN:65280,AQUA:65535,BLUE:255,VIOLET:16711935,WHITE:16777215,BLACK:0,GRAY:6710886,packPixel:function(t,e,s,n){return i.Device.LITTLE_ENDIAN?(n<<24|s<<16|e<<8|t)>>>0:(t<<24|e<<16|s<<8|n)>>>0},unpackPixel:function(t,e,s,n){return void 0!==e&&null!==e||(e=i.Color.createColor()),void 0!==s&&null!==s||(s=!1),void 0!==n&&null!==n||(n=!1),i.Device.LITTLE_ENDIAN?(e.a=(4278190080&t)>>>24,e.b=(16711680&t)>>>16,e.g=(65280&t)>>>8,e.r=255&t):(e.r=(4278190080&t)>>>24,e.g=(16711680&t)>>>16,e.b=(65280&t)>>>8,e.a=255&t),e.color=t,e.rgba="rgba("+e.r+","+e.g+","+e.b+","+e.a/255+")",s&&i.Color.RGBtoHSL(e.r,e.g,e.b,e),n&&i.Color.RGBtoHSV(e.r,e.g,e.b,e),e},fromRGBA:function(t,e){return e||(e=i.Color.createColor()),e.r=(4278190080&t)>>>24,e.g=(16711680&t)>>>16,e.b=(65280&t)>>>8,e.a=255&t,e.rgba="rgba("+e.r+","+e.g+","+e.b+","+e.a+")",e},toRGBA:function(t,e,i,s){return t<<24|e<<16|i<<8|s},toABGR:function(t,e,i,s){return(s<<24|i<<16|e<<8|t)>>>0},hexToRGBArray:function(t){return[(t>>16&255)/255,(t>>8&255)/255,(255&t)/255]},RGBArrayToHex:function(t){return(255*t[0]<<16)+(255*t[1]<<8)+255*t[2]},RGBtoHSL:function(t,e,s,n){n||(n=i.Color.createColor(t,e,s,1)),t/=255,e/=255,s/=255;var r=Math.min(t,e,s),o=Math.max(t,e,s);if(n.h=0,n.s=0,n.l=(o+r)/2,o!==r){var a=o-r;n.s=n.l>.5?a/(2-o-r):a/(o+r),o===t?n.h=(e-s)/a+(e<s?6:0):o===e?n.h=(s-t)/a+2:o===s&&(n.h=(t-e)/a+4),n.h/=6}return n},HSLtoRGB:function(t,e,s,n){if(n?(n.r=s,n.g=s,n.b=s):n=i.Color.createColor(s,s,s),0!==e){var r=s<.5?s*(1+e):s+e-s*e,o=2*s-r;n.r=i.Color.hueToColor(o,r,t+1/3),n.g=i.Color.hueToColor(o,r,t),n.b=i.Color.hueToColor(o,r,t-1/3)}return n.r=Math.floor(255*n.r|0),n.g=Math.floor(255*n.g|0),n.b=Math.floor(255*n.b|0),i.Color.updateColor(n),n},RGBtoHSV:function(t,e,s,n){n||(n=i.Color.createColor(t,e,s,255)),t/=255,e/=255,s/=255;var r=Math.min(t,e,s),o=Math.max(t,e,s),a=o-r;return n.h=0,n.s=0===o?0:a/o,n.v=o,o!==r&&(o===t?n.h=(e-s)/a+(e<s?6:0):o===e?n.h=(s-t)/a+2:o===s&&(n.h=(t-e)/a+4),n.h/=6),n},HSVtoRGB:function(t,e,s,n){void 0===n&&(n=i.Color.createColor(0,0,0,1,t,e,0,s));var r,o,a,h=Math.floor(6*t),u=6*t-h,l=s*(1-e),c=s*(1-u*e),d=s*(1-(1-u)*e);switch(h%6){case 0:r=s,o=d,a=l;break;case 1:r=c,o=s,a=l;break;case 2:r=l,o=s,a=d;break;case 3:r=l,o=c,a=s;break;case 4:r=d,o=l,a=s;break;case 5:r=s,o=l,a=c}return n.r=Math.floor(255*r),n.g=Math.floor(255*o),n.b=Math.floor(255*a),i.Color.updateColor(n),n},hueToColor:function(t,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+6*(e-t)*i:i<.5?e:i<2/3?t+(e-t)*(2/3-i)*6:t},createColor:function(t,e,s,n,r,o,a,h){var u={r:t||0,g:e||0,b:s||0,a:n||1,h:r||0,s:o||0,l:a||0,v:h||0,color:0,color32:0,rgba:""};return i.Color.updateColor(u)},updateColor:function(t){return t.rgba="rgba("+t.r.toFixed()+","+t.g.toFixed()+","+t.b.toFixed()+","+t.a.toString()+")",t.color=i.Color.getColor(t.r,t.g,t.b),t.color32=i.Color.getColor32(255*t.a,t.r,t.g,t.b),t},getColor32:function(t,e,i,s){return t<<24|e<<16|i<<8|s},getColor:function(t,e,i){return t<<16|e<<8|i},RGBtoString:function(t,e,s,n,r){return void 0===n&&(n=255),void 0===r&&(r="#"),"#"===r?"#"+((1<<24)+(t<<16)+(e<<8)+s).toString(16).slice(1):"0x"+i.Color.componentToHex(n)+i.Color.componentToHex(t)+i.Color.componentToHex(e)+i.Color.componentToHex(s)},hexToRGB:function(t){var e=i.Color.hexToColor(t);if(e)return i.Color.getColor32(e.a,e.r,e.g,e.b)},hexToColor:function(t,e){t=t.replace(/^(?:#|0x)?([a-f\d])([a-f\d])([a-f\d])$/i,function(t,e,i,s){return e+e+i+i+s+s});var s=/^(?:#|0x)?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);if(s){var n=parseInt(s[1],16),r=parseInt(s[2],16),o=parseInt(s[3],16);e?(e.r=n,e.g=r,e.b=o):e=i.Color.createColor(n,r,o)}return e},webToColor:function(t,e){e||(e=i.Color.createColor());var s=/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)$/.exec(t);return s&&(e.r=~~Number(s[1]),e.g=~~Number(s[2]),e.b=~~Number(s[3]),e.a=void 0!==s[4]?Number(s[4]):1,i.Color.updateColor(e)),e},valueToColor:function(t,e){if(e||(e=i.Color.createColor()),"string"==typeof t)return 0===t.indexOf("rgb")?i.Color.webToColor(t,e):(e.a=1,i.Color.hexToColor(t,e));if("number"==typeof t){var s=i.Color.getRGB(t);return e.r=s.r,e.g=s.g,e.b=s.b,e.a=s.a/255,e}return e},componentToHex:function(t){var e=t.toString(16);return 1===e.length?"0"+e:e},HSVColorWheel:function(t,e){void 0===t&&(t=1),void 0===e&&(e=1);for(var s=[],n=0;n<=359;n++)s.push(i.Color.HSVtoRGB(n/359,t,e));return s},HSLColorWheel:function(t,e){void 0===t&&(t=.5),void 0===e&&(e=.5);for(var s=[],n=0;n<=359;n++)s.push(i.Color.HSLtoRGB(n/359,t,e));return s},interpolateColor:function(t,e,s,n,r,o){void 0===r&&(r=255),void 0===o&&(o=0);var a=i.Color.getRGB(t),h=i.Color.getRGB(e);if(0===o)var u=(h.red-a.red)*n/s+a.red,l=(h.green-a.green)*n/s+a.green,c=(h.blue-a.blue)*n/s+a.blue;if(1===o){var d,p=i.Color.RGBtoHSV(a.r,a.g,a.b),f=i.Color.RGBtoHSV(h.r,h.g,h.b),g=f.h-p.h;if(p.h>f.h){var m=f.h;f.h=p.h,p.h=m,g=-g,n=s-n}g>.5&&(p.h=p.h+1,d=((f.h-p.h)*n/s+p.h)%1),g<=.5&&(d=(f.h-p.h)*n/s+p.h);var y=(f.s-p.s)*n/s+p.s,v=(f.v-p.v)*n/s+p.v,x=i.Color.HSVtoRGB(d,y,v,x),u=x.r,l=x.g,c=x.b}return i.Color.getColor32(r,u,l,c)},interpolateColorWithRGB:function(t,e,s,n,r,o){var a=i.Color.getRGB(t),h=(e-a.red)*o/r+a.red,u=(s-a.green)*o/r+a.green,l=(n-a.blue)*o/r+a.blue;return i.Color.getColor(h,u,l)},interpolateRGB:function(t,e,s,n,r,o,a,h){var u=(n-t)*h/a+t,l=(r-e)*h/a+e,c=(o-s)*h/a+s;return i.Color.getColor(u,l,c)},linear:function(t,e,i){return this.interpolateColor(t,e,1,i)},linearInterpolation:function(t,e){var s=i.Math.linear(0,t.length-1,e),n=t[Math.floor(s)],r=t[Math.ceil(s)];return this.linear(n,r,s%1)},getRandomColor:function(t,e,s){if(void 0===t&&(t=0),void 0===e&&(e=255),void 0===s&&(s=255),e>255||t>e)return i.Color.getColor(255,255,255);var n=t+Math.round(Math.random()*(e-t)),r=t+Math.round(Math.random()*(e-t)),o=t+Math.round(Math.random()*(e-t));return i.Color.getColor32(s,n,r,o)},getRGB:function(t){return t>16777215?{alpha:t>>>24,red:t>>16&255,green:t>>8&255,blue:255&t,a:t>>>24,r:t>>16&255,g:t>>8&255,b:255&t}:{alpha:255,red:t>>16&255,green:t>>8&255,blue:255&t,a:255,r:t>>16&255,g:t>>8&255,b:255&t}},getWebRGB:function(t){if("object"==typeof t)return"rgba("+t.r.toString()+","+t.g.toString()+","+t.b.toString()+","+(t.a/255).toString()+")";var e=i.Color.getRGB(t);return"rgba("+e.r.toString()+","+e.g.toString()+","+e.b.toString()+","+(e.a/255).toString()+")"},getAlpha:function(t){return t>>>24},getAlphaFloat:function(t){return(t>>>24)/255},getRed:function(t){return t>>16&255},getGreen:function(t){return t>>8&255},getBlue:function(t){return 255&t},blendNormal:function(t){return t},blendLighten:function(t,e){return e>t?e:t},blendDarken:function(t,e){return e>t?t:e},blendMultiply:function(t,e){return t*e/255},blendAverage:function(t,e){return(t+e)/2},blendAdd:function(t,e){return Math.min(255,t+e)},blendSubtract:function(t,e){return Math.max(0,t+e-255)},blendDifference:function(t,e){return Math.abs(t-e)},blendNegation:function(t,e){return 255-Math.abs(255-t-e)},blendScreen:function(t,e){return 255-((255-t)*(255-e)>>8)},blendExclusion:function(t,e){return t+e-2*t*e/255},blendOverlay:function(t,e){return e<128?2*t*e/255:255-2*(255-t)*(255-e)/255},blendSoftLight:function(t,e){return e<128?2*(64+(t>>1))*(e/255):255-2*(255-(64+(t>>1)))*(255-e)/255},blendHardLight:function(t,e){return i.Color.blendOverlay(e,t)},blendColorDodge:function(t,e){return 255===e?e:Math.min(255,(t<<8)/(255-e))},blendColorBurn:function(t,e){return 0===e?e:Math.max(0,255-(255-t<<8)/e)},blendLinearDodge:function(t,e){return i.Color.blendAdd(t,e)},blendLinearBurn:function(t,e){return i.Color.blendSubtract(t,e)},blendLinearLight:function(t,e){return e<128?i.Color.blendLinearBurn(t,2*e):i.Color.blendLinearDodge(t,2*(e-128))},blendVividLight:function(t,e){return e<128?i.Color.blendColorBurn(t,2*e):i.Color.blendColorDodge(t,2*(e-128))},blendPinLight:function(t,e){return e<128?i.Color.blendDarken(t,2*e):i.Color.blendLighten(t,2*(e-128))},blendHardMix:function(t,e){return i.Color.blendVividLight(t,e)<128?0:255},blendReflect:function(t,e){return 255===e?e:Math.min(255,t*t/(255-e))},blendGlow:function(t,e){return i.Color.blendReflect(e,t)},blendPhoenix:function(t,e){return Math.min(t,e)-Math.max(t,e)+255}},i.Physics=function(t,e){e=e||{},this.game=t,this.config=e,this.arcade=null,this.p2=null,this.ninja=null,this.box2d=null,this.chipmunk=null,this.matter=null,this.parseConfig()},i.Physics.ARCADE=0,i.Physics.P2JS=1,i.Physics.NINJA=2,i.Physics.BOX2D=3,i.Physics.CHIPMUNK=4,i.Physics.MATTERJS=5,i.Physics.prototype={parseConfig:function(){this.config.hasOwnProperty("arcade")&&!0!==this.config.arcade||!i.Physics.hasOwnProperty("Arcade")||(this.arcade=new i.Physics.Arcade(this.game)),this.config.hasOwnProperty("ninja")&&!0===this.config.ninja&&i.Physics.hasOwnProperty("Ninja")&&(this.ninja=new i.Physics.Ninja(this.game)),this.config.hasOwnProperty("p2")&&!0===this.config.p2&&i.Physics.hasOwnProperty("P2")&&(this.p2=new i.Physics.P2(this.game,this.config)),this.config.hasOwnProperty("box2d")&&!0===this.config.box2d&&i.Physics.hasOwnProperty("BOX2D")&&(this.box2d=new i.Physics.BOX2D(this.game,this.config)),this.config.hasOwnProperty("matter")&&!0===this.config.matter&&i.Physics.hasOwnProperty("Matter")&&(this.matter=new i.Physics.Matter(this.game,this.config))},startSystem:function(t){t===i.Physics.ARCADE?this.arcade=new i.Physics.Arcade(this.game):t===i.Physics.P2JS?null===this.p2?this.p2=new i.Physics.P2(this.game,this.config):this.p2.reset():t===i.Physics.NINJA?this.ninja=new i.Physics.Ninja(this.game):t===i.Physics.BOX2D?null===this.box2d?this.box2d=new i.Physics.Box2D(this.game,this.config):this.box2d.reset():t===i.Physics.MATTERJS&&(null===this.matter?this.matter=new i.Physics.Matter(this.game,this.config):this.matter.reset())},enable:function(t,e,s){void 0===e&&(e=i.Physics.ARCADE),void 0===s&&(s=!1),e===i.Physics.ARCADE?this.arcade.enable(t):e===i.Physics.P2JS&&this.p2?this.p2.enable(t,s):e===i.Physics.NINJA&&this.ninja?this.ninja.enableAABB(t):e===i.Physics.BOX2D&&this.box2d?this.box2d.enable(t):e===i.Physics.MATTERJS&&this.matter?this.matter.enable(t):console.warn(t.key+" is attempting to enable a physics body using an unknown physics system.")},preUpdate:function(){this.p2&&this.p2.preUpdate(),this.box2d&&this.box2d.preUpdate(),this.matter&&this.matter.preUpdate()},update:function(){this.p2&&this.p2.update(),this.box2d&&this.box2d.update(),this.matter&&this.matter.update()},setBoundsToWorld:function(){this.arcade&&this.arcade.setBoundsToWorld(),this.ninja&&this.ninja.setBoundsToWorld(),this.p2&&this.p2.setBoundsToWorld(),this.box2d&&this.box2d.setBoundsToWorld(),this.matter&&this.matter.setBoundsToWorld()},clear:function(){this.p2&&this.p2.clear(),this.box2d&&this.box2d.clear(),this.matter&&this.matter.clear()},reset:function(){this.p2&&this.p2.reset(),this.box2d&&this.box2d.reset(),this.matter&&this.matter.reset()},destroy:function(){this.p2&&this.p2.destroy(),this.box2d&&this.box2d.destroy(),this.matter&&this.matter.destroy(),this.arcade=null,this.ninja=null,this.p2=null,this.box2d=null,this.matter=null}},i.Physics.prototype.constructor=i.Physics,i.Particles=function(t){this.game=t,this.emitters={},this.ID=0},i.Particles.prototype={add:function(t){return this.emitters[t.id]=t,t},remove:function(t){delete this.emitters[t.id]}},i.Particles.prototype.constructor=i.Particles,i.Video=function(t,e,s){if(void 0===e&&(e=null),void 0===s&&(s=null),this.game=t,this.key=e,this.width=0,this.height=0,this.type=i.VIDEO,this.disableTextureUpload=!1,this.touchLocked=!1,this.onPlay=new i.Signal,this.onChangeSource=new i.Signal,this.onComplete=new i.Signal,this.onAccess=new i.Signal,this.onError=new i.Signal,this.onTimeout=new i.Signal,this.onTouchUnlock=new i.Signal,this.playWhenUnlocked=!0,this.timeout=15e3,this._timeOutID=null,this.video=null,this.videoStream=null,this.isStreaming=!1,this.retryLimit=20,this.retry=0,this.retryInterval=500,this._retryID=null,this._codeMuted=!1,this._muted=!1,this._codePaused=!1,this._paused=!1,this._pending=!1,this._pendingChangeSource=!1,this._autoplay=!1,this._endCallback=null,this._playCallback=null,e&&this.game.cache.checkVideoKey(e)){var n=this.game.cache.getVideo(e);n.isBlob?this.createVideoFromBlob(n.data):this.video=n.data,this.width=this.video.videoWidth,this.height=this.video.videoHeight}else s&&this.createVideoFromURL(s,!1);this.video&&!s?(this.baseTexture=new PIXI.BaseTexture(this.video,null,this.game.resolution),this.baseTexture.forceLoaded(this.width,this.height)):(this.baseTexture=new PIXI.BaseTexture(i.Cache.DEFAULT.baseTexture.source,null,this.game.resolution),this.baseTexture.forceLoaded(this.width,this.height)),this.texture=new PIXI.Texture(this.baseTexture),this.textureFrame=new i.Frame(0,0,0,this.width,this.height,"video"),this.texture.setFrame(this.textureFrame),this.texture.valid=!1,null!==e&&this.video&&(this.texture.valid=this.video.canplay),this.snapshot=null,i.BitmapData&&(this.snapshot=new i.BitmapData(this.game,"",this.width,this.height)),this.game.device.needsTouchUnlock()?this.setTouchLock():n&&(n.locked=!1)},i.Video.prototype={connectToMediaStream:function(t,e){return t&&e&&(this.video=t,this.videoStream=e,this.isStreaming=!0,this.baseTexture.source=this.video,this.updateTexture(null,this.video.videoWidth,this.video.videoHeight),this.onAccess.dispatch(this)),this},startMediaStream:function(t,e,i){if(void 0===t&&(t=!1),void 0===e&&(e=null),void 0===i&&(i=null),!this.game.device.getUserMedia)return this.onError.dispatch(this,"No getUserMedia"),!1;null!==this.videoStream&&(this.videoStream.active?this.videoStream.active=!1:this.videoStream.stop()),this.removeVideoElement(),this.video=document.createElement("video"),this.video.setAttribute("autoplay","autoplay"),null!==e&&(this.video.width=e),null!==i&&(this.video.height=i),this._timeOutID=window.setTimeout(this.getUserMediaTimeout.bind(this),this.timeout);try{navigator.getUserMedia({audio:t,video:!0},this.getUserMediaSuccess.bind(this),this.getUserMediaError.bind(this))}catch(t){this.getUserMediaError(t)}return this},getUserMediaTimeout:function(){clearTimeout(this._timeOutID),this.onTimeout.dispatch(this)},getUserMediaError:function(t){clearTimeout(this._timeOutID),this.onError.dispatch(this,t)},getUserMediaSuccess:function(t){clearTimeout(this._timeOutID),this.videoStream=t,void 0!==this.video.mozSrcObject?this.video.mozSrcObject=t:this.video.src=window.URL&&window.URL.createObjectURL(t)||t;var e=this;this.video.onloadeddata=function(){function t(){if(i>0)if(e.video.videoWidth>0){var s=e.video.videoWidth,n=e.video.videoHeight;isNaN(e.video.videoHeight)&&(n=s/(4/3)),e.video.play(),e.isStreaming=!0,e.baseTexture.source=e.video,e.updateTexture(null,s,n),e.onAccess.dispatch(e)}else window.setTimeout(t,500);else console.warn("Unable to connect to video stream. Webcam error?");i--}var i=10;t()}},createVideoFromBlob:function(t){var e=this;return this.video=document.createElement("video"),this.video.controls=!1,this.video.setAttribute("autoplay","autoplay"),this.video.addEventListener("loadeddata",function(t){e.updateTexture(t)},!0),this.video.src=window.URL.createObjectURL(t),this.video.canplay=!0,this},createVideoFromURL:function(t,e){return void 0===e&&(e=!1),this.texture&&(this.texture.valid=!1),this.video=document.createElement("video"),this.video.controls=!1,e&&this.video.setAttribute("autoplay","autoplay"),this.video.src=t,this.video.canplay=!0,this.video.load(),this.retry=this.retryLimit,this._retryID=window.setTimeout(this.checkVideoProgress.bind(this),this.retryInterval),this.key=t,this},updateTexture:function(t,e,i){var s=!1;void 0!==e&&null!==e||(e=this.video.videoWidth,s=!0),void 0!==i&&null!==i||(i=this.video.videoHeight),this.width=e,this.height=i,this.baseTexture.source!==this.video&&(this.baseTexture.source=this.video),this.baseTexture.forceLoaded(e,i),this.texture.frame.resize(e,i),this.texture.width=e,this.texture.height=i,this.texture.valid=!0,this.snapshot&&this.snapshot.resize(e,i),s&&null!==this.key&&(this.onChangeSource.dispatch(this,e,i),this._autoplay&&(this.video.play(),this.onPlay.dispatch(this,this.loop,this.playbackRate)))},complete:function(){this.onComplete.dispatch(this)},play:function(t,e){return this._pendingChangeSource?this:(void 0===t&&(t=!1),void 0===e&&(e=1),this.game.sound.onMute&&(this.game.sound.onMute.add(this.setMute,this),this.game.sound.onUnMute.add(this.unsetMute,this),this.game.sound.mute&&this.setMute()),this.game.onPause.add(this.setPause,this),this.game.onResume.add(this.setResume,this),this._endCallback=this.complete.bind(this),this.video.addEventListener("ended",this._endCallback,!0),this.video.addEventListener("webkitendfullscreen",this._endCallback,!0),this.video.loop=t?"loop":"",this.video.playbackRate=e,this.touchLocked?this._pending=!0:(this._pending=!1,null!==this.key&&(4!==this.video.readyState?(this.retry=this.retryLimit,this._retryID=window.setTimeout(this.checkVideoProgress.bind(this),this.retryInterval)):(this._playCallback=this.playHandler.bind(this),this.video.addEventListener("playing",this._playCallback,!0))),this.video.play(),this.onPlay.dispatch(this,t,e)),this)},playHandler:function(){this.video.removeEventListener("playing",this._playCallback,!0),this.updateTexture()},stop:function(){return this.game.sound.onMute&&(this.game.sound.onMute.remove(this.setMute,this),this.game.sound.onUnMute.remove(this.unsetMute,this)),this.game.onPause.remove(this.setPause,this),this.game.onResume.remove(this.setResume,this),this.isStreaming?(this.video.mozSrcObject?(this.video.mozSrcObject.stop(),this.video.src=null):(this.video.src="",this.videoStream.active?this.videoStream.active=!1:this.videoStream.getTracks?this.videoStream.getTracks().forEach(function(t){t.stop()}):this.videoStream.stop()),this.videoStream=null,this.isStreaming=!1):(this.video.removeEventListener("ended",this._endCallback,!0),this.video.removeEventListener("webkitendfullscreen",this._endCallback,!0),this.video.removeEventListener("playing",this._playCallback,!0),this.touchLocked?this._pending=!1:this.video.pause()),this},add:function(t){if(Array.isArray(t))for(var e=0;e<t.length;e++)t[e].loadTexture&&t[e].loadTexture(this);else t.loadTexture(this);return this},addToWorld:function(t,e,i,s,n,r){n=n||1,r=r||1;var o=this.game.add.image(t,e,this);return o.anchor.set(i,s),o.scale.set(n,r),o},render:function(){!this.disableTextureUpload&&this.playing&&this.baseTexture.dirty()},setMute:function(){this._muted||(this._muted=!0,this.video.muted=!0)},unsetMute:function(){this._muted&&!this._codeMuted&&(this._muted=!1,this.video.muted=!1)},setPause:function(){this._paused||this.touchLocked||(this._paused=!0,this.video.pause())},setResume:function(){!this._paused||this._codePaused||this.touchLocked||(this._paused=!1,this.video.ended||this.video.play())},changeSource:function(t,e){return void 0===e&&(e=!0),this.texture.valid=!1,this.video.pause(),this._pendingChangeSource=!0,this.retry=this.retryLimit,this._retryID=window.setTimeout(this.checkVideoProgress.bind(this),this.retryInterval),this.video.src=t,this.video.load(),this._autoplay=e,e||(this.paused=!0),this},checkVideoProgress:function(){4===this.video.readyState?(this._pendingChangeSource=!1,this.updateTexture()):--this.retry>0?this._retryID=window.setTimeout(this.checkVideoProgress.bind(this),this.retryInterval):console.warn("Phaser.Video: Unable to start downloading video in time",this.isStreaming)},setTouchLock:function(){this.game.input.addTouchLockCallback(this.unlock,this,!0),this.touchLocked=!0},unlock:function(){if(this.touchLocked=!1,this.playWhenUnlocked&&(this.video.play(),this.onPlay.dispatch(this,this.loop,this.playbackRate)),this.key){var t=this.game.cache.getVideo(this.key);t&&!t.isBlob&&(t.locked=!1)}return this.onTouchUnlock.dispatch(this),!0},grab:function(t,e,i){if(void 0===t&&(t=!1),void 0===e&&(e=1),void 0===i&&(i=null),null!==this.snapshot)return t&&this.snapshot.cls(),this.snapshot.copy(this.video,0,0,this.width,this.height,0,0,this.width,this.height,0,0,0,1,1,e,i),this.snapshot;console.warn("Video.grab cannot run because Phaser.BitmapData is unavailable")},removeVideoElement:function(){if(this.video){for(this.video.parentNode&&this.video.parentNode.removeChild(this.video);this.video.hasChildNodes();)this.video.removeChild(this.video.firstChild);this.video.removeAttribute("autoplay"),this.video.removeAttribute("src"),this.video=null}},destroy:function(){this.stop(),this.removeVideoElement(),this.touchLocked&&this.game.input.touch.removeTouchLockCallback(this.unlock,this),this._retryID&&window.clearTimeout(this._retryID)}},Object.defineProperty(i.Video.prototype,"currentTime",{get:function(){return this.video?this.video.currentTime:0},set:function(t){this.video.currentTime=t}}),Object.defineProperty(i.Video.prototype,"duration",{get:function(){return this.video?this.video.duration:0}}),Object.defineProperty(i.Video.prototype,"progress",{get:function(){return this.video?this.video.currentTime/this.video.duration:0}}),Object.defineProperty(i.Video.prototype,"mute",{get:function(){return this._muted},set:function(t){if(t=t||null){if(this._muted)return;this._codeMuted=!0,this.setMute()}else{if(!this._muted)return;this._codeMuted=!1,this.unsetMute()}}}),Object.defineProperty(i.Video.prototype,"paused",{get:function(){return this._paused},set:function(t){if(t=t||null,!this.touchLocked)if(t){if(this._paused)return;this._codePaused=!0,this.setPause()}else{if(!this._paused)return;this._codePaused=!1,this.setResume()}}}),Object.defineProperty(i.Video.prototype,"volume",{get:function(){return this.video?this.video.volume:1},set:function(t){t<0?t=0:t>1&&(t=1),this.video&&(this.video.volume=t)}}),Object.defineProperty(i.Video.prototype,"playbackRate",{get:function(){return this.video?this.video.playbackRate:1},set:function(t){this.video&&(this.video.playbackRate=t)}}),Object.defineProperty(i.Video.prototype,"loop",{get:function(){return!!this.video&&this.video.loop},set:function(t){t&&this.video?this.video.loop="loop":this.video&&(this.video.loop="")}}),Object.defineProperty(i.Video.prototype,"playing",{get:function(){return!!this.video&&!(this.video.paused&&this.video.ended)}}),i.Video.prototype.constructor=i.Video,void 0===PIXI.blendModes&&(PIXI.blendModes=i.blendModes),void 0===PIXI.scaleModes&&(PIXI.scaleModes=i.scaleModes),void 0===PIXI.Texture.emptyTexture&&(PIXI.Texture.emptyTexture=new PIXI.Texture(new PIXI.BaseTexture)),void 0===PIXI.DisplayObject._tempMatrix&&(PIXI.DisplayObject._tempMatrix=new i.Matrix),PIXI.TextureSilentFail=!0,PIXI.canUseNewCanvasBlendModes=function(){return i.Device.canUseMultiply},"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=i),exports.Phaser=i):"undefined"!=typeof define&&define.amd?define("Phaser",e.Phaser=i):e.Phaser=i,i}.call(this);
//# sourceMappingURL=phaser-no-physics.map
(function (workerScript) {
	try {
		var blob = new Blob (["\
var fakeIdToId = {};\
onmessage = function (event) {\
	var data = event.data,\
		name = data.name,\
		fakeId = data.fakeId,\
		time;\
	if(data.hasOwnProperty('time')) {\
		time = data.time;\
	}\
	switch (name) {\
		case 'setInterval':\
			fakeIdToId[fakeId] = setInterval(function () {\
				postMessage({fakeId: fakeId});\
			}, time);\
			break;\
		case 'clearInterval':\
			if (fakeIdToId.hasOwnProperty (fakeId)) {\
				clearInterval(fakeIdToId[fakeId]);\
				delete fakeIdToId[fakeId];\
			}\
			break;\
		case 'setTimeout':\
			fakeIdToId[fakeId] = setTimeout(function () {\
				postMessage({fakeId: fakeId});\
				if (fakeIdToId.hasOwnProperty (fakeId)) {\
					delete fakeIdToId[fakeId];\
				}\
			}, time);\
			break;\
		case 'clearTimeout':\
			if (fakeIdToId.hasOwnProperty (fakeId)) {\
				clearTimeout(fakeIdToId[fakeId]);\
				delete fakeIdToId[fakeId];\
			}\
			break;\
	}\
}\
"]);
		// Obtain a blob URL reference to our worker 'file'.
		workerScript = window.URL.createObjectURL(blob);
	} catch (error) {
		/* Blob is not supported, use external script instead */
	}
	var worker,
		fakeIdToCallback = {},
		lastFakeId = 0,
		maxFakeId = 0x7FFFFFFF, // 2 ^ 31 - 1, 31 bit, positive values of signed 32 bit integer
		logPrefix = 'HackTimer.js by turuslan: ';
	if (typeof (Worker) !== 'undefined') {
		function getFakeId () {
			do {
				if (lastFakeId == maxFakeId) {
					lastFakeId = 0;
				} else {
					lastFakeId ++;
				}
			} while (fakeIdToCallback.hasOwnProperty (lastFakeId));
			return lastFakeId;
		}
		try {
			worker = new Worker (workerScript);
			window.setInterval = function (callback, time /* , parameters */) {
				var fakeId = getFakeId ();
				fakeIdToCallback[fakeId] = {
					callback: callback,
					parameters: Array.prototype.slice.call(arguments, 2)
				};
				worker.postMessage ({
					name: 'setInterval',
					fakeId: fakeId,
					time: time
				});
				return fakeId;
			};
			window.clearInterval = function (fakeId) {
				if (fakeIdToCallback.hasOwnProperty(fakeId)) {
					delete fakeIdToCallback[fakeId];
					worker.postMessage ({
						name: 'clearInterval',
						fakeId: fakeId
					});
				}
			};
			window.setTimeout = function (callback, time /* , parameters */) {
				var fakeId = getFakeId ();
				fakeIdToCallback[fakeId] = {
					callback: callback,
					parameters: Array.prototype.slice.call(arguments, 2),
					isTimeout: true
				};
				worker.postMessage ({
					name: 'setTimeout',
					fakeId: fakeId,
					time: time
				});
				return fakeId;
			};
			window.clearTimeout = function (fakeId) {
				if (fakeIdToCallback.hasOwnProperty(fakeId)) {
					delete fakeIdToCallback[fakeId];
					worker.postMessage ({
						name: 'clearTimeout',
						fakeId: fakeId
					});
				}
			};
			worker.onmessage = function (event) {
				var data = event.data,
					fakeId = data.fakeId,
					request,
					parameters,
					callback;
				if (fakeIdToCallback.hasOwnProperty(fakeId)) {
					request = fakeIdToCallback[fakeId];
					callback = request.callback;
					parameters = request.parameters;
					if (request.hasOwnProperty ('isTimeout') && request.isTimeout) {
						delete fakeIdToCallback[fakeId];
					}
				}
				if (typeof (callback) === 'string') {
					try {
						callback = new Function (callback);
					} catch (error) {
						console.log (logPrefix + 'Error parsing callback code string: ', error);
					}
				}
				if (typeof (callback) === 'function') {
					callback.apply (window, parameters);
				}
			};
			worker.onerror = function (event) {
				console.log (event);
			};
			//console.log (logPrefix + 'Initialisation succeeded');
		} catch (error) {
			console.log (logPrefix + 'Initialisation failed');
			console.error (error);
		}
	} else {
		console.log (logPrefix + 'Initialisation failed - HTML5 Web Worker is not supported');
	}
}) ('HackTimerWorker.js');
var fakeIdToId = {};
onmessage = function (event) {
	var data = event.data,
		name = data.name,
		fakeId = data.fakeId,
		time;
	if(data.hasOwnProperty('time')) {
		time = data.time;
	}
	switch (name) {
		case 'setInterval':
			fakeIdToId[fakeId] = setInterval(function () {
				postMessage({fakeId: fakeId});
			}, time);
			break;
		case 'clearInterval':
			if (fakeIdToId.hasOwnProperty (fakeId)) {
				clearInterval(fakeIdToId[fakeId]);
				delete fakeIdToId[fakeId];
			}
			break;
		case 'setTimeout':
			fakeIdToId[fakeId] = setTimeout(function () {
				postMessage({fakeId: fakeId});
				if (fakeIdToId.hasOwnProperty (fakeId)) {
					delete fakeIdToId[fakeId];
				}
			}, time);
			break;
		case 'clearTimeout':
			if (fakeIdToId.hasOwnProperty (fakeId)) {
				clearTimeout(fakeIdToId[fakeId]);
				delete fakeIdToId[fakeId];
			}
			break;
	}
}

/*! bignumber.js v5.0.0 https://github.com/MikeMcl/bignumber.js/LICENCE */

;(function (globalObj) {
    'use strict';

    /*
      bignumber.js v5.0.0
      A JavaScript library for arbitrary-precision arithmetic.
      https://github.com/MikeMcl/bignumber.js
      Copyright (c) 2017 Michael Mclaughlin <M8ch88l@gmail.com>
      MIT Expat Licence
    */


    var BigNumber,
        isNumeric = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        mathceil = Math.ceil,
        mathfloor = Math.floor,
        notBool = ' not a boolean or binary digit',
        roundingMode = 'rounding mode',
        tooManyDigits = 'number type has more than 15 significant digits',
        ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
        BASE = 1e14,
        LOG_BASE = 14,
        MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
        // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
        POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
        SQRT_BASE = 1e7,

        /*
         * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
         * the arguments to toExponential, toFixed, toFormat, and toPrecision, beyond which an
         * exception is thrown (if ERRORS is true).
         */
        MAX = 1E9;                                   // 0 to MAX_INT32


    /*
     * Create and return a BigNumber constructor.
     */
    function constructorFactory(config) {
        var div, parseNumeric,

            // id tracks the caller function, so its name can be included in error messages.
            id = 0,
            P = BigNumber.prototype,
            ONE = new BigNumber(1),


            /********************************* EDITABLE DEFAULTS **********************************/


            /*
             * The default values below must be integers within the inclusive ranges stated.
             * The values can also be changed at run-time using BigNumber.config.
             */

            // The maximum number of decimal places for operations involving division.
            DECIMAL_PLACES = 20,                     // 0 to MAX

            /*
             * The rounding mode used when rounding to the above decimal places, and when using
             * toExponential, toFixed, toFormat and toPrecision, and round (default value).
             * UP         0 Away from zero.
             * DOWN       1 Towards zero.
             * CEIL       2 Towards +Infinity.
             * FLOOR      3 Towards -Infinity.
             * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
             * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
             * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
             * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
             * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
             */
            ROUNDING_MODE = 4,                       // 0 to 8

            // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

            // The exponent value at and beneath which toString returns exponential notation.
            // Number type: -7
            TO_EXP_NEG = -7,                         // 0 to -MAX

            // The exponent value at and above which toString returns exponential notation.
            // Number type: 21
            TO_EXP_POS = 21,                         // 0 to MAX

            // RANGE : [MIN_EXP, MAX_EXP]

            // The minimum exponent value, beneath which underflow to zero occurs.
            // Number type: -324  (5e-324)
            MIN_EXP = -1e7,                          // -1 to -MAX

            // The maximum exponent value, above which overflow to Infinity occurs.
            // Number type:  308  (1.7976931348623157e+308)
            // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
            MAX_EXP = 1e7,                           // 1 to MAX

            // Whether BigNumber Errors are ever thrown.
            ERRORS = true,                           // true or false

            // Change to intValidatorNoErrors if ERRORS is false.
            isValidInt = intValidatorWithErrors,     // intValidatorWithErrors/intValidatorNoErrors

            // Whether to use cryptographically-secure random number generation, if available.
            CRYPTO = false,                          // true or false

            /*
             * The modulo mode used when calculating the modulus: a mod n.
             * The quotient (q = a / n) is calculated according to the corresponding rounding mode.
             * The remainder (r) is calculated as: r = a - n * q.
             *
             * UP        0 The remainder is positive if the dividend is negative, else is negative.
             * DOWN      1 The remainder has the same sign as the dividend.
             *             This modulo mode is commonly known as 'truncated division' and is
             *             equivalent to (a % n) in JavaScript.
             * FLOOR     3 The remainder has the same sign as the divisor (Python %).
             * HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
             * EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
             *             The remainder is always positive.
             *
             * The truncated division, floored division, Euclidian division and IEEE 754 remainder
             * modes are commonly used for the modulus operation.
             * Although the other rounding modes can also be used, they may not give useful results.
             */
            MODULO_MODE = 1,                         // 0 to 9

            // The maximum number of significant digits of the result of the toPower operation.
            // If POW_PRECISION is 0, there will be unlimited significant digits.
            POW_PRECISION = 0,                       // 0 to MAX

            // The format specification used by the BigNumber.prototype.toFormat method.
            FORMAT = {
                decimalSeparator: '.',
                groupSeparator: ',',
                groupSize: 3,
                secondaryGroupSize: 0,
                fractionGroupSeparator: '\xA0',      // non-breaking space
                fractionGroupSize: 0
            };


        /******************************************************************************************/


        // CONSTRUCTOR


        /*
         * The BigNumber constructor and exported function.
         * Create and return a new instance of a BigNumber object.
         *
         * n {number|string|BigNumber} A numeric value.
         * [b] {number} The base of n. Integer, 2 to 64 inclusive.
         */
        function BigNumber( n, b ) {
            var c, e, i, num, len, str,
                x = this;

            // Enable constructor usage without new.
            if ( !( x instanceof BigNumber ) ) {

                // 'BigNumber() constructor call without new: {n}'
                // See GitHub issue: #81.
                //if (ERRORS) raise( 26, 'constructor call without new', n );
                return new BigNumber( n, b );
            }

            // 'new BigNumber() base not an integer: {b}'
            // 'new BigNumber() base out of range: {b}'
            if ( b == null || !isValidInt( b, 2, 64, id, 'base' ) ) {

                // Duplicate.
                if ( n instanceof BigNumber ) {
                    x.s = n.s;
                    x.e = n.e;
                    x.c = ( n = n.c ) ? n.slice() : n;
                    id = 0;
                    return;
                }

                if ( ( num = typeof n == 'number' ) && n * 0 == 0 ) {
                    x.s = 1 / n < 0 ? ( n = -n, -1 ) : 1;

                    // Fast path for integers.
                    if ( n === ~~n ) {
                        for ( e = 0, i = n; i >= 10; i /= 10, e++ );
                        x.e = e;
                        x.c = [n];
                        id = 0;
                        return;
                    }

                    str = n + '';
                } else {
                    if ( !isNumeric.test( str = n + '' ) ) return parseNumeric( x, str, num );
                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                }
            } else {
                b = b | 0;
                str = n + '';

                // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
                // Allow exponential notation to be used with base 10 argument.
                if ( b == 10 ) {
                    x = new BigNumber( n instanceof BigNumber ? n : str );
                    return round( x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE );
                }

                // Avoid potential interpretation of Infinity and NaN as base 44+ values.
                // Any number in exponential form will fail due to the [Ee][+-].
                if ( ( num = typeof n == 'number' ) && n * 0 != 0 ||
                  !( new RegExp( '^-?' + ( c = '[' + ALPHABET.slice( 0, b ) + ']+' ) +
                    '(?:\\.' + c + ')?$',b < 37 ? 'i' : '' ) ).test(str) ) {
                    return parseNumeric( x, str, num, b );
                }

                if (num) {
                    x.s = 1 / n < 0 ? ( str = str.slice(1), -1 ) : 1;

                    if ( ERRORS && str.replace( /^0\.0*|\./, '' ).length > 15 ) {

                        // 'new BigNumber() number type has more than 15 significant digits: {n}'
                        raise( id, tooManyDigits, n );
                    }

                    // Prevent later check for length on converted number.
                    num = false;
                } else {
                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                }

                str = convertBase( str, 10, b, x.s );
            }

            // Decimal point?
            if ( ( e = str.indexOf('.') ) > -1 ) str = str.replace( '.', '' );

            // Exponential form?
            if ( ( i = str.search( /e/i ) ) > 0 ) {

                // Determine exponent.
                if ( e < 0 ) e = i;
                e += +str.slice( i + 1 );
                str = str.substring( 0, i );
            } else if ( e < 0 ) {

                // Integer.
                e = str.length;
            }

            // Determine leading zeros.
            for ( i = 0; str.charCodeAt(i) === 48; i++ );

            // Determine trailing zeros.
            for ( len = str.length; str.charCodeAt(--len) === 48; );
            str = str.slice( i, len + 1 );

            if (str) {
                len = str.length;

                // Disallow numbers with over 15 significant digits if number type.
                // 'new BigNumber() number type has more than 15 significant digits: {n}'
                if ( num && ERRORS && len > 15 && ( n > MAX_SAFE_INTEGER || n !== mathfloor(n) ) ) {
                    raise( id, tooManyDigits, x.s * n );
                }

                e = e - i - 1;

                 // Overflow?
                if ( e > MAX_EXP ) {

                    // Infinity.
                    x.c = x.e = null;

                // Underflow?
                } else if ( e < MIN_EXP ) {

                    // Zero.
                    x.c = [ x.e = 0 ];
                } else {
                    x.e = e;
                    x.c = [];

                    // Transform base

                    // e is the base 10 exponent.
                    // i is where to slice str to get the first element of the coefficient array.
                    i = ( e + 1 ) % LOG_BASE;
                    if ( e < 0 ) i += LOG_BASE;

                    if ( i < len ) {
                        if (i) x.c.push( +str.slice( 0, i ) );

                        for ( len -= LOG_BASE; i < len; ) {
                            x.c.push( +str.slice( i, i += LOG_BASE ) );
                        }

                        str = str.slice(i);
                        i = LOG_BASE - str.length;
                    } else {
                        i -= len;
                    }

                    for ( ; i--; str += '0' );
                    x.c.push( +str );
                }
            } else {

                // Zero.
                x.c = [ x.e = 0 ];
            }

            id = 0;
        }


        // CONSTRUCTOR PROPERTIES


        BigNumber.another = constructorFactory;

        BigNumber.ROUND_UP = 0;
        BigNumber.ROUND_DOWN = 1;
        BigNumber.ROUND_CEIL = 2;
        BigNumber.ROUND_FLOOR = 3;
        BigNumber.ROUND_HALF_UP = 4;
        BigNumber.ROUND_HALF_DOWN = 5;
        BigNumber.ROUND_HALF_EVEN = 6;
        BigNumber.ROUND_HALF_CEIL = 7;
        BigNumber.ROUND_HALF_FLOOR = 8;
        BigNumber.EUCLID = 9;


        /*
         * Configure infrequently-changing library-wide settings.
         *
         * Accept an object or an argument list, with one or many of the following properties or
         * parameters respectively:
         *
         *   DECIMAL_PLACES  {number}  Integer, 0 to MAX inclusive
         *   ROUNDING_MODE   {number}  Integer, 0 to 8 inclusive
         *   EXPONENTIAL_AT  {number|number[]}  Integer, -MAX to MAX inclusive or
         *                                      [integer -MAX to 0 incl., 0 to MAX incl.]
         *   RANGE           {number|number[]}  Non-zero integer, -MAX to MAX inclusive or
         *                                      [integer -MAX to -1 incl., integer 1 to MAX incl.]
         *   ERRORS          {boolean|number}   true, false, 1 or 0
         *   CRYPTO          {boolean|number}   true, false, 1 or 0
         *   MODULO_MODE     {number}           0 to 9 inclusive
         *   POW_PRECISION   {number}           0 to MAX inclusive
         *   FORMAT          {object}           See BigNumber.prototype.toFormat
         *      decimalSeparator       {string}
         *      groupSeparator         {string}
         *      groupSize              {number}
         *      secondaryGroupSize     {number}
         *      fractionGroupSeparator {string}
         *      fractionGroupSize      {number}
         *
         * (The values assigned to the above FORMAT object properties are not checked for validity.)
         *
         * E.g.
         * BigNumber.config(20, 4) is equivalent to
         * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
         *
         * Ignore properties/parameters set to null or undefined.
         * Return an object with the properties current values.
         */
        BigNumber.config = BigNumber.set = function () {
            var v, p,
                i = 0,
                r = {},
                a = arguments,
                o = a[0],
                has = o && typeof o == 'object'
                  ? function () { if ( o.hasOwnProperty(p) ) return ( v = o[p] ) != null; }
                  : function () { if ( a.length > i ) return ( v = a[i++] ) != null; };

            // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
            // 'config() DECIMAL_PLACES not an integer: {v}'
            // 'config() DECIMAL_PLACES out of range: {v}'
            if ( has( p = 'DECIMAL_PLACES' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                DECIMAL_PLACES = v | 0;
            }
            r[p] = DECIMAL_PLACES;

            // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
            // 'config() ROUNDING_MODE not an integer: {v}'
            // 'config() ROUNDING_MODE out of range: {v}'
            if ( has( p = 'ROUNDING_MODE' ) && isValidInt( v, 0, 8, 2, p ) ) {
                ROUNDING_MODE = v | 0;
            }
            r[p] = ROUNDING_MODE;

            // EXPONENTIAL_AT {number|number[]}
            // Integer, -MAX to MAX inclusive or [integer -MAX to 0 inclusive, 0 to MAX inclusive].
            // 'config() EXPONENTIAL_AT not an integer: {v}'
            // 'config() EXPONENTIAL_AT out of range: {v}'
            if ( has( p = 'EXPONENTIAL_AT' ) ) {

                if ( isArray(v) ) {
                    if ( isValidInt( v[0], -MAX, 0, 2, p ) && isValidInt( v[1], 0, MAX, 2, p ) ) {
                        TO_EXP_NEG = v[0] | 0;
                        TO_EXP_POS = v[1] | 0;
                    }
                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                    TO_EXP_NEG = -( TO_EXP_POS = ( v < 0 ? -v : v ) | 0 );
                }
            }
            r[p] = [ TO_EXP_NEG, TO_EXP_POS ];

            // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
            // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
            // 'config() RANGE not an integer: {v}'
            // 'config() RANGE cannot be zero: {v}'
            // 'config() RANGE out of range: {v}'
            if ( has( p = 'RANGE' ) ) {

                if ( isArray(v) ) {
                    if ( isValidInt( v[0], -MAX, -1, 2, p ) && isValidInt( v[1], 1, MAX, 2, p ) ) {
                        MIN_EXP = v[0] | 0;
                        MAX_EXP = v[1] | 0;
                    }
                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                    if ( v | 0 ) MIN_EXP = -( MAX_EXP = ( v < 0 ? -v : v ) | 0 );
                    else if (ERRORS) raise( 2, p + ' cannot be zero', v );
                }
            }
            r[p] = [ MIN_EXP, MAX_EXP ];

            // ERRORS {boolean|number} true, false, 1 or 0.
            // 'config() ERRORS not a boolean or binary digit: {v}'
            if ( has( p = 'ERRORS' ) ) {

                if ( v === !!v || v === 1 || v === 0 ) {
                    id = 0;
                    isValidInt = ( ERRORS = !!v ) ? intValidatorWithErrors : intValidatorNoErrors;
                } else if (ERRORS) {
                    raise( 2, p + notBool, v );
                }
            }
            r[p] = ERRORS;

            // CRYPTO {boolean|number} true, false, 1 or 0.
            // 'config() CRYPTO not a boolean or binary digit: {v}'
            // 'config() crypto unavailable: {crypto}'
            if ( has( p = 'CRYPTO' ) ) {

                if ( v === true || v === false || v === 1 || v === 0 ) {
                    if (v) {
                        v = typeof crypto == 'undefined';
                        if ( !v && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                            CRYPTO = true;
                        } else if (ERRORS) {
                            raise( 2, 'crypto unavailable', v ? void 0 : crypto );
                        } else {
                            CRYPTO = false;
                        }
                    } else {
                        CRYPTO = false;
                    }
                } else if (ERRORS) {
                    raise( 2, p + notBool, v );
                }
            }
            r[p] = CRYPTO;

            // MODULO_MODE {number} Integer, 0 to 9 inclusive.
            // 'config() MODULO_MODE not an integer: {v}'
            // 'config() MODULO_MODE out of range: {v}'
            if ( has( p = 'MODULO_MODE' ) && isValidInt( v, 0, 9, 2, p ) ) {
                MODULO_MODE = v | 0;
            }
            r[p] = MODULO_MODE;

            // POW_PRECISION {number} Integer, 0 to MAX inclusive.
            // 'config() POW_PRECISION not an integer: {v}'
            // 'config() POW_PRECISION out of range: {v}'
            if ( has( p = 'POW_PRECISION' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                POW_PRECISION = v | 0;
            }
            r[p] = POW_PRECISION;

            // FORMAT {object}
            // 'config() FORMAT not an object: {v}'
            if ( has( p = 'FORMAT' ) ) {

                if ( typeof v == 'object' ) {
                    FORMAT = v;
                } else if (ERRORS) {
                    raise( 2, p + ' not an object', v );
                }
            }
            r[p] = FORMAT;

            return r;
        };


        /*
         * Return a new BigNumber whose value is the maximum of the arguments.
         *
         * arguments {number|string|BigNumber}
         */
        BigNumber.max = function () { return maxOrMin( arguments, P.lt ); };


        /*
         * Return a new BigNumber whose value is the minimum of the arguments.
         *
         * arguments {number|string|BigNumber}
         */
        BigNumber.min = function () { return maxOrMin( arguments, P.gt ); };


        /*
         * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
         * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
         * zeros are produced).
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         *
         * 'random() decimal places not an integer: {dp}'
         * 'random() decimal places out of range: {dp}'
         * 'random() crypto unavailable: {crypto}'
         */
        BigNumber.random = (function () {
            var pow2_53 = 0x20000000000000;

            // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
            // Check if Math.random() produces more than 32 bits of randomness.
            // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
            // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
            var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
              ? function () { return mathfloor( Math.random() * pow2_53 ); }
              : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
                  (Math.random() * 0x800000 | 0); };

            return function (dp) {
                var a, b, e, k, v,
                    i = 0,
                    c = [],
                    rand = new BigNumber(ONE);

                dp = dp == null || !isValidInt( dp, 0, MAX, 14 ) ? DECIMAL_PLACES : dp | 0;
                k = mathceil( dp / LOG_BASE );

                if (CRYPTO) {

                    // Browsers supporting crypto.getRandomValues.
                    if (crypto.getRandomValues) {

                        a = crypto.getRandomValues( new Uint32Array( k *= 2 ) );

                        for ( ; i < k; ) {

                            // 53 bits:
                            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
                            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
                            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
                            //                                     11111 11111111 11111111
                            // 0x20000 is 2^21.
                            v = a[i] * 0x20000 + (a[i + 1] >>> 11);

                            // Rejection sampling:
                            // 0 <= v < 9007199254740992
                            // Probability that v >= 9e15, is
                            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
                            if ( v >= 9e15 ) {
                                b = crypto.getRandomValues( new Uint32Array(2) );
                                a[i] = b[0];
                                a[i + 1] = b[1];
                            } else {

                                // 0 <= v <= 8999999999999999
                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push( v % 1e14 );
                                i += 2;
                            }
                        }
                        i = k / 2;

                    // Node.js supporting crypto.randomBytes.
                    } else if (crypto.randomBytes) {

                        // buffer
                        a = crypto.randomBytes( k *= 7 );

                        for ( ; i < k; ) {

                            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
                            // 0x100000000 is 2^32, 0x1000000 is 2^24
                            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
                            // 0 <= v < 9007199254740992
                            v = ( ( a[i] & 31 ) * 0x1000000000000 ) + ( a[i + 1] * 0x10000000000 ) +
                                  ( a[i + 2] * 0x100000000 ) + ( a[i + 3] * 0x1000000 ) +
                                  ( a[i + 4] << 16 ) + ( a[i + 5] << 8 ) + a[i + 6];

                            if ( v >= 9e15 ) {
                                crypto.randomBytes(7).copy( a, i );
                            } else {

                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push( v % 1e14 );
                                i += 7;
                            }
                        }
                        i = k / 7;
                    } else {
                        CRYPTO = false;
                        if (ERRORS) raise( 14, 'crypto unavailable', crypto );
                    }
                }

                // Use Math.random.
                if (!CRYPTO) {

                    for ( ; i < k; ) {
                        v = random53bitInt();
                        if ( v < 9e15 ) c[i++] = v % 1e14;
                    }
                }

                k = c[--i];
                dp %= LOG_BASE;

                // Convert trailing digits to zeros according to dp.
                if ( k && dp ) {
                    v = POWS_TEN[LOG_BASE - dp];
                    c[i] = mathfloor( k / v ) * v;
                }

                // Remove trailing elements which are zero.
                for ( ; c[i] === 0; c.pop(), i-- );

                // Zero?
                if ( i < 0 ) {
                    c = [ e = 0 ];
                } else {

                    // Remove leading elements which are zero and adjust exponent accordingly.
                    for ( e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

                    // Count the digits of the first element of c to determine leading zeros, and...
                    for ( i = 1, v = c[0]; v >= 10; v /= 10, i++);

                    // adjust the exponent accordingly.
                    if ( i < LOG_BASE ) e -= LOG_BASE - i;
                }

                rand.e = e;
                rand.c = c;
                return rand;
            };
        })();


        // PRIVATE FUNCTIONS


        // Convert a numeric string of baseIn to a numeric string of baseOut.
        function convertBase( str, baseOut, baseIn, sign ) {
            var d, e, k, r, x, xc, y,
                i = str.indexOf( '.' ),
                dp = DECIMAL_PLACES,
                rm = ROUNDING_MODE;

            if ( baseIn < 37 ) str = str.toLowerCase();

            // Non-integer.
            if ( i >= 0 ) {
                k = POW_PRECISION;

                // Unlimited precision.
                POW_PRECISION = 0;
                str = str.replace( '.', '' );
                y = new BigNumber(baseIn);
                x = y.pow( str.length - i );
                POW_PRECISION = k;

                // Convert str as if an integer, then restore the fraction part by dividing the
                // result by its base raised to a power.
                y.c = toBaseOut( toFixedPoint( coeffToString( x.c ), x.e ), 10, baseOut );
                y.e = y.c.length;
            }

            // Convert the number as integer.
            xc = toBaseOut( str, baseIn, baseOut );
            e = k = xc.length;

            // Remove trailing zeros.
            for ( ; xc[--k] == 0; xc.pop() );
            if ( !xc[0] ) return '0';

            if ( i < 0 ) {
                --e;
            } else {
                x.c = xc;
                x.e = e;

                // sign is needed for correct rounding.
                x.s = sign;
                x = div( x, y, dp, rm, baseOut );
                xc = x.c;
                r = x.r;
                e = x.e;
            }

            d = e + dp + 1;

            // The rounding digit, i.e. the digit to the right of the digit that may be rounded up.
            i = xc[d];
            k = baseOut / 2;
            r = r || d < 0 || xc[d + 1] != null;

            r = rm < 4 ? ( i != null || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                       : i > k || i == k &&( rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
                         rm == ( x.s < 0 ? 8 : 7 ) );

            if ( d < 1 || !xc[0] ) {

                // 1^-dp or 0.
                str = r ? toFixedPoint( '1', -dp ) : '0';
            } else {
                xc.length = d;

                if (r) {

                    // Rounding up may mean the previous digit has to be rounded up and so on.
                    for ( --baseOut; ++xc[--d] > baseOut; ) {
                        xc[d] = 0;

                        if ( !d ) {
                            ++e;
                            xc = [1].concat(xc);
                        }
                    }
                }

                // Determine trailing zeros.
                for ( k = xc.length; !xc[--k]; );

                // E.g. [4, 11, 15] becomes 4bf.
                for ( i = 0, str = ''; i <= k; str += ALPHABET.charAt( xc[i++] ) );
                str = toFixedPoint( str, e );
            }

            // The caller will add the sign.
            return str;
        }


        // Perform division in the specified base. Called by div and convertBase.
        div = (function () {

            // Assume non-zero x and k.
            function multiply( x, k, base ) {
                var m, temp, xlo, xhi,
                    carry = 0,
                    i = x.length,
                    klo = k % SQRT_BASE,
                    khi = k / SQRT_BASE | 0;

                for ( x = x.slice(); i--; ) {
                    xlo = x[i] % SQRT_BASE;
                    xhi = x[i] / SQRT_BASE | 0;
                    m = khi * xlo + xhi * klo;
                    temp = klo * xlo + ( ( m % SQRT_BASE ) * SQRT_BASE ) + carry;
                    carry = ( temp / base | 0 ) + ( m / SQRT_BASE | 0 ) + khi * xhi;
                    x[i] = temp % base;
                }

                if (carry) x = [carry].concat(x);

                return x;
            }

            function compare( a, b, aL, bL ) {
                var i, cmp;

                if ( aL != bL ) {
                    cmp = aL > bL ? 1 : -1;
                } else {

                    for ( i = cmp = 0; i < aL; i++ ) {

                        if ( a[i] != b[i] ) {
                            cmp = a[i] > b[i] ? 1 : -1;
                            break;
                        }
                    }
                }
                return cmp;
            }

            function subtract( a, b, aL, base ) {
                var i = 0;

                // Subtract b from a.
                for ( ; aL--; ) {
                    a[aL] -= i;
                    i = a[aL] < b[aL] ? 1 : 0;
                    a[aL] = i * base + a[aL] - b[aL];
                }

                // Remove leading zeros.
                for ( ; !a[0] && a.length > 1; a.splice(0, 1) );
            }

            // x: dividend, y: divisor.
            return function ( x, y, dp, rm, base ) {
                var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
                    yL, yz,
                    s = x.s == y.s ? 1 : -1,
                    xc = x.c,
                    yc = y.c;

                // Either NaN, Infinity or 0?
                if ( !xc || !xc[0] || !yc || !yc[0] ) {

                    return new BigNumber(

                      // Return NaN if either NaN, or both Infinity or 0.
                      !x.s || !y.s || ( xc ? yc && xc[0] == yc[0] : !yc ) ? NaN :

                        // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                        xc && xc[0] == 0 || !yc ? s * 0 : s / 0
                    );
                }

                q = new BigNumber(s);
                qc = q.c = [];
                e = x.e - y.e;
                s = dp + e + 1;

                if ( !base ) {
                    base = BASE;
                    e = bitFloor( x.e / LOG_BASE ) - bitFloor( y.e / LOG_BASE );
                    s = s / LOG_BASE | 0;
                }

                // Result exponent may be one less then the current value of e.
                // The coefficients of the BigNumbers from convertBase may have trailing zeros.
                for ( i = 0; yc[i] == ( xc[i] || 0 ); i++ );
                if ( yc[i] > ( xc[i] || 0 ) ) e--;

                if ( s < 0 ) {
                    qc.push(1);
                    more = true;
                } else {
                    xL = xc.length;
                    yL = yc.length;
                    i = 0;
                    s += 2;

                    // Normalise xc and yc so highest order digit of yc is >= base / 2.

                    n = mathfloor( base / ( yc[0] + 1 ) );

                    // Not necessary, but to handle odd bases where yc[0] == ( base / 2 ) - 1.
                    // if ( n > 1 || n++ == 1 && yc[0] < base / 2 ) {
                    if ( n > 1 ) {
                        yc = multiply( yc, n, base );
                        xc = multiply( xc, n, base );
                        yL = yc.length;
                        xL = xc.length;
                    }

                    xi = yL;
                    rem = xc.slice( 0, yL );
                    remL = rem.length;

                    // Add zeros to make remainder as long as divisor.
                    for ( ; remL < yL; rem[remL++] = 0 );
                    yz = yc.slice();
                    yz = [0].concat(yz);
                    yc0 = yc[0];
                    if ( yc[1] >= base / 2 ) yc0++;
                    // Not necessary, but to prevent trial digit n > base, when using base 3.
                    // else if ( base == 3 && yc0 == 1 ) yc0 = 1 + 1e-15;

                    do {
                        n = 0;

                        // Compare divisor and remainder.
                        cmp = compare( yc, rem, yL, remL );

                        // If divisor < remainder.
                        if ( cmp < 0 ) {

                            // Calculate trial digit, n.

                            rem0 = rem[0];
                            if ( yL != remL ) rem0 = rem0 * base + ( rem[1] || 0 );

                            // n is how many times the divisor goes into the current remainder.
                            n = mathfloor( rem0 / yc0 );

                            //  Algorithm:
                            //  1. product = divisor * trial digit (n)
                            //  2. if product > remainder: product -= divisor, n--
                            //  3. remainder -= product
                            //  4. if product was < remainder at 2:
                            //    5. compare new remainder and divisor
                            //    6. If remainder > divisor: remainder -= divisor, n++

                            if ( n > 1 ) {

                                // n may be > base only when base is 3.
                                if (n >= base) n = base - 1;

                                // product = divisor * trial digit.
                                prod = multiply( yc, n, base );
                                prodL = prod.length;
                                remL = rem.length;

                                // Compare product and remainder.
                                // If product > remainder.
                                // Trial digit n too high.
                                // n is 1 too high about 5% of the time, and is not known to have
                                // ever been more than 1 too high.
                                while ( compare( prod, rem, prodL, remL ) == 1 ) {
                                    n--;

                                    // Subtract divisor from product.
                                    subtract( prod, yL < prodL ? yz : yc, prodL, base );
                                    prodL = prod.length;
                                    cmp = 1;
                                }
                            } else {

                                // n is 0 or 1, cmp is -1.
                                // If n is 0, there is no need to compare yc and rem again below,
                                // so change cmp to 1 to avoid it.
                                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                                if ( n == 0 ) {

                                    // divisor < remainder, so n must be at least 1.
                                    cmp = n = 1;
                                }

                                // product = divisor
                                prod = yc.slice();
                                prodL = prod.length;
                            }

                            if ( prodL < remL ) prod = [0].concat(prod);

                            // Subtract product from remainder.
                            subtract( rem, prod, remL, base );
                            remL = rem.length;

                             // If product was < remainder.
                            if ( cmp == -1 ) {

                                // Compare divisor and new remainder.
                                // If divisor < new remainder, subtract divisor from remainder.
                                // Trial digit n too low.
                                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                                while ( compare( yc, rem, yL, remL ) < 1 ) {
                                    n++;

                                    // Subtract divisor from remainder.
                                    subtract( rem, yL < remL ? yz : yc, remL, base );
                                    remL = rem.length;
                                }
                            }
                        } else if ( cmp === 0 ) {
                            n++;
                            rem = [0];
                        } // else cmp === 1 and n will be 0

                        // Add the next digit, n, to the result array.
                        qc[i++] = n;

                        // Update the remainder.
                        if ( rem[0] ) {
                            rem[remL++] = xc[xi] || 0;
                        } else {
                            rem = [ xc[xi] ];
                            remL = 1;
                        }
                    } while ( ( xi++ < xL || rem[0] != null ) && s-- );

                    more = rem[0] != null;

                    // Leading zero?
                    if ( !qc[0] ) qc.splice(0, 1);
                }

                if ( base == BASE ) {

                    // To calculate q.e, first get the number of digits of qc[0].
                    for ( i = 1, s = qc[0]; s >= 10; s /= 10, i++ );
                    round( q, dp + ( q.e = i + e * LOG_BASE - 1 ) + 1, rm, more );

                // Caller is convertBase.
                } else {
                    q.e = e;
                    q.r = +more;
                }

                return q;
            };
        })();


        /*
         * Return a string representing the value of BigNumber n in fixed-point or exponential
         * notation rounded to the specified decimal places or significant digits.
         *
         * n is a BigNumber.
         * i is the index of the last digit required (i.e. the digit that may be rounded up).
         * rm is the rounding mode.
         * caller is caller id: toExponential 19, toFixed 20, toFormat 21, toPrecision 24.
         */
        function format( n, i, rm, caller ) {
            var c0, e, ne, len, str;

            rm = rm != null && isValidInt( rm, 0, 8, caller, roundingMode )
              ? rm | 0 : ROUNDING_MODE;

            if ( !n.c ) return n.toString();
            c0 = n.c[0];
            ne = n.e;

            if ( i == null ) {
                str = coeffToString( n.c );
                str = caller == 19 || caller == 24 && ne <= TO_EXP_NEG
                  ? toExponential( str, ne )
                  : toFixedPoint( str, ne );
            } else {
                n = round( new BigNumber(n), i, rm );

                // n.e may have changed if the value was rounded up.
                e = n.e;

                str = coeffToString( n.c );
                len = str.length;

                // toPrecision returns exponential notation if the number of significant digits
                // specified is less than the number of digits necessary to represent the integer
                // part of the value in fixed-point notation.

                // Exponential notation.
                if ( caller == 19 || caller == 24 && ( i <= e || e <= TO_EXP_NEG ) ) {

                    // Append zeros?
                    for ( ; len < i; str += '0', len++ );
                    str = toExponential( str, e );

                // Fixed-point notation.
                } else {
                    i -= ne;
                    str = toFixedPoint( str, e );

                    // Append zeros?
                    if ( e + 1 > len ) {
                        if ( --i > 0 ) for ( str += '.'; i--; str += '0' );
                    } else {
                        i += e - len;
                        if ( i > 0 ) {
                            if ( e + 1 == len ) str += '.';
                            for ( ; i--; str += '0' );
                        }
                    }
                }
            }

            return n.s < 0 && c0 ? '-' + str : str;
        }


        // Handle BigNumber.max and BigNumber.min.
        function maxOrMin( args, method ) {
            var m, n,
                i = 0;

            if ( isArray( args[0] ) ) args = args[0];
            m = new BigNumber( args[0] );

            for ( ; ++i < args.length; ) {
                n = new BigNumber( args[i] );

                // If any number is NaN, return NaN.
                if ( !n.s ) {
                    m = n;
                    break;
                } else if ( method.call( m, n ) ) {
                    m = n;
                }
            }

            return m;
        }


        /*
         * Return true if n is an integer in range, otherwise throw.
         * Use for argument validation when ERRORS is true.
         */
        function intValidatorWithErrors( n, min, max, caller, name ) {
            if ( n < min || n > max || n != truncate(n) ) {
                raise( caller, ( name || 'decimal places' ) +
                  ( n < min || n > max ? ' out of range' : ' not an integer' ), n );
            }

            return true;
        }


        /*
         * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
         * Called by minus, plus and times.
         */
        function normalise( n, c, e ) {
            var i = 1,
                j = c.length;

             // Remove trailing zeros.
            for ( ; !c[--j]; c.pop() );

            // Calculate the base 10 exponent. First get the number of digits of c[0].
            for ( j = c[0]; j >= 10; j /= 10, i++ );

            // Overflow?
            if ( ( e = i + e * LOG_BASE - 1 ) > MAX_EXP ) {

                // Infinity.
                n.c = n.e = null;

            // Underflow?
            } else if ( e < MIN_EXP ) {

                // Zero.
                n.c = [ n.e = 0 ];
            } else {
                n.e = e;
                n.c = c;
            }

            return n;
        }


        // Handle values that fail the validity test in BigNumber.
        parseNumeric = (function () {
            var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
                dotAfter = /^([^.]+)\.$/,
                dotBefore = /^\.([^.]+)$/,
                isInfinityOrNaN = /^-?(Infinity|NaN)$/,
                whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

            return function ( x, str, num, b ) {
                var base,
                    s = num ? str : str.replace( whitespaceOrPlus, '' );

                // No exception on ±Infinity or NaN.
                if ( isInfinityOrNaN.test(s) ) {
                    x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
                } else {
                    if ( !num ) {

                        // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
                        s = s.replace( basePrefix, function ( m, p1, p2 ) {
                            base = ( p2 = p2.toLowerCase() ) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
                            return !b || b == base ? p1 : m;
                        });

                        if (b) {
                            base = b;

                            // E.g. '1.' to '1', '.1' to '0.1'
                            s = s.replace( dotAfter, '$1' ).replace( dotBefore, '0.$1' );
                        }

                        if ( str != s ) return new BigNumber( s, base );
                    }

                    // 'new BigNumber() not a number: {n}'
                    // 'new BigNumber() not a base {b} number: {n}'
                    if (ERRORS) raise( id, 'not a' + ( b ? ' base ' + b : '' ) + ' number', str );
                    x.s = null;
                }

                x.c = x.e = null;
                id = 0;
            }
        })();


        // Throw a BigNumber Error.
        function raise( caller, msg, val ) {
            var error = new Error( [
                'new BigNumber',     // 0
                'cmp',               // 1
                'config',            // 2
                'div',               // 3
                'divToInt',          // 4
                'eq',                // 5
                'gt',                // 6
                'gte',               // 7
                'lt',                // 8
                'lte',               // 9
                'minus',             // 10
                'mod',               // 11
                'plus',              // 12
                'precision',         // 13
                'random',            // 14
                'round',             // 15
                'shift',             // 16
                'times',             // 17
                'toDigits',          // 18
                'toExponential',     // 19
                'toFixed',           // 20
                'toFormat',          // 21
                'toFraction',        // 22
                'pow',               // 23
                'toPrecision',       // 24
                'toString',          // 25
                'BigNumber'          // 26
            ][caller] + '() ' + msg + ': ' + val );

            error.name = 'BigNumber Error';
            id = 0;
            throw error;
        }


        /*
         * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
         * If r is truthy, it is known that there are more digits after the rounding digit.
         */
        function round( x, sd, rm, r ) {
            var d, i, j, k, n, ni, rd,
                xc = x.c,
                pows10 = POWS_TEN;

            // if x is not Infinity or NaN...
            if (xc) {

                // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
                // n is a base 1e14 number, the value of the element of array x.c containing rd.
                // ni is the index of n within x.c.
                // d is the number of digits of n.
                // i is the index of rd within n including leading zeros.
                // j is the actual index of rd within n (if < 0, rd is a leading zero).
                out: {

                    // Get the number of digits of the first element of xc.
                    for ( d = 1, k = xc[0]; k >= 10; k /= 10, d++ );
                    i = sd - d;

                    // If the rounding digit is in the first element of xc...
                    if ( i < 0 ) {
                        i += LOG_BASE;
                        j = sd;
                        n = xc[ ni = 0 ];

                        // Get the rounding digit at index j of n.
                        rd = n / pows10[ d - j - 1 ] % 10 | 0;
                    } else {
                        ni = mathceil( ( i + 1 ) / LOG_BASE );

                        if ( ni >= xc.length ) {

                            if (r) {

                                // Needed by sqrt.
                                for ( ; xc.length <= ni; xc.push(0) );
                                n = rd = 0;
                                d = 1;
                                i %= LOG_BASE;
                                j = i - LOG_BASE + 1;
                            } else {
                                break out;
                            }
                        } else {
                            n = k = xc[ni];

                            // Get the number of digits of n.
                            for ( d = 1; k >= 10; k /= 10, d++ );

                            // Get the index of rd within n.
                            i %= LOG_BASE;

                            // Get the index of rd within n, adjusted for leading zeros.
                            // The number of leading zeros of n is given by LOG_BASE - d.
                            j = i - LOG_BASE + d;

                            // Get the rounding digit at index j of n.
                            rd = j < 0 ? 0 : n / pows10[ d - j - 1 ] % 10 | 0;
                        }
                    }

                    r = r || sd < 0 ||

                    // Are there any non-zero digits after the rounding digit?
                    // The expression  n % pows10[ d - j - 1 ]  returns all digits of n to the right
                    // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
                      xc[ni + 1] != null || ( j < 0 ? n : n % pows10[ d - j - 1 ] );

                    r = rm < 4
                      ? ( rd || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                      : rd > 5 || rd == 5 && ( rm == 4 || r || rm == 6 &&

                        // Check whether the digit to the left of the rounding digit is odd.
                        ( ( i > 0 ? j > 0 ? n / pows10[ d - j ] : 0 : xc[ni - 1] ) % 10 ) & 1 ||
                          rm == ( x.s < 0 ? 8 : 7 ) );

                    if ( sd < 1 || !xc[0] ) {
                        xc.length = 0;

                        if (r) {

                            // Convert sd to decimal places.
                            sd -= x.e + 1;

                            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                            xc[0] = pows10[ ( LOG_BASE - sd % LOG_BASE ) % LOG_BASE ];
                            x.e = -sd || 0;
                        } else {

                            // Zero.
                            xc[0] = x.e = 0;
                        }

                        return x;
                    }

                    // Remove excess digits.
                    if ( i == 0 ) {
                        xc.length = ni;
                        k = 1;
                        ni--;
                    } else {
                        xc.length = ni + 1;
                        k = pows10[ LOG_BASE - i ];

                        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
                        // j > 0 means i > number of leading zeros of n.
                        xc[ni] = j > 0 ? mathfloor( n / pows10[ d - j ] % pows10[j] ) * k : 0;
                    }

                    // Round up?
                    if (r) {

                        for ( ; ; ) {

                            // If the digit to be rounded up is in the first element of xc...
                            if ( ni == 0 ) {

                                // i will be the length of xc[0] before k is added.
                                for ( i = 1, j = xc[0]; j >= 10; j /= 10, i++ );
                                j = xc[0] += k;
                                for ( k = 1; j >= 10; j /= 10, k++ );

                                // if i != k the length has increased.
                                if ( i != k ) {
                                    x.e++;
                                    if ( xc[0] == BASE ) xc[0] = 1;
                                }

                                break;
                            } else {
                                xc[ni] += k;
                                if ( xc[ni] != BASE ) break;
                                xc[ni--] = 0;
                                k = 1;
                            }
                        }
                    }

                    // Remove trailing zeros.
                    for ( i = xc.length; xc[--i] === 0; xc.pop() );
                }

                // Overflow? Infinity.
                if ( x.e > MAX_EXP ) {
                    x.c = x.e = null;

                // Underflow? Zero.
                } else if ( x.e < MIN_EXP ) {
                    x.c = [ x.e = 0 ];
                }
            }

            return x;
        }


        // PROTOTYPE/INSTANCE METHODS


        /*
         * Return a new BigNumber whose value is the absolute value of this BigNumber.
         */
        P.absoluteValue = P.abs = function () {
            var x = new BigNumber(this);
            if ( x.s < 0 ) x.s = 1;
            return x;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of Infinity.
         */
        P.ceil = function () {
            return round( new BigNumber(this), this.e + 1, 2 );
        };


        /*
         * Return
         * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
         * 0 if they have the same value,
         * or null if the value of either is NaN.
         */
        P.comparedTo = P.cmp = function ( y, b ) {
            id = 1;
            return compare( this, new BigNumber( y, b ) );
        };


        /*
         * Return the number of decimal places of the value of this BigNumber, or null if the value
         * of this BigNumber is ±Infinity or NaN.
         */
        P.decimalPlaces = P.dp = function () {
            var n, v,
                c = this.c;

            if ( !c ) return null;
            n = ( ( v = c.length - 1 ) - bitFloor( this.e / LOG_BASE ) ) * LOG_BASE;

            // Subtract the number of trailing zeros of the last number.
            if ( v = c[v] ) for ( ; v % 10 == 0; v /= 10, n-- );
            if ( n < 0 ) n = 0;

            return n;
        };


        /*
         *  n / 0 = I
         *  n / N = N
         *  n / I = 0
         *  0 / n = 0
         *  0 / 0 = N
         *  0 / N = N
         *  0 / I = 0
         *  N / n = N
         *  N / 0 = N
         *  N / N = N
         *  N / I = N
         *  I / n = I
         *  I / 0 = I
         *  I / N = N
         *  I / I = N
         *
         * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
         * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
         */
        P.dividedBy = P.div = function ( y, b ) {
            id = 3;
            return div( this, new BigNumber( y, b ), DECIMAL_PLACES, ROUNDING_MODE );
        };


        /*
         * Return a new BigNumber whose value is the integer part of dividing the value of this
         * BigNumber by the value of BigNumber(y, b).
         */
        P.dividedToIntegerBy = P.divToInt = function ( y, b ) {
            id = 4;
            return div( this, new BigNumber( y, b ), 0, 1 );
        };


        /*
         * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.equals = P.eq = function ( y, b ) {
            id = 5;
            return compare( this, new BigNumber( y, b ) ) === 0;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of -Infinity.
         */
        P.floor = function () {
            return round( new BigNumber(this), this.e + 1, 3 );
        };


        /*
         * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.greaterThan = P.gt = function ( y, b ) {
            id = 6;
            return compare( this, new BigNumber( y, b ) ) > 0;
        };


        /*
         * Return true if the value of this BigNumber is greater than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */
        P.greaterThanOrEqualTo = P.gte = function ( y, b ) {
            id = 7;
            return ( b = compare( this, new BigNumber( y, b ) ) ) === 1 || b === 0;

        };


        /*
         * Return true if the value of this BigNumber is a finite number, otherwise returns false.
         */
        P.isFinite = function () {
            return !!this.c;
        };


        /*
         * Return true if the value of this BigNumber is an integer, otherwise return false.
         */
        P.isInteger = P.isInt = function () {
            return !!this.c && bitFloor( this.e / LOG_BASE ) > this.c.length - 2;
        };


        /*
         * Return true if the value of this BigNumber is NaN, otherwise returns false.
         */
        P.isNaN = function () {
            return !this.s;
        };


        /*
         * Return true if the value of this BigNumber is negative, otherwise returns false.
         */
        P.isNegative = P.isNeg = function () {
            return this.s < 0;
        };


        /*
         * Return true if the value of this BigNumber is 0 or -0, otherwise returns false.
         */
        P.isZero = function () {
            return !!this.c && this.c[0] == 0;
        };


        /*
         * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.lessThan = P.lt = function ( y, b ) {
            id = 8;
            return compare( this, new BigNumber( y, b ) ) < 0;
        };


        /*
         * Return true if the value of this BigNumber is less than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */
        P.lessThanOrEqualTo = P.lte = function ( y, b ) {
            id = 9;
            return ( b = compare( this, new BigNumber( y, b ) ) ) === -1 || b === 0;
        };


        /*
         *  n - 0 = n
         *  n - N = N
         *  n - I = -I
         *  0 - n = -n
         *  0 - 0 = 0
         *  0 - N = N
         *  0 - I = -I
         *  N - n = N
         *  N - 0 = N
         *  N - N = N
         *  N - I = N
         *  I - n = I
         *  I - 0 = I
         *  I - N = N
         *  I - I = N
         *
         * Return a new BigNumber whose value is the value of this BigNumber minus the value of
         * BigNumber(y, b).
         */
        P.minus = P.sub = function ( y, b ) {
            var i, j, t, xLTy,
                x = this,
                a = x.s;

            id = 10;
            y = new BigNumber( y, b );
            b = y.s;

            // Either NaN?
            if ( !a || !b ) return new BigNumber(NaN);

            // Signs differ?
            if ( a != b ) {
                y.s = -b;
                return x.plus(y);
            }

            var xe = x.e / LOG_BASE,
                ye = y.e / LOG_BASE,
                xc = x.c,
                yc = y.c;

            if ( !xe || !ye ) {

                // Either Infinity?
                if ( !xc || !yc ) return xc ? ( y.s = -b, y ) : new BigNumber( yc ? x : NaN );

                // Either zero?
                if ( !xc[0] || !yc[0] ) {

                    // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                    return yc[0] ? ( y.s = -b, y ) : new BigNumber( xc[0] ? x :

                      // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                      ROUNDING_MODE == 3 ? -0 : 0 );
                }
            }

            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();

            // Determine which is the bigger number.
            if ( a = xe - ye ) {

                if ( xLTy = a < 0 ) {
                    a = -a;
                    t = xc;
                } else {
                    ye = xe;
                    t = yc;
                }

                t.reverse();

                // Prepend zeros to equalise exponents.
                for ( b = a; b--; t.push(0) );
                t.reverse();
            } else {

                // Exponents equal. Check digit by digit.
                j = ( xLTy = ( a = xc.length ) < ( b = yc.length ) ) ? a : b;

                for ( a = b = 0; b < j; b++ ) {

                    if ( xc[b] != yc[b] ) {
                        xLTy = xc[b] < yc[b];
                        break;
                    }
                }
            }

            // x < y? Point xc to the array of the bigger number.
            if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

            b = ( j = yc.length ) - ( i = xc.length );

            // Append zeros to xc if shorter.
            // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
            if ( b > 0 ) for ( ; b--; xc[i++] = 0 );
            b = BASE - 1;

            // Subtract yc from xc.
            for ( ; j > a; ) {

                if ( xc[--j] < yc[j] ) {
                    for ( i = j; i && !xc[--i]; xc[i] = b );
                    --xc[i];
                    xc[j] += BASE;
                }

                xc[j] -= yc[j];
            }

            // Remove leading zeros and adjust exponent accordingly.
            for ( ; xc[0] == 0; xc.splice(0, 1), --ye );

            // Zero?
            if ( !xc[0] ) {

                // Following IEEE 754 (2008) 6.3,
                // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
                y.s = ROUNDING_MODE == 3 ? -1 : 1;
                y.c = [ y.e = 0 ];
                return y;
            }

            // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
            // for finite x and y.
            return normalise( y, xc, ye );
        };


        /*
         *   n % 0 =  N
         *   n % N =  N
         *   n % I =  n
         *   0 % n =  0
         *  -0 % n = -0
         *   0 % 0 =  N
         *   0 % N =  N
         *   0 % I =  0
         *   N % n =  N
         *   N % 0 =  N
         *   N % N =  N
         *   N % I =  N
         *   I % n =  N
         *   I % 0 =  N
         *   I % N =  N
         *   I % I =  N
         *
         * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
         * BigNumber(y, b). The result depends on the value of MODULO_MODE.
         */
        P.modulo = P.mod = function ( y, b ) {
            var q, s,
                x = this;

            id = 11;
            y = new BigNumber( y, b );

            // Return NaN if x is Infinity or NaN, or y is NaN or zero.
            if ( !x.c || !y.s || y.c && !y.c[0] ) {
                return new BigNumber(NaN);

            // Return x if y is Infinity or x is zero.
            } else if ( !y.c || x.c && !x.c[0] ) {
                return new BigNumber(x);
            }

            if ( MODULO_MODE == 9 ) {

                // Euclidian division: q = sign(y) * floor(x / abs(y))
                // r = x - qy    where  0 <= r < abs(y)
                s = y.s;
                y.s = 1;
                q = div( x, y, 0, 3 );
                y.s = s;
                q.s *= s;
            } else {
                q = div( x, y, 0, MODULO_MODE );
            }

            return x.minus( q.times(y) );
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber negated,
         * i.e. multiplied by -1.
         */
        P.negated = P.neg = function () {
            var x = new BigNumber(this);
            x.s = -x.s || null;
            return x;
        };


        /*
         *  n + 0 = n
         *  n + N = N
         *  n + I = I
         *  0 + n = n
         *  0 + 0 = 0
         *  0 + N = N
         *  0 + I = I
         *  N + n = N
         *  N + 0 = N
         *  N + N = N
         *  N + I = N
         *  I + n = I
         *  I + 0 = I
         *  I + N = N
         *  I + I = I
         *
         * Return a new BigNumber whose value is the value of this BigNumber plus the value of
         * BigNumber(y, b).
         */
        P.plus = P.add = function ( y, b ) {
            var t,
                x = this,
                a = x.s;

            id = 12;
            y = new BigNumber( y, b );
            b = y.s;

            // Either NaN?
            if ( !a || !b ) return new BigNumber(NaN);

            // Signs differ?
             if ( a != b ) {
                y.s = -b;
                return x.minus(y);
            }

            var xe = x.e / LOG_BASE,
                ye = y.e / LOG_BASE,
                xc = x.c,
                yc = y.c;

            if ( !xe || !ye ) {

                // Return ±Infinity if either ±Infinity.
                if ( !xc || !yc ) return new BigNumber( a / 0 );

                // Either zero?
                // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                if ( !xc[0] || !yc[0] ) return yc[0] ? y : new BigNumber( xc[0] ? x : a * 0 );
            }

            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();

            // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
            if ( a = xe - ye ) {
                if ( a > 0 ) {
                    ye = xe;
                    t = yc;
                } else {
                    a = -a;
                    t = xc;
                }

                t.reverse();
                for ( ; a--; t.push(0) );
                t.reverse();
            }

            a = xc.length;
            b = yc.length;

            // Point xc to the longer array, and b to the shorter length.
            if ( a - b < 0 ) t = yc, yc = xc, xc = t, b = a;

            // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
            for ( a = 0; b; ) {
                a = ( xc[--b] = xc[b] + yc[b] + a ) / BASE | 0;
                xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
            }

            if (a) {
                xc = [a].concat(xc);
                ++ye;
            }

            // No need to check for zero, as +x + +y != 0 && -x + -y != 0
            // ye = MAX_EXP + 1 possible
            return normalise( y, xc, ye );
        };


        /*
         * Return the number of significant digits of the value of this BigNumber.
         *
         * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
         */
        P.precision = P.sd = function (z) {
            var n, v,
                x = this,
                c = x.c;

            // 'precision() argument not a boolean or binary digit: {z}'
            if ( z != null && z !== !!z && z !== 1 && z !== 0 ) {
                if (ERRORS) raise( 13, 'argument' + notBool, z );
                if ( z != !!z ) z = null;
            }

            if ( !c ) return null;
            v = c.length - 1;
            n = v * LOG_BASE + 1;

            if ( v = c[v] ) {

                // Subtract the number of trailing zeros of the last element.
                for ( ; v % 10 == 0; v /= 10, n-- );

                // Add the number of digits of the first element.
                for ( v = c[0]; v >= 10; v /= 10, n++ );
            }

            if ( z && x.e + 1 > n ) n = x.e + 1;

            return n;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
         * dp decimal places using rounding mode rm, or to 0 and ROUNDING_MODE respectively if
         * omitted.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'round() decimal places out of range: {dp}'
         * 'round() decimal places not an integer: {dp}'
         * 'round() rounding mode not an integer: {rm}'
         * 'round() rounding mode out of range: {rm}'
         */
        P.round = function ( dp, rm ) {
            var n = new BigNumber(this);

            if ( dp == null || isValidInt( dp, 0, MAX, 15 ) ) {
                round( n, ~~dp + this.e + 1, rm == null ||
                  !isValidInt( rm, 0, 8, 15, roundingMode ) ? ROUNDING_MODE : rm | 0 );
            }

            return n;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
         * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
         *
         * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
         *
         * If k is out of range and ERRORS is false, the result will be ±0 if k < 0, or ±Infinity
         * otherwise.
         *
         * 'shift() argument not an integer: {k}'
         * 'shift() argument out of range: {k}'
         */
        P.shift = function (k) {
            var n = this;
            return isValidInt( k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 16, 'argument' )

              // k < 1e+21, or truncate(k) will produce exponential notation.
              ? n.times( '1e' + truncate(k) )
              : new BigNumber( n.c && n.c[0] && ( k < -MAX_SAFE_INTEGER || k > MAX_SAFE_INTEGER )
                ? n.s * ( k < 0 ? 0 : 1 / 0 )
                : n );
        };


        /*
         *  sqrt(-n) =  N
         *  sqrt( N) =  N
         *  sqrt(-I) =  N
         *  sqrt( I) =  I
         *  sqrt( 0) =  0
         *  sqrt(-0) = -0
         *
         * Return a new BigNumber whose value is the square root of the value of this BigNumber,
         * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
         */
        P.squareRoot = P.sqrt = function () {
            var m, n, r, rep, t,
                x = this,
                c = x.c,
                s = x.s,
                e = x.e,
                dp = DECIMAL_PLACES + 4,
                half = new BigNumber('0.5');

            // Negative/NaN/Infinity/zero?
            if ( s !== 1 || !c || !c[0] ) {
                return new BigNumber( !s || s < 0 && ( !c || c[0] ) ? NaN : c ? x : 1 / 0 );
            }

            // Initial estimate.
            s = Math.sqrt( +x );

            // Math.sqrt underflow/overflow?
            // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
            if ( s == 0 || s == 1 / 0 ) {
                n = coeffToString(c);
                if ( ( n.length + e ) % 2 == 0 ) n += '0';
                s = Math.sqrt(n);
                e = bitFloor( ( e + 1 ) / 2 ) - ( e < 0 || e % 2 );

                if ( s == 1 / 0 ) {
                    n = '1e' + e;
                } else {
                    n = s.toExponential();
                    n = n.slice( 0, n.indexOf('e') + 1 ) + e;
                }

                r = new BigNumber(n);
            } else {
                r = new BigNumber( s + '' );
            }

            // Check for zero.
            // r could be zero if MIN_EXP is changed after the this value was created.
            // This would cause a division by zero (x/t) and hence Infinity below, which would cause
            // coeffToString to throw.
            if ( r.c[0] ) {
                e = r.e;
                s = e + dp;
                if ( s < 3 ) s = 0;

                // Newton-Raphson iteration.
                for ( ; ; ) {
                    t = r;
                    r = half.times( t.plus( div( x, t, dp, 1 ) ) );

                    if ( coeffToString( t.c   ).slice( 0, s ) === ( n =
                         coeffToString( r.c ) ).slice( 0, s ) ) {

                        // The exponent of r may here be one less than the final result exponent,
                        // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
                        // are indexed correctly.
                        if ( r.e < e ) --s;
                        n = n.slice( s - 3, s + 1 );

                        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
                        // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
                        // iteration.
                        if ( n == '9999' || !rep && n == '4999' ) {

                            // On the first iteration only, check to see if rounding up gives the
                            // exact result as the nines may infinitely repeat.
                            if ( !rep ) {
                                round( t, t.e + DECIMAL_PLACES + 2, 0 );

                                if ( t.times(t).eq(x) ) {
                                    r = t;
                                    break;
                                }
                            }

                            dp += 4;
                            s += 4;
                            rep = 1;
                        } else {

                            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
                            // result. If not, then there are further digits and m will be truthy.
                            if ( !+n || !+n.slice(1) && n.charAt(0) == '5' ) {

                                // Truncate to the first rounding digit.
                                round( r, r.e + DECIMAL_PLACES + 2, 1 );
                                m = !r.times(r).eq(x);
                            }

                            break;
                        }
                    }
                }
            }

            return round( r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m );
        };


        /*
         *  n * 0 = 0
         *  n * N = N
         *  n * I = I
         *  0 * n = 0
         *  0 * 0 = 0
         *  0 * N = N
         *  0 * I = N
         *  N * n = N
         *  N * 0 = N
         *  N * N = N
         *  N * I = N
         *  I * n = I
         *  I * 0 = N
         *  I * N = N
         *  I * I = I
         *
         * Return a new BigNumber whose value is the value of this BigNumber times the value of
         * BigNumber(y, b).
         */
        P.times = P.mul = function ( y, b ) {
            var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
                base, sqrtBase,
                x = this,
                xc = x.c,
                yc = ( id = 17, y = new BigNumber( y, b ) ).c;

            // Either NaN, ±Infinity or ±0?
            if ( !xc || !yc || !xc[0] || !yc[0] ) {

                // Return NaN if either is NaN, or one is 0 and the other is Infinity.
                if ( !x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc ) {
                    y.c = y.e = y.s = null;
                } else {
                    y.s *= x.s;

                    // Return ±Infinity if either is ±Infinity.
                    if ( !xc || !yc ) {
                        y.c = y.e = null;

                    // Return ±0 if either is ±0.
                    } else {
                        y.c = [0];
                        y.e = 0;
                    }
                }

                return y;
            }

            e = bitFloor( x.e / LOG_BASE ) + bitFloor( y.e / LOG_BASE );
            y.s *= x.s;
            xcL = xc.length;
            ycL = yc.length;

            // Ensure xc points to longer array and xcL to its length.
            if ( xcL < ycL ) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

            // Initialise the result array with zeros.
            for ( i = xcL + ycL, zc = []; i--; zc.push(0) );

            base = BASE;
            sqrtBase = SQRT_BASE;

            for ( i = ycL; --i >= 0; ) {
                c = 0;
                ylo = yc[i] % sqrtBase;
                yhi = yc[i] / sqrtBase | 0;

                for ( k = xcL, j = i + k; j > i; ) {
                    xlo = xc[--k] % sqrtBase;
                    xhi = xc[k] / sqrtBase | 0;
                    m = yhi * xlo + xhi * ylo;
                    xlo = ylo * xlo + ( ( m % sqrtBase ) * sqrtBase ) + zc[j] + c;
                    c = ( xlo / base | 0 ) + ( m / sqrtBase | 0 ) + yhi * xhi;
                    zc[j--] = xlo % base;
                }

                zc[j] = c;
            }

            if (c) {
                ++e;
            } else {
                zc.splice(0, 1);
            }

            return normalise( y, zc, e );
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
         * sd significant digits using rounding mode rm, or ROUNDING_MODE if rm is omitted.
         *
         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toDigits() precision out of range: {sd}'
         * 'toDigits() precision not an integer: {sd}'
         * 'toDigits() rounding mode not an integer: {rm}'
         * 'toDigits() rounding mode out of range: {rm}'
         */
        P.toDigits = function ( sd, rm ) {
            var n = new BigNumber(this);
            sd = sd == null || !isValidInt( sd, 1, MAX, 18, 'precision' ) ? null : sd | 0;
            rm = rm == null || !isValidInt( rm, 0, 8, 18, roundingMode ) ? ROUNDING_MODE : rm | 0;
            return sd ? round( n, sd, rm ) : n;
        };


        /*
         * Return a string representing the value of this BigNumber in exponential notation and
         * rounded using ROUNDING_MODE to dp fixed decimal places.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toExponential() decimal places not an integer: {dp}'
         * 'toExponential() decimal places out of range: {dp}'
         * 'toExponential() rounding mode not an integer: {rm}'
         * 'toExponential() rounding mode out of range: {rm}'
         */
        P.toExponential = function ( dp, rm ) {
            return format( this,
              dp != null && isValidInt( dp, 0, MAX, 19 ) ? ~~dp + 1 : null, rm, 19 );
        };


        /*
         * Return a string representing the value of this BigNumber in fixed-point notation rounding
         * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
         *
         * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
         * but e.g. (-0.00001).toFixed(0) is '-0'.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toFixed() decimal places not an integer: {dp}'
         * 'toFixed() decimal places out of range: {dp}'
         * 'toFixed() rounding mode not an integer: {rm}'
         * 'toFixed() rounding mode out of range: {rm}'
         */
        P.toFixed = function ( dp, rm ) {
            return format( this, dp != null && isValidInt( dp, 0, MAX, 20 )
              ? ~~dp + this.e + 1 : null, rm, 20 );
        };


        /*
         * Return a string representing the value of this BigNumber in fixed-point notation rounded
         * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
         * of the FORMAT object (see BigNumber.config).
         *
         * FORMAT = {
         *      decimalSeparator : '.',
         *      groupSeparator : ',',
         *      groupSize : 3,
         *      secondaryGroupSize : 0,
         *      fractionGroupSeparator : '\xA0',    // non-breaking space
         *      fractionGroupSize : 0
         * };
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toFormat() decimal places not an integer: {dp}'
         * 'toFormat() decimal places out of range: {dp}'
         * 'toFormat() rounding mode not an integer: {rm}'
         * 'toFormat() rounding mode out of range: {rm}'
         */
        P.toFormat = function ( dp, rm ) {
            var str = format( this, dp != null && isValidInt( dp, 0, MAX, 21 )
              ? ~~dp + this.e + 1 : null, rm, 21 );

            if ( this.c ) {
                var i,
                    arr = str.split('.'),
                    g1 = +FORMAT.groupSize,
                    g2 = +FORMAT.secondaryGroupSize,
                    groupSeparator = FORMAT.groupSeparator,
                    intPart = arr[0],
                    fractionPart = arr[1],
                    isNeg = this.s < 0,
                    intDigits = isNeg ? intPart.slice(1) : intPart,
                    len = intDigits.length;

                if (g2) i = g1, g1 = g2, g2 = i, len -= i;

                if ( g1 > 0 && len > 0 ) {
                    i = len % g1 || g1;
                    intPart = intDigits.substr( 0, i );

                    for ( ; i < len; i += g1 ) {
                        intPart += groupSeparator + intDigits.substr( i, g1 );
                    }

                    if ( g2 > 0 ) intPart += groupSeparator + intDigits.slice(i);
                    if (isNeg) intPart = '-' + intPart;
                }

                str = fractionPart
                  ? intPart + FORMAT.decimalSeparator + ( ( g2 = +FORMAT.fractionGroupSize )
                    ? fractionPart.replace( new RegExp( '\\d{' + g2 + '}\\B', 'g' ),
                      '$&' + FORMAT.fractionGroupSeparator )
                    : fractionPart )
                  : intPart;
            }

            return str;
        };


        /*
         * Return a string array representing the value of this BigNumber as a simple fraction with
         * an integer numerator and an integer denominator. The denominator will be a positive
         * non-zero value less than or equal to the specified maximum denominator. If a maximum
         * denominator is not specified, the denominator will be the lowest value necessary to
         * represent the number exactly.
         *
         * [md] {number|string|BigNumber} Integer >= 1 and < Infinity. The maximum denominator.
         *
         * 'toFraction() max denominator not an integer: {md}'
         * 'toFraction() max denominator out of range: {md}'
         */
        P.toFraction = function (md) {
            var arr, d0, d2, e, exp, n, n0, q, s,
                k = ERRORS,
                x = this,
                xc = x.c,
                d = new BigNumber(ONE),
                n1 = d0 = new BigNumber(ONE),
                d1 = n0 = new BigNumber(ONE);

            if ( md != null ) {
                ERRORS = false;
                n = new BigNumber(md);
                ERRORS = k;

                if ( !( k = n.isInt() ) || n.lt(ONE) ) {

                    if (ERRORS) {
                        raise( 22,
                          'max denominator ' + ( k ? 'out of range' : 'not an integer' ), md );
                    }

                    // ERRORS is false:
                    // If md is a finite non-integer >= 1, round it to an integer and use it.
                    md = !k && n.c && round( n, n.e + 1, 1 ).gte(ONE) ? n : null;
                }
            }

            if ( !xc ) return x.toString();
            s = coeffToString(xc);

            // Determine initial denominator.
            // d is a power of 10 and the minimum max denominator that specifies the value exactly.
            e = d.e = s.length - x.e - 1;
            d.c[0] = POWS_TEN[ ( exp = e % LOG_BASE ) < 0 ? LOG_BASE + exp : exp ];
            md = !md || n.cmp(d) > 0 ? ( e > 0 ? d : n1 ) : n;

            exp = MAX_EXP;
            MAX_EXP = 1 / 0;
            n = new BigNumber(s);

            // n0 = d1 = 0
            n0.c[0] = 0;

            for ( ; ; )  {
                q = div( n, d, 0, 1 );
                d2 = d0.plus( q.times(d1) );
                if ( d2.cmp(md) == 1 ) break;
                d0 = d1;
                d1 = d2;
                n1 = n0.plus( q.times( d2 = n1 ) );
                n0 = d2;
                d = n.minus( q.times( d2 = d ) );
                n = d2;
            }

            d2 = div( md.minus(d0), d1, 0, 1 );
            n0 = n0.plus( d2.times(n1) );
            d0 = d0.plus( d2.times(d1) );
            n0.s = n1.s = x.s;
            e *= 2;

            // Determine which fraction is closer to x, n0/d0 or n1/d1
            arr = div( n1, d1, e, ROUNDING_MODE ).minus(x).abs().cmp(
                  div( n0, d0, e, ROUNDING_MODE ).minus(x).abs() ) < 1
                    ? [ n1.toString(), d1.toString() ]
                    : [ n0.toString(), d0.toString() ];

            MAX_EXP = exp;
            return arr;
        };


        /*
         * Return the value of this BigNumber converted to a number primitive.
         */
        P.toNumber = function () {
            return +this;
        };


        /*
         * Return a BigNumber whose value is the value of this BigNumber raised to the power n.
         * If m is present, return the result modulo m.
         * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
         * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using
         * ROUNDING_MODE.
         *
         * The modular power operation works efficiently when x, n, and m are positive integers,
         * otherwise it is equivalent to calculating x.toPower(n).modulo(m) (with POW_PRECISION 0).
         *
         * n {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
         * [m] {number|string|BigNumber} The modulus.
         *
         * 'pow() exponent not an integer: {n}'
         * 'pow() exponent out of range: {n}'
         *
         * Performs 54 loop iterations for n of 9007199254740991.
         */
        P.toPower = P.pow = function ( n, m ) {
            var k, y, z,
                i = mathfloor( n < 0 ? -n : +n ),
                x = this;

            if ( m != null ) {
                id = 23;
                m = new BigNumber(m);
            }

            // Pass ±Infinity to Math.pow if exponent is out of range.
            if ( !isValidInt( n, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 23, 'exponent' ) &&
              ( !isFinite(n) || i > MAX_SAFE_INTEGER && ( n /= 0 ) ||
                parseFloat(n) != n && !( n = NaN ) ) || n == 0 ) {
                k = Math.pow( +x, n );
                return new BigNumber( m ? k % m : k );
            }

            if (m) {
                if ( n > 1 && x.gt(ONE) && x.isInt() && m.gt(ONE) && m.isInt() ) {
                    x = x.mod(m);
                } else {
                    z = m;

                    // Nullify m so only a single mod operation is performed at the end.
                    m = null;
                }
            } else if (POW_PRECISION) {

                // Truncating each coefficient array to a length of k after each multiplication
                // equates to truncating significant digits to POW_PRECISION + [28, 41],
                // i.e. there will be a minimum of 28 guard digits retained.
                // (Using + 1.5 would give [9, 21] guard digits.)
                k = mathceil( POW_PRECISION / LOG_BASE + 2 );
            }

            y = new BigNumber(ONE);

            for ( ; ; ) {
                if ( i % 2 ) {
                    y = y.times(x);
                    if ( !y.c ) break;
                    if (k) {
                        if ( y.c.length > k ) y.c.length = k;
                    } else if (m) {
                        y = y.mod(m);
                    }
                }

                i = mathfloor( i / 2 );
                if ( !i ) break;
                x = x.times(x);
                if (k) {
                    if ( x.c && x.c.length > k ) x.c.length = k;
                } else if (m) {
                    x = x.mod(m);
                }
            }

            if (m) return y;
            if ( n < 0 ) y = ONE.div(y);

            return z ? y.mod(z) : k ? round( y, POW_PRECISION, ROUNDING_MODE ) : y;
        };


        /*
         * Return a string representing the value of this BigNumber rounded to sd significant digits
         * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
         * necessary to represent the integer part of the value in fixed-point notation, then use
         * exponential notation.
         *
         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toPrecision() precision not an integer: {sd}'
         * 'toPrecision() precision out of range: {sd}'
         * 'toPrecision() rounding mode not an integer: {rm}'
         * 'toPrecision() rounding mode out of range: {rm}'
         */
        P.toPrecision = function ( sd, rm ) {
            return format( this, sd != null && isValidInt( sd, 1, MAX, 24, 'precision' )
              ? sd | 0 : null, rm, 24 );
        };


        /*
         * Return a string representing the value of this BigNumber in base b, or base 10 if b is
         * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
         * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
         * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
         * TO_EXP_NEG, return exponential notation.
         *
         * [b] {number} Integer, 2 to 64 inclusive.
         *
         * 'toString() base not an integer: {b}'
         * 'toString() base out of range: {b}'
         */
        P.toString = function (b) {
            var str,
                n = this,
                s = n.s,
                e = n.e;

            // Infinity or NaN?
            if ( e === null ) {

                if (s) {
                    str = 'Infinity';
                    if ( s < 0 ) str = '-' + str;
                } else {
                    str = 'NaN';
                }
            } else {
                str = coeffToString( n.c );

                if ( b == null || !isValidInt( b, 2, 64, 25, 'base' ) ) {
                    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                      ? toExponential( str, e )
                      : toFixedPoint( str, e );
                } else {
                    str = convertBase( toFixedPoint( str, e ), b | 0, 10, s );
                }

                if ( s < 0 && n.c[0] ) str = '-' + str;
            }

            return str;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber truncated to a whole
         * number.
         */
        P.truncated = P.trunc = function () {
            return round( new BigNumber(this), this.e + 1, 1 );
        };


        /*
         * Return as toString, but do not accept a base argument, and include the minus sign for
         * negative zero.
         */
        P.valueOf = P.toJSON = function () {
            var str,
                n = this,
                e = n.e;

            if ( e === null ) return n.toString();

            str = coeffToString( n.c );

            str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                ? toExponential( str, e )
                : toFixedPoint( str, e );

            return n.s < 0 ? '-' + str : str;
        };


        P.isBigNumber = true;

        if ( config != null ) BigNumber.config(config);

        return BigNumber;
    }


    // PRIVATE HELPER FUNCTIONS


    function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
    }


    // Return a coefficient array as a string of base 10 digits.
    function coeffToString(a) {
        var s, z,
            i = 1,
            j = a.length,
            r = a[0] + '';

        for ( ; i < j; ) {
            s = a[i++] + '';
            z = LOG_BASE - s.length;
            for ( ; z--; s = '0' + s );
            r += s;
        }

        // Determine trailing zeros.
        for ( j = r.length; r.charCodeAt(--j) === 48; );
        return r.slice( 0, j + 1 || 1 );
    }


    // Compare the value of BigNumbers x and y.
    function compare( x, y ) {
        var a, b,
            xc = x.c,
            yc = y.c,
            i = x.s,
            j = y.s,
            k = x.e,
            l = y.e;

        // Either NaN?
        if ( !i || !j ) return null;

        a = xc && !xc[0];
        b = yc && !yc[0];

        // Either zero?
        if ( a || b ) return a ? b ? 0 : -j : i;

        // Signs differ?
        if ( i != j ) return i;

        a = i < 0;
        b = k == l;

        // Either Infinity?
        if ( !xc || !yc ) return b ? 0 : !xc ^ a ? 1 : -1;

        // Compare exponents.
        if ( !b ) return k > l ^ a ? 1 : -1;

        j = ( k = xc.length ) < ( l = yc.length ) ? k : l;

        // Compare digit by digit.
        for ( i = 0; i < j; i++ ) if ( xc[i] != yc[i] ) return xc[i] > yc[i] ^ a ? 1 : -1;

        // Compare lengths.
        return k == l ? 0 : k > l ^ a ? 1 : -1;
    }


    /*
     * Return true if n is a valid number in range, otherwise false.
     * Use for argument validation when ERRORS is false.
     * Note: parseInt('1e+1') == 1 but parseFloat('1e+1') == 10.
     */
    function intValidatorNoErrors( n, min, max ) {
        return ( n = truncate(n) ) >= min && n <= max;
    }


    function isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    }


    /*
     * Convert string of baseIn to an array of numbers of baseOut.
     * Eg. convertBase('255', 10, 16) returns [15, 15].
     * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
     */
    function toBaseOut( str, baseIn, baseOut ) {
        var j,
            arr = [0],
            arrL,
            i = 0,
            len = str.length;

        for ( ; i < len; ) {
            for ( arrL = arr.length; arrL--; arr[arrL] *= baseIn );
            arr[ j = 0 ] += ALPHABET.indexOf( str.charAt( i++ ) );

            for ( ; j < arr.length; j++ ) {

                if ( arr[j] > baseOut - 1 ) {
                    if ( arr[j + 1] == null ) arr[j + 1] = 0;
                    arr[j + 1] += arr[j] / baseOut | 0;
                    arr[j] %= baseOut;
                }
            }
        }

        return arr.reverse();
    }


    function toExponential( str, e ) {
        return ( str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str ) +
          ( e < 0 ? 'e' : 'e+' ) + e;
    }


    function toFixedPoint( str, e ) {
        var len, z;

        // Negative exponent?
        if ( e < 0 ) {

            // Prepend zeros.
            for ( z = '0.'; ++e; z += '0' );
            str = z + str;

        // Positive exponent
        } else {
            len = str.length;

            // Append zeros.
            if ( ++e > len ) {
                for ( z = '0', e -= len; --e; z += '0' );
                str += z;
            } else if ( e < len ) {
                str = str.slice( 0, e ) + '.' + str.slice(e);
            }
        }

        return str;
    }


    function truncate(n) {
        n = parseFloat(n);
        return n < 0 ? mathceil(n) : mathfloor(n);
    }


    // EXPORT


    BigNumber = constructorFactory();
    BigNumber['default'] = BigNumber.BigNumber = BigNumber;


    // AMD.
    if ( typeof define == 'function' && define.amd ) {
        define( function () { return BigNumber; } );

    // Node.js and other environments that support module.exports.
    } else if ( typeof module != 'undefined' && module.exports ) {
        module.exports = BigNumber;

    // Browser.
    } else {
        if ( !globalObj ) globalObj = typeof self != 'undefined' ? self : Function('return this')();
        globalObj.BigNumber = BigNumber;
    }
})(this);

var Kongregate=Kongregate||{};Kongregate.Utils=Kongregate.Utils||{};Kongregate.Utils.isKlient=function(){return/klient|kartridge\//.test(navigator.userAgent.toLowerCase())};Kongregate.Utils.findKongregateWindow=function(){if(!Kongregate.Utils.isKlient())return top;for(var a=window,b=window.parent;b!==top;)a=b,b=a.parent;return a};
Kongregate.Utils.catchErrors=function(a,b,c){return function(){try{return a.apply(b,arguments)}catch(d){return Kongregate.Log.error("catchErrors caught unhandled exception",d),c}}};
(function(){function a(a,c,d){Kongregate.Log[a]=function(){try{"undefined"!==typeof active_user&&void 0===Kongregate.Log.debugLevel&&(Kongregate.Log.debugLevel=active_user.debugLevel()),Kongregate.Log.debugLevel>=c&&(console[d]?Function.prototype.apply.call(console[d],console,arguments):console.log(arguments))}catch(a){}}}Kongregate.Log={};a("spam",5,"log");a("debug",4,"log");a("info",3,"info");a("warn",2,"warn");a("error",1,"error")})();
KonduitEvent={INIT:"init",CONNECT:"connect",CONNECTED:"connected",DISCONNECT:"disconnect",LOGIN:"login",SWITCH_USER:"switch_user",JOIN_ROOM:"join_room",LEAVE_ROOM:"leave_room",USER_JOIN:"user_join",USER_DEPARTURE:"user_departure",USER_CHANGED:"user_changed",ROOM_MESSAGE:"room_message",SYSTEM_MESSAGE:"system_message",PRIVATE_MESSAGE:"private_message",ADMIN_MESSAGE:"admin_message",MESSAGE_ERROR:"message_error",SET_PRESENCE:"set_presence",GUEST_COUNT:"guest_count",ROOM_NOT_FOUND:"room_not_found",ROOM_FULL:"room_full",
REQUEST_CHAT_ROOM:"request_chat_room",CREATE_PRIVATE_ROOM:"create_private_room",DESTROY_PRIVATE_ROOM:"destroy_private_room",PRIVATE_ROOM_INVITATION:"private_room_invitation",PRIVATE_ROOM_KICK:"private_room_kick",PRIVATE_ROOM_INVITATION_SENT:"private_room_invitation_sent",JOIN_GUILD_ROOM:"join_guild_room",SILENCED:"silenced",PARTICIPATE:"participate",AMNESTY:"amnesty",API_INITIALIZED:"api_initialized",ADD_STATISTICS:"add_statistics",STATISTIC_UPDATED:"statistic_updated",STATISTIC_SUBMISSION:"statistic_submission",
STATISTICS_FLUSH:"statistics_flush",SET_ACCOMPLISHMENT_PROGRESS:"set_accomplishment_progress",NEW_HIGH_SCORE:"new_high_score",DISPLAY_SHOUT_BOX:"display_shout_box",DISPLAY_INVITATION_BOX:"display_invitation_box",SEND_PRIVATE_MESSAGE:"send_private_message",DISPLAY_FEED_POST_BOX:"display_feed_post_box",DISPLAY_SIGN_IN_LIGHTBOX:"display_sign_in_lightbox",DISPLAY_REGISTRATION_LIGHTBOX:"display_registration_lightbox",LIGHTBOX_OPENED:"lightbox_opened",LIGHTBOX_CLOSED:"lightbox_closed",ACCOMPLISHMENT_TASK_PROGRESS:"accomplishment_task_progress",
RESIZE_GAME:"resize_game",HANDLE_ITEM_CHECKOUT_REQUEST:"handle_item_checkout_request",KONDUIT_MESSAGE:"konduit_message",ANALYTICS_PAYLOAD:"analytics_payload",OP_EXTERNAL_MESSAGE:"ext.msg",OP_CONNECTED:"connected",OP_HELLO:"hello",OP_USER_INFO:"user.info",OP_SIGN_IN:"sign_in",PARAM_USER:"user",PARAM_USER_ID:"user_id",PARAM_GAME_AUTH_TOKEN:"auth_token",PURCHASE_RESULT:"purchase_result",PARAM_LOCALCONNECTION_ONLY:"localconnection_only",CUSTOM_TAB_MESSAGE:"custom_tab_message",CUSTOM_TAB_SHOW:"custom_tab_show",
CUSTOM_TAB_CLOSE:"custom_tab_close",CUSTOM_TAB_SHOWN:"custom_tab_shown",CUSTOM_TAB_CLEAR_MESSAGES:"custom_tab_clear_messages",OP_CHAT_TAB:"chat.tab",OP_CHAT_CLEAR_DIALOG:"chat.dlg.clear",OP_CHAT_DISPLAY:"chat.disp",OP_CHAT_MSG:"chat.msg",OP_CHAT_CANVAS_ELEMENT:"chat.elm",OP_CHAT_PRIVATE_MESSAGE:"chat.privateMessage",OP_CHAT_RESIZE_GAME:"chat.resizeGame",OP_CHAT_DISPLAY_INVITATION_BOX:"chat.invite",OP_CHAT_DISPLAY_FEED_POST_BOX:"chat.feedpost",OP_CHAT_DISPLAY_REGISTRATION:"chat.registration",OP_CHAT_DISPLAY_SHOUT_BOX:"chat.shoutbox",
PARAM_SHOUT_MESSAGE:"shout_message",PARAM_CANVAS_SIZE:"chat.canvas.size",PARAM_RESIZE_GAME_WIDTH:"chat.resizeGame.width",PARAM_RESIZE_GAME_HEIGHT:"chat.resizeGame.height",PARAM_INVITATION_MESSAGE:"invitation_message",PARAM_FRIEND_FILTER:"filter",PARAM_IMAGE_URI:"image_uri",PARAM_KV_PARAMS:"kv_params",PARAM_NAME:"name",PARAM_DESCRIPTION:"desc",PARAM_DATA:"data",OP_SHOUT_CALLBACK:"ext.shout_callback",PARAM_MESSAGE_TYPE:"ext.message_type",PARAM_MESSAGE_RECIPIENTS:"ext.message_recipients",PARAM_ERROR:"error",
PARAM_SUCCESS:"success",PARAM_REQUEST_ID:"req.id",OP_STATS_SUBMIT:"stat.submit",PARAM_STATS:"stats",ITEM_LIST:"mtx.item_list",ITEM_CHECKOUT:"mtx.checkout",PURCHASE_KREDS:"mtx.kred_purchase",ITEM_INSTANCES:"mtx.item_instances",USE_ITEM_INSTANCE:"mtx.use_item_instance",PARAM_PURCHASE_METHOD:"purchase_method",PARAM_ITEM_TAGS:"item_tags",PARAM_ITEMS:"items",PARAM_ORDER_INFO:"order_info",PARAM_ID:"id",ADS_INITIALIZE:"ads.initialize",ADS_AVAILABLE:"ads.available",ADS_UNAVAILABLE:"ads.unavailable",ADS_SHOW_INCENTIVIZED:"ads.show_incentivized",
AD_OPENED:"ads.ad_opened",AD_COMPLETED:"ads.ad_completed",AD_ABANDONED:"ads.ad_abandoned",PROCESSING_SAVE_SHARED_CONTENT:"processing_save_shared_content",SAVE_SHARED_CONTENT:"save_shared_content",SAVE_SHARED_CONTENT_COMPLETE:"shared_content_save_complete",LOAD_SHARED_CONTENT:"load_shared_content",BROWSE_SHARED_CONTENT:"browse_shared_content",OP_SAVE_SHARED_CONTENT:"save_shared_content",OP_BROWSE_SHARED_CONTENT:"browse_shared_content",OP_LOAD_SHARED_CONTENT:"load_shared_content",OP_SHARED_CONTENT_SAVE_COMPLETE:"shared_content_save_complete",
PARAM_CONTENT_TYPE:"content_type",PARAM_LABEL:"label",PARAM_IMAGE:"image",OP_IMAGE_AVATAR_SUBMIT:"avatar.submit",OP_IMAGE_AVATAR_FINISHED:"avatar.finished",IMAGE_AVATAR_SUBMIT:"image_avatar_submit",IMAGE_AVATAR_COMPLETE:"image_avatar_complete",OP_ANALYTICS_PAYLOAD:"analytics.payload",HOLODECK_DATA:"holodeck_data",PARAM_HOLODECK_TYPE:"holodeck_type",FETCH_HISTORY:"fetch_history",HISTORY_RECEIVED:"history_received",FAYE_DISCONNECT:"faye_disconnect"};
KonduitChatErrorMessage={MESSAGE_TOO_LONG:"error_msg_too_long",RATE_LIMITED:"error_msg_rate_limit"};KonduitPresenceType={CHAT:"chat",AWAY:"away"};
Kongregate.polyfillJSON=function(){window.JSON||(window.JSON={parse:function(a){return eval("("+a+")")},stringify:function(){var a=Object.prototype.toString,b=Array.isArray||function(b){return"[object Array]"===a.call(b)},c={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},d=function(a){return c[a]||"\\u"+(a.charCodeAt(0)+65536).toString(16).substr(1)},e=/[\\"\u0000-\u001F\u2028\u2029]/g;return function h(c){if(null==c)return"null";if("number"===typeof c)return isFinite(c)?
c.toString():"null";if("boolean"===typeof c)return c.toString();if("object"===typeof c){if("function"===typeof c.toJSON)return h(c.toJSON());if(b(c)){for(var m="[",p=0;p<c.length;p++)m+=(p?", ":"")+h(c[p]);return m+"]"}if("[object Object]"===a.call(c)){m=[];for(p in c)Object.prototype.hasOwnProperty.call(c,p)&&m.push(h(p)+": "+h(c[p]));return"{"+m.join(", ")+"}"}}return'"'+c.toString().replace(e,d)+'"'}}()})};
Kongregate.contentLoaded=function(a){var b=window,c=!1,d=!0,e=b.document,k=e.documentElement,h=e.addEventListener,g=h?"addEventListener":"attachEvent",m=h?"removeEventListener":"detachEvent",p=h?"":"on",l=function(d){if(!("readystatechange"==d.type&&"complete"!=e.readyState)&&(("load"==d.type?b:e)[m](p+d.type,l,!1),!c&&(c=!0)))a.call(b,d.type||d)},r=function(){try{k.doScroll("left")}catch(a){setTimeout(r,50);return}l("poll")};if("complete"==e.readyState)a.call(b,"lazy");else{if(!h&&k.doScroll){try{d=
!b.frameElement}catch(q){}d&&r()}e[g](p+"DOMContentLoaded",l,!1);e[g](p+"readystatechange",l,!1);b[g](p+"load",l,!1)}};
(function(){var a;Kongregate.MessageConnection=function(a){this.initialize(a)};Kongregate.MessageConnection.MESSAGE_EVENT="kongregate:api:message";Kongregate.MessageConnection.prototype={initialize:function(b){a=b.channel_id;this._window=b.window||window;this._targetOrigin=b.target_origin;this._targetWindows=b.target_window?[b.target_window]:[];this._sendListener=b.send_listener;this._retryConnection=b.retry_connection||!1;this._messageListeners=[];this._supportsObjects=Kongregate.PostMessage.supportsObjects();
this._client="string"===typeof this._targetOrigin;this._connected=this._handleMessages=!1},addMessageListener:function(a){this._messageListeners.push(a)},isSupported:function(){return!this.supportsObjects()&&"undefined"===typeof this._window.JSON?!1:"undefined"!==typeof(this._targetWindows[0]||window).postMessage},connected:function(){return this._connected},isClient:function(){return this._client},supportsObjects:function(){return this._supportsObjects},logPrefix:function(){return this._client?"[Game:JS]":
"[Konduit]"},listen:function(){if(this.isSupported()&&!this._listening){this._listening=!0;var a=this;Kongregate.PostMessage.addMessageListener(this._window,function(c){a.onMessageReceived.call(a,c)})}},parseMessage:function(a){try{var c=Kongregate.PostMessage.parseMessage(a);if(c&&c.kongregate_type===Kongregate.MessageConnection.MESSAGE_EVENT)return{opcode:c.opcode,params:c.params}}catch(d){Kongregate.Log.warn(this.logPrefix(),"Error parsing message",a,d)}return null},onMessageReceived:function(a){var c=
a.origin||a.originalEvent.origin;this._targetOrigin&&c!==this._targetOrigin?Kongregate.Log.debug(this.logPrefix(),"Ignoring message from "+c):(c=this.parseMessage(a.data))&&this.processMessage(c,a)},processMessage:function(a,c){Kongregate.Log.debug(this.logPrefix(),"Message received:",a);switch(a.opcode){case KonduitEvent.CONNECT:this.onClientConnected(a.params,c.source);break;case KonduitEvent.CONNECTED:this.onConnectedToServer()}for(var d=0;d<this._messageListeners.length;d++)this._messageListeners[d](a.opcode,
a.params)},sendMessage:function(a,c){this.removeMissingWindows();if(!this.connected()&&a!==KonduitEvent.CONNECT&&a!==KonduitEvent.CONNECTED)Kongregate.Log.debug(this.logPrefix(),"Not sending "+a+", not connected");else{var d={kongregate_type:Kongregate.MessageConnection.MESSAGE_EVENT,opcode:a,params:"string"===typeof c?JSON.parse(c):c};this.supportsObjects()||(d=JSON.stringify(d));for(var e=this._targetOrigin||"*",k=0;k<this._targetWindows.length;k++)this._targetWindows[k].postMessage(d,e);this._sendListener&&
this._sendListener(a,c)}},connect:function(){this.connected()||(this.listen(),Kongregate.Log.debug("Attempting to connect to Kongregate API"),this.sendMessage(KonduitEvent.CONNECT,{chnl:a}),this._retryConnection&&this.retryConnection())},retryConnection:function(){var a=this;setTimeout(function(){a.connect()},5E3)},onClientConnected:function(b,c){b.chnl!==a?Kongregate.Log.warn(this.logPrefix(),"Channel ID mismatch, ignoring connect"):(Kongregate.Log.debug(this.logPrefix(),"API connection established!"),
this.acceptClientConnection(c))},onConnectedToServer:function(){this.connected()||(Kongregate.Log.debug(this.logPrefix(),"API connection established!"),this._connected=!0)},acceptClientConnection:function(a){for(var c=!1,d=this._targetWindows,e=0;e<this._targetWindows.length;e++)if(this._targetWindows[e]===a){Kongregate.Log.warn("Re-initializing duplicate connection");c=!0;break}this._targetWindows=[a];this.sendMessage(KonduitEvent.CONNECTED,{});this._targetWindows=d;c||this._targetWindows.push(a);
this.removeMissingWindows()},removeMissingWindows:function(a){if(!this._client){for(i=this._targetWindows.length-1;0<=i;i--)this._targetWindows[i].top||this._targetWindows.splice(i,1);this._connected=0<this._targetWindows.length}}}})();
Kongregate.PostMessage={addMessageListener:function(a,b){if(a.document.addEventListener)try{a.document.addEventListener.call(a,"message",b,!1)}catch(c){Kongregate.Log.debug("addEventListener failed, using iframe addEventListener: "+c),Kongregate.PostMessage.createIframeEventListener(a,b)}else a.attachEvent?a.attachEvent("onmessage",b):Kongregate.Log.error("Could not add event listener, neither addEventListener or attachEvent found!");return b},removeMessageListener:function(a,b){a.removeEventListener?
a.removeEventListener("message",b):a.detachEvent&&a.detachEvent("onmessage",b)},supportsObjects:function(){var a=document.createElement("iframe"),b=!0;a.src="about:blank";document.body.appendChild(a);try{a.contentWindow.postMessage({toString:function(){b=!1;return""}},"*")}catch(c){}document.body.removeChild(a);return b},parseMessage:function(a){return"string"===typeof a&&"{"===a.charAt(0)?JSON.parse(a):"object"===typeof a?a:null},createIframeEventListener:function(a,b){var c=document.createElement("iframe");
c.src="about:blank";document.head.appendChild(c);c.contentWindow.addEventListener.call(a,"message",b,!1);document.head.removeChild(c)}};
(function(){Kongregate.AnalyticsServices=function(a){this.initialize(a)};Kongregate.AnalyticsServices.prototype={initialize:function(a){var c=this;this._heartbeatInterval=a.heartbeat_interval||15E3;this._services=a.services;this._swrveClient=a.swrve_client;this._mtx=a.mtx;this._kongVars=a.kongregate_variables;this._staticVars={};this._persistentStore={};this._heartbeatCount=0;this._enablePersistence=a.enable_persistence;this._services.addEventListener(KonduitEvent.KONDUIT_MESSAGE,function(a){c._onIncomingMessage(a.opcode,
a.params)});a.start&&this._setup()},addEvent:function(a,c){this._enabled&&(!this._autoAnalyticsDisabled()&&0<=Kongregate.Utils.indexOf(ga,a)?Kongregate.Log.warn("Ignoring analytics event: "+a+" since it is a kong-automatic event."):this._addEventInternal(a,this._objectify(c)))},addFilterType:function(a){if(this._enabled&&a){var c=/^[a-zA-Z0-9_]+$/;!a||!c.test(a)?Kongregate.Log.warn("Invalid filterType: "+a+", must be alpha_numeric"):(c=(c=this._savedData[B])?c.split(","):[],0>Kongregate.Utils.indexOf(c,
a)&&(c.push(a),c.sort(),this._savedData[B]=c.join(","),this._flushPersistentStore(),Kongregate.Log.info("Filter type added: "+a)))}},setCommonPropsCallback:function(a){this._enabled&&(this._commonPropsCallback=a,this.updateCommonProperties())},setCommonProperties:function(a){a=this._objectify(a);this.setCommonPropsCallback(function(){return a})},updateCommonProperties:function(){try{"function"===typeof this._commonPropsCallback&&(this._commonProperties=this._objectify(this._commonPropsCallback()),
this._savedData[ha]=this._commonProperties,this._commonProperties[O]&&!this._savedData[C]&&(this._savedData[C]=this._commonProperties[O]))}catch(a){Kongregate.Log.error("Error updating common properties: "+a)}},getAutoLongProperty:function(a){return this.getAutoIntProperty(a)},getAutoLongLongProperty:function(a){return this.getAutoLongProperty(a)},getAutoStringProperty:function(a){if(!this._enabled)return null;var c=this._getKongAutomaticVariables();if("string"===typeof c[a])return c[a];Kongregate.Log.warn("Property is not a string: "+
a);return null},getAutoBoolProperty:function(a){return!this._enabled?!1:!!this._getKongAutomaticVariables()[a]},getAutoDoubleProperty:function(a){if(!this._enabled)return NaN;var c=this._getKongAutomaticVariables();return Number(c[a])},getAutoIntProperty:function(a){return!this._enabled?NaN:Math.floor(this.getAutoDoubleProperty(a))},getAutoUTCProperty:function(a){return this.getAutoStringProperty(a)},getAutoPropertiesJSON:function(){if(!this._enabled)return"{}";this._buildKongAutomaticVariables();
return"function"===typeof JSON.stringify?JSON.stringify(this._automaticVars):"{}"},startPurchase:function(a,c){if(!this._autoAnalyticsDisabled()){var b=this._getProductId(a);b?(this._priceUSD=this._getUSDPrice(b,c),this._iapID&&Kongregate.Log.warn("startPurchase: invoked before active transaction finished. iap_ids may mismatch."),Kongregate.Log.debug("IAP FLOW STEP: startPurchase(): "+b),this._iapID=this._uuid(),this._productId=b,this._addIAPEvent(null,this._objectify(c),D)):Kongregate.Log.warn("startPurchase: Can't start purchase with null productId, param was: "+
a)}},finishPurchase:function(a,c,b){this._autoAnalyticsDisabled()||(Kongregate.Log.debug("IAP FLOW STEP: finishPurchase(): "+this._productId+", transactionId: "+c+", resultCode: "+a),ia===a?(this._numPurchases++,this._totalSpentUSD+=this._priceUSD,this._addIAPEvent(c,this._objectify(b),E)):this._addIAPFailEvent(c,this._objectify(b)))},setAutomaticVariablesListener:function(a){this._enabled&&(this._automaticVarsListener=a,this._getKongAutomaticVariables())},start:function(){},_setup:function(){if(!this._savedData){var c=
this._services.isKongregate();this._mode=c?this._kongVars.kongregate_analytics_mode:null;this._enabled=null!==this._mode&&void 0!==this._mode&&this._checkBrowserSupport();Kongregate.Log.debug("Initializing Analytics API, mode: "+this._mode);if(this._enabled){this._enablePersistence&&this._hasLocalStorage()&&this._loadPersistentStore();this._clientVersion=c?this._kongVars.kongregate_game_version:"1";this._pendingEvents=this._persistentStore.pending_events=this._persistentStore.pending_events||[];this._persistentStore.event_queues=
this._persistentStore.event_queues||{swrve:[]};this._eventQueue=this._persistentStore.event_queues.swrve=this._persistentStore.event_queues.swrve||[];this._savedData=this._persistentStore.saved_data=this._persistentStore.saved_data||{};this._items=this._persistentStore.items=this._persistentStore.items||[];this._commonProperties=this._savedData.common_properties=this._savedData.common_properties||{};this._bundleId=this._savedData[h];this._autoAnalyticsDisabled()?Kongregate.Log.debug("Auto analytics disabled"):
this._autoAnalyticsExcludesServer()?Kongregate.Log.debug("Game has a server, only tracking a subset of analytics automatically"):Kongregate.Log.debug("Automatic analytics enabled");c&&this._requestItems();var c=this._getDate(),b=!this._savedData[t];this._setInitialSavedData(t,this._toW3CDTF(c));this._setInitialSavedData(F,a);this._setInitialSavedData(w,this._clientVersion);this._setInitialSavedData(u,this._timeZoneOffset());b&&(Kongregate.Log.debug("Analytics: First play"),this._installEvent());this._startSession();
this._buildKongStaticVars()}else Kongregate.Log.debug("Analytics API not enabled")}},_enqueueEvent:function(a,c){if(!this._initialized){if(!this._autoAnalyticsDisabled()||!c[G])Kongregate.Log.debug("Queueing pending event: "+a),this._pendingEvents.push({name:a,event:c});return!0}return!1},_addEventInternal:function(a,c,b){var n=0===a.indexOf("swrve.");!n&&!c[P]&&(c=this._merge(this._buildEventSpecificVariables(),c));if(!this._enqueueEvent(a,c)&&this._enabled){Q===a&&this._refreshPlayerInfoFields(c);
var y=this._getKongAutomaticVariables(),d={};n?d=c:(this._merge(d,this._objectify(this._commonProperties)),c[G]?(this._merge(d,y),this._merge(d,c)):(this._merge(d,c),this._merge(d,y)));Kongregate.SwrveClient.SWRVE_SESSION_START_IDENTIFIER===a&&(b=!0);Kongregate.Log.debug("Adding event: "+a+", flush="+b);this._eventQueue.push({name:a,event:d});this._flushQueue();b&&this._flushPersistentStore()}},_flushQueue:function(){if(this._swrveClient){var a=this;this._eventQueue.length&&!this._submitLock&&(Kongregate.Log.debug("Flushing swrve event queue"),
this._submitLock=!0,this._swrveClient.sendEvents(this._eventQueue,function(c){a._submitLock=!1;a._flushPersistentStore();a._flushQueueDelayed(c.success?1E3:1E4)}))}},_flushQueueDelayed:function(a){var c=this;setTimeout(function(){c._flushQueue()},a)},_persistentStoreName:function(){return Kongregate.AnalyticsServices.persistentStoreName(this._kongVars.kongregate_game_id)},_loadPersistentStore:function(){var a;try{var c=localStorage.getItem(this._persistentStoreName())||"{}";a=JSON.parse(c)}catch(b){Kongregate.Log.warn("Error loading persistent store: "+
b)}this._persistentStore=a||{}},_flushPersistentStore:function(){try{var a=JSON.stringify(this._persistentStore);localStorage.setItem(this._persistentStoreName(),a)}catch(c){Kongregate.Log.warn("Error flushing persistent store: "+c)}},_destroyPersistentStore:function(){localStorage.removeItem(this._persistentStoreName())},_buildEventSpecificVariables:function(){var a={};a[P]=0;if(this._autoAnalyticsDisabled())return a;a[n]=this._uuid();a[R]=this._toW3CDTF(this._getDate());a[ja]=this._timeZoneOffset();
return a},_refreshPlayerInfoFields:function(a){a[H]=this._savedData[H];a[I]=this._savedData[I];for(var c=0;c<S.length;c++){var b=S[c];a[b]?this._savedData[b]=a[b]:a[b]=this._savedData[b]?this._savedData[b]:null}},_addAutoEvent:function(a,c){this._autoAnalyticsDisabled()||(c=this._objectify(c),c[G]=!0,this._addEventInternal(a,c))},_addIAPEvent:function(a,c,b){var n={};this._merge(n,this._objectify(c));n[J]=this._priceUSD;n[ka]=this._productId;n[T]=this._iapID;D!=b&&(n[U]=a||V);this._services.isKongregate()?
(n[K]=this._getKredPrice(this._productId),n[L]="KRED"):(n[K]=c[K]||this._priceUSD,n[L]=c[L]||"USD");E===b&&(this._sendSwrveIAPEvent(this._productId,this._priceUSD,c),this._productId=this._iapID=null,this._priceUSD=0);this._addEventInternal(b,n)},_addIAPFailEvent:function(a,c){var b={};this._merge(b,this._objectify(c));b[la]="SKErrorPaymentCancelled";b[U]=a||V;b[T]=this._iapID;this._productId=this._iapID=null;this._priceUSD=0;this._addEventInternal(W,b)},_sendSwrveUserEvent:function(){if(!this._autoAnalyticsDisabled()){for(var a=
this._getKongAutomaticVariables(),c={},b=0;b<X.length;b++){var n=X[b];c["kong."+n]=a[n]}this._addAutoEvent(Kongregate.SwrveClient.SWRVE_USER_IDENTIFIER,c)}},_sendSwrveIAPEvent:function(a,c,b){c={product_id:a,quantity:1,local_cost:c,local_currency:"USD",app_store:"unknown_store"};var n={};n[a]={type:"item",amount:1};b.soft_currency_change&&(n.soft_currency_change={type:"currency",amount:b.soft_currency_change});b.hard_currency_change&&(n.hard_currency_change={type:"currency",amount:b.hard_currency_change});
b.type&&(n[b.type]={type:"item",amount:1});c.rewards=n;this.addEvent(Kongregate.SwrveClient.SWRVE_IAP_IDENTIFIER,c)},_onIncomingMessage:function(a,c){a===KonduitEvent.OP_ANALYTICS_PAYLOAD&&this._processAnalyticsPayload(c.data.info,c.data.payload)},_setInitialSavedData:function(a,c){this._savedData[a]||(this._savedData[a]=c)},_autoAnalyticsDisabled:function(){return!this._enabled||this._mode===c},_autoAnalyticsAllEnabled:function(){return this._enabled&&this._mode===d},_autoAnalyticsExcludesServer:function(){return this._enabled&&
this._mode===e},_getProductId:function(a){try{if("string"===typeof a)return a;if(Number(parseFloat(a))==a)return a.toString();if("[object Array]"===Object.prototype.toString.call(a)){if(0<a.length)return this._getProductId(a[0])}else if("string"===typeof a.identifier)return a.identifier}catch(c){Kongregate.Log.error("Error calculating product ID:",c)}Kongregate.Log.warn("Couldn't get product ID from: "+a+", type="+typeof a);return null},_getUSDPrice:function(a,c){if(this._services.isKongregate()){var b=
this._getKredPrice(a);if(0!==b)return Math.floor(100*b*this._kredExchangeRate)/100}else if(c&&c[J])return c[J];if((b=a.match(/^.*t([0-9][0-9])_.*$/))&&2===b.length)if(b=parseInt(b[1],10),0<b&&b<=Y.length)return Y[b-1];Kongregate.Log.warn("Couldn't calculate USD price for identifier: "+a);return 0},_getKredPrice:function(a){for(var c=0;c<this._items.length;c++){var b=this._items[c];if(a===b.identifier)return b.price}Kongregate.Log.warn("Couldn't get kred price for identifier: "+a);return 0},_requestItems:function(a){a=
a||0;if(5<a)Kongregate.Log.error("Giving up on retrieving item list");else{var c=this;this._mtx.requestItemList(null,function(b){b.success?c._items=c._persistentStore.items=b.data:c._retryRequestItems(a+1)})}},_retryRequestItems:function(a){var c=this;Kongregate.Log.warn("Retrying item list request, retry #"+a);setTimeout(function(){c.requestItems(a)},15E3*a)},_processAnalyticsPayload:function(a,c){Kongregate.Log.info("Analytics payload received");if(this._enabled)if(this._checkBrowserSupport(c)){this._config=
a;var b=this._config.swrve;this._svid=c.site_visitor_uid;c.kger&&(this._kredExchangeRate=c.kger);this._updateKongStaticVars(c);this._initialized||(this._initialized=!0,!this._swrveClient&&(b&&b.application_id&&b.key)&&(Kongregate.Log.debug("Swrve initialized"),this._swrveClient=new Kongregate.SwrveClient({application_id:b.application_id,api_key:b.key,player_id:this._services.isKongregate()?this._svid:this._savedData[M],client_version:this._clientVersion})),this._swrveClient?(this._submitLock=!1,this._startHeartbeatTimer(),
this._flushPendingEvents(),this._sendSwrveUserEvent(),this.addEvent(Q,{}),this._flushQueue()):(Kongregate.Log.debug("Analytics not initialized, no services configured"),this._enabled=!1))}else this._enabled=!1},_checkBrowserSupport:function(a){try{if(a&&"safari"===a.browser.browser.toLowerCase())Kongregate.Log.warn("Analytics disabled on Safari");else{if(window.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest)return!0;Kongregate.Log.warn("Analytics disabled due to lack of XHR/CORS support")}}catch(c){Kongregate.Log.warn("Error while checking browser support: "+
c)}return!1},_hasLocalStorage:function(){try{var a="kong-"+this._getDate().getTime();localStorage.setItem(a,a);localStorage.removeItem(a);return!0}catch(c){return!1}},_startHeartbeatTimer:function(){if(this._heartbeatInterval){var a=this;setInterval(function(){a._onHeartbeatInterval()},this._heartbeatInterval)}},_onHeartbeatInterval:function(){this._heartbeatCount+=1;this._session.active=this._getDate().getTime();4==this._heartbeatCount&&(this._heartbeatCount=0,this.addEvent(ma,{}))},_flushPendingEvents:function(){if(0<
this._pendingEvents.length){Kongregate.Log.debug("Flushing "+this._pendingEvents.length+" pending event(s)");for(var a=0;a<this._pendingEvents.length;a++){var c=this._pendingEvents[a];this._addEventInternal(c.name,c.event,!1)}this._pendingEvents.length=0}},_buildKongStaticVars:function(){if(!this._autoAnalyticsDisabled()){var c=this._services.isKongregate();this._staticVars[h]=this._bundleId;this._staticVars[Z]=this._services.getUsername();this._staticVars[na]=this._services.getUserId();this._staticVars[oa]=
c?this._svid:"";this._staticVars[N]=this._session.id;this._staticVars[pa]=a;this._staticVars[z]=this._numSessions();this._staticVars[q]=this._clientVersion;this._staticVars[s]=this._clientVersion;this._staticVars[w]=this._savedData[w];this._staticVars[C]=this._savedData[C]||null;this._staticVars[qa]="kongregate_web";this._autoAnalyticsExcludesServer()||(this._staticVars[M]=c?this._svid:this._savedData[M]);this._staticVars[y]="browser";this._staticVars[ra]=null;this._staticVars[t]=this._savedData[t];
this._staticVars[F]=this._savedData[F];this._staticVars[u]=this._savedData[u];this._staticVars[sa]=this._kongVars.kongregate_language||(window.navigator.userLanguage||window.navigator.language).split("-")[0];this._staticVars[aa]=null;this._staticVars[ba]=null;this._staticVars[ta]=null;this._staticVars[ua]=null;this._staticVars[k]=!1;this._staticVars[A]="wifi";this._staticVars[p]=null;this._staticVars[va]=null;this._staticVars[wa]=null;this._staticVars[xa]=!0;this._staticVars[ya]="web"}},_buildKongAutomaticVariables:function(){if(this._autoAnalyticsDisabled())this._automaticVars=
{};else{var a={};a[B]=this._savedData[B]||"";a[za]=this._numPurchases;a[x]=this._daysRetained();this._autoAnalyticsExcludesServer()||(a[ca]=this._totalSpentUSD);this._automaticVars=this._merge(a,this._staticVars)}},_updateKongStaticVars:function(a){if(!this._autoAnalyticsDisabled()){this._bundleId="com.kongregate.web."+a.game_permalink;this._services.isExternal()&&(this._bundleId+=".external");this._savedData[h]=this._bundleId;this._buildKongStaticVars();var c=this._parseOS(a.browser.os);this._staticVars[l]=
c.type;this._staticVars[r]=c.version;this._staticVars[Aa]=a.premium;this._staticVars[Ba]=a.powerup_rewards_tier;this._savedData[H]=a.pur_link_date||null;this._savedData[I]=a.join_date||null;this._staticVars[Ca]=Number(a.spent_on_kreds);this._totalSpentUSD=a.spent_usd;this._numPurchases=a.num_purchases;this._staticVars[g]=a.browser.browser;this._staticVars[m]=a.browser.version;this._staticVars[Da]=a.ip_address;this._staticVars[f]=a.ip_address;c=this._getDate();c=Math.abs(c.getTime()-this._parseW3CDTF(a.server_time,
c).getTime())/1E3;this._staticVars[Ea]=Math.floor(c);this._savedData[Fa]=a.server_time;this._staticVars[v]=a.country_code;this._getKongAutomaticVariables()}},_getKongAutomaticVariables:function(){if(!this._enabled)return{};this.updateCommonProperties();this._buildKongAutomaticVariables();this._automaticVarsListener&&this._automaticVarsListener(this._automaticVars);return this._automaticVars},_startSession:function(){var a=this._getDate(),c=(this._previousSession=this._savedData.current_session)?(a.getTime()-
this._previousSession.active)/1E3:0,n=this._previousSession?(a.getTime()-this._previousSession.start)/1E3:0;c>b?(Kongregate.Log.debug("Terminating previous session ("+this._previousSession.id+"), inactiveFor="+c+", length="+n),c={},c[N]=this._previousSession.id,c[z]=this._numSessions(),c[Ga]=this._toW3CDTF(this._previousSession.active),c[Ha]=n,c[Ia]=!1,this._addAutoEvent(da,c)):this._previousSession&&(this._session=this._previousSession,Kongregate.Log.debug("Reopening previous session ("+this._previousSession.id+
"), inactiveFor="+c+", length="+n));this._session||(this._session={id:this._uuid(),start:a.getTime(),active:a.getTime()},this._savedData.current_session=this._session,a=this._savedData[z]?this._numSessions()+1:1,this._savedData[z]=a,Kongregate.Log.debug("Created new session: "+this._session.id));this._session!=this._previousSession&&(this.addEvent(Kongregate.SwrveClient.SWRVE_SESSION_START_IDENTIFIER,{}),a={},a[Ja]=!1,this._addAutoEvent(ea,a))},_installEvent:function(){if(this._autoAnalyticsAllEnabled()){var a=
{};a[Ka]=null;a[La]=null;a[Ma]=null;a[Na]=null;a[Oa]=null;a[Pa]=null;this._addAutoEvent(fa,a)}else Kongregate.Log.debug("Not firing installs event since analytics mode is not all")},_parseOS:function(a){var c="Unknown",b="Unknown";try{var n=a.split(" ");if(2>n.length)throw Error("Not enough segments in OS string");c=n.shift();"OS"===c&&(c="MacOS",n.shift());b=n.join(" ")}catch(y){Kongregate.Log.error("Error parsing OS version ("+a+"): "+y.toString())}return{type:c,version:b}},_numSessions:function(){return this._savedData[z]||
1},_timeZoneOffset:function(){return this._getDate().getTimezoneOffset()/-60},_daysRetained:function(){var a=this._getDate(),c=this._timeZoneOffset(),b=this._staticVars[t];b&&(a=this._parseW3CDTF(b,null),null===a&&(Kongregate.Log.warn("Failed to parse first play date: "+b+", resetting"),a=this._getDate(),this._savedData[t]=this._toW3CDTF(a),this._flushPersistentStore()));this._staticVars[u]&&(c=this._staticVars[u]);return this._daysSince(a,c)},_dayOfEra:function(a,c){return Math.floor((a+3600*c)/
86400)},_daysSince:function(a,c){var b=Math.floor(this._getDate()/1E3),n=Math.floor(a.getTime()/1E3);return this._dayOfEra(b,this._timeZoneOffset())-this._dayOfEra(n,c)},_objectify:function(a){if("string"===typeof a){if(0===a.length||"function"!==typeof JSON.parse)return{};try{return JSON.parse(a)||{}}catch(c){return Kongregate.Log.warn("Failed to parse JSON: "+a+", error: "+c),{}}}return a},_toW3CDTF:function(a){return Kongregate.Utils.toW3CDTF(a)},_parseW3CDTF:function(a,c){return Kongregate.Utils.parseW3CDTF(a,
c)},_uuid:function(){var a=this._getDate().getTime();window.performance&&"function"===typeof window.performance.now&&(a+=performance.now());return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var b=(a+16*Math.random())%16|0;a=Math.floor(a/16);return("x"==c?b:b&3|8).toString(16)})},_merge:function(a,c){return Kongregate.Utils.merge(a,c)},_getDate:function(){return new Date}};var a="2.0.0",b=300,c="none",d="all",e="cloud",k="ad_tracking",h="bundle_id",g="browser",m="browser_version",
p="carrier",l="client_os_type",r="client_os_version",q="client_version",v="country_code",A="data_connection_type",x="days_retained",s="dev_client_version",n="device_event_id",y="device_type",R="event_time",f="external_ip_address",B="filter_type",w="first_client_version",u="first_play_time_offset",t="first_play_time",F="first_sdk_version",C="first_server_version",va="gamecenter_id",wa="gamecenter_alias",Ba="pur_tier",aa="idfa",ba="idfv",ua="imei",ta="android_id",Da="ip_address",xa="is_valid",na="kong_user_id",
Z="kong_username",Aa="kong_plus",sa="lang_code",Fa="last_skew_refresh_time",za="num_purchases",z="num_sessions",ra="mac_address",M="player_id",pa="sdk_version",O="server_version",N="session_id",Ea="time_skew",ca="total_spent_in_usd",ja="event_time_offset",oa="site_visitor_id",Ca="usd_spent_on_kreds",qa="platform",ya="pkg_src",P="retry_count",G="auto_event",ea="session_starts",Ja="is_from_background",da="session_ends",Ha="session_length_seconds",Ga="session_end_time",Ia="did_crash",fa="installs",Ka=
"stub_field",La="utm_source",Ma="utm_medium",Na="utm_term",Oa="utm_content",Pa="utm_campaign",D="iap_attempts",E="iap_transactions",W="iap_fails",J="usd_cost",ka="product_id",T="iap_id",la="fail_reason",U="receipt_id",L="local_currency_type",K="local_currency_cost",ia="SUCCESS",V="none",Q="player_info",I="kong_join_date",H="pur_link_date",ga=[fa,ea,da,"foreground_visits","background_visits",D,W,E,"invalid_states"],S=["twitter_id","fb_user_id","fb_username","fb_email","email"],X=[ca,t,z,x,y,l,r,v,
Z,N,aa,ba,q],ma="swrve.heartbeat",Y=[0.99,1.99,2.99,3.99,4.99,5.99,6.99,7.99,8.99,9.99,10.99,11.99,12.99,13.99,14.99,15.99,16.99,17.99,18.99,19.99,20.99,21.99,22.99,23.99,24.99,25.99,26.99,27.99,28.99,29.99,30.99,31.99,32.99,33.99,34.99,35.99,36.99,37.99,38.99,39.99,40.99,41.99,42.99,43.99,44.99,45.99,46.99,47.99,48.99,49.99,54.99,59.99,64.99,69.99,74.99,79.99,84.99,89.99,94.99,99.99,109.99,119.99,124.99,129.99,139.99,149.99,159.99,169.99,174.99,179.99,189.99,199.99,209.99,219.99,229.99,239.99,249.99,
299.99,349.99,399.99,449.99,499.99,599.99,699.99,799.99,899.99,999.99],ha="common_properties";Kongregate.AnalyticsServices.KONG_ANALYTICS_EVENT_TIME=R;Kongregate.AnalyticsServices.persistentStoreName=function(a){return"kong-game-analytics-"+a}})();Kongregate.ApiServices=function(a){this.initialize(a)};
Kongregate.ApiServices.prototype={initialize:function(a){this._kongVars=a.kongregate_variables||{};this._messageConnection=a.message_connection;this._eventListeners={};this._requestHandlers={};this._messageQueue=[];this._requestId=0;this._initializeKongVars(this._kongVars);this.initializeEventListeners()},initializeEventListeners:function(){var a=this;this._messageConnection.addMessageListener(function(b,c){a._onIncomingMessage(b,c)})},_initializeKongVars:function(a){a=a||{};this._kongregate="true"===
String(a.kongregate);this._username=a.kongregate_username||"Guest";this._authToken=a.kongregate_game_auth_token;this._userId=parseInt(a.kongregate_user_id,10)||0;this._gameId=parseInt(a.kongregate_game_id,10)||0},addEventListener:function(a,b){this._eventListeners[a]||(this._eventListeners[a]=[]);this._eventListeners[a].push(b)},_dispatchEvent:function(a,b){for(var c=this._eventListeners[a]||[],d=0;d<c.length;d++)c[d](b||{})},connect:function(){},connectExternal:function(){Kongregate.Log.warn("The Kongregate externally hosted API is not available")},
isExternal:function(){return!this.isKongregate()},isKongregate:function(){return this._kongregate},getUsername:function(){return this._username},getGameAuthToken:function(){return this._authToken},getUserId:function(){return this._userId},getUserID:function(){return this.getUserId()},getGameId:function(){return this._gameId},getGameID:function(){return this.getGameId()},isGuest:function(){return 0===this.getUserId()},isConnected:function(){return this._messageConnection.connected()&&!this._messageQueue},
sendMessage:function(a){this.isConnected()?this._messageConnection.sendMessage(a.opcode,a.params):(Kongregate.Log.debug("Queueing message "+a.opcode+" since API is not yet connected!"),this._messageQueue.push(a))},_flushMessageQueue:function(){if(this._messageQueue){var a=this._messageQueue;this._messageQueue=null;Kongregate.Log.debug("Flushing message queue",a);for(var b=0;b<a.length;b++)this.sendMessage(a[b])}},_onIncomingMessage:function(a,b){switch(a){case KonduitEvent.OP_CONNECTED:this.sendMessage({opcode:KonduitEvent.OP_HELLO,
params:{}});this._flushMessageQueue();break;case KonduitEvent.OP_EXTERNAL_MESSAGE:this._onIncomingMessage(b.opcode,b.data);break;case KonduitEvent.OP_SHOUT_CALLBACK:this._onShoutResponse(b);break;case KonduitEvent.OP_USER_INFO:this._onUserInfo(b)}this._dispatchEvent(KonduitEvent.KONDUIT_MESSAGE,{opcode:a,params:b})},_onShoutResponse:function(a){this._completeRequest(a,{type:a[KonduitEvent.PARAM_MESSAGE_TYPE],recipients:a[KonduitEvent.PARAM_MESSAGE_RECIPIENTS],success:a.success,error:a.error})},_onUserInfo:function(a){var b=
a[KonduitEvent.PARAM_USER_ID];if(0!==b){var c=this.isGuest();this._username=a[KonduitEvent.PARAM_USER];this._authToken=a[KonduitEvent.PARAM_GAME_AUTH_TOKEN];this._userId=b;c&&this._dispatchEvent(KonduitEvent.LOGIN)}},privateMessage:function(a,b){if(this._ensureKongregate(b)){var c={shout_message:("string"===typeof a?a:a.content)||""};this._enqueueRequest(c,b);this.sendMessage({opcode:KonduitEvent.OP_CHAT_PRIVATE_MESSAGE,params:c})}},resizeGame:function(a,b){if(this._ensureKongregate()){var c={};c[KonduitEvent.PARAM_RESIZE_GAME_WIDTH]=
a;c[KonduitEvent.PARAM_RESIZE_GAME_HEIGHT]=b;this.sendMessage({opcode:KonduitEvent.OP_CHAT_RESIZE_GAME,params:c})}},showInvitationBox:function(a,b){if(this._ensureKongregate()){var c={};a="string"===typeof a?{content:a}:a;c[KonduitEvent.PARAM_INVITATION_MESSAGE]=a.content||"";c[KonduitEvent.PARAM_FRIEND_FILTER]=a.filter||"";c[KonduitEvent.PARAM_KV_PARAMS]=a.kv_params||{};this._enqueueRequest(c,b);this.sendMessage({opcode:KonduitEvent.OP_CHAT_DISPLAY_INVITATION_BOX,params:c})}},showFeedPostBox:function(a,
b){if(this._ensureKongregate()){var c={};a="string"===typeof a?{content:a}:a;c[KonduitEvent.PARAM_SHOUT_MESSAGE]=a.content||"";c[KonduitEvent.PARAM_KV_PARAMS]=a.kv_params||{};a.image_uri&&(c[KonduitEvent.PARAM_IMAGE_URI]=a.image_uri);this._enqueueRequest(c,b);this.sendMessage({opcode:KonduitEvent.OP_CHAT_DISPLAY_FEED_POST_BOX,params:c})}},showSignInBox:function(){this.showRegistrationBox()},showRegistrationBox:function(){this._ensureKongregate()&&this.isGuest()&&this.sendMessage({opcode:KonduitEvent.OP_CHAT_DISPLAY_REGISTRATION,
params:{}})},showShoutBox:function(a,b){if(this._ensureKongregate()){var c={};c[KonduitEvent.PARAM_SHOUT_MESSAGE]=("string"===typeof a?a:a.content)||"";this._enqueueRequest(c,b);this.sendMessage({opcode:KonduitEvent.OP_CHAT_DISPLAY_SHOUT_BOX,params:c})}},_ensureKongregate:function(a){return!this.isKongregate()?(a&&a({success:!1}),!1):!0},_enqueueRequest:function(a,b){var c=this._nextRequestId();a[KonduitEvent.PARAM_REQUEST_ID]=c;"function"===typeof b&&(this._requestHandlers[c]=b)},_completeRequest:function(a,
b){var c=a[KonduitEvent.PARAM_REQUEST_ID],d=this._requestHandlers[c];"function"===typeof d&&(d(b||a),delete this._requestHandlers[c])},_nextRequestId:function(){return this._requestId+=1}};Kongregate.ChatServices=function(a){this.initialize(a)};Kongregate.ChatServices.DEFAULT_TAB="Default";
Kongregate.ChatServices.prototype={initialize:function(a){var b=this;this._services=a.services;this._eventCallbacks=[];this._services.addEventListener(KonduitEvent.KONDUIT_MESSAGE,function(a){b._onIncomingMessage(a.opcode,a.params)})},showTab:function(a,b,c){var d={};d[KonduitEvent.PARAM_NAME]=a;d[KonduitEvent.PARAM_DESCRIPTION]=b;c&&c.size&&(d[KonduitEvent.PARAM_CANVAS_SIZE]=c.size);this._services.sendMessage({opcode:KonduitEvent.OP_CHAT_TAB,params:d})},closeTab:function(){this.showTab(Kongregate.ChatServices.DEFAULT_TAB)},
displayMessage:function(a,b){var c={};c[KonduitEvent.PARAM_DATA]=a;c[KonduitEvent.PARAM_USER]=b;this._services.sendMessage({opcode:KonduitEvent.OP_CHAT_DISPLAY,params:c})},clearMessages:function(){this._services.sendMessage({opcode:KonduitEvent.OP_CHAT_CLEAR_DIALOG})},displayCanvasImage:function(a,b,c){var d={};d[KonduitEvent.PARAM_DATA]={type:"image",name:a,url:b,position:c};this._services.sendMessage({opcode:KonduitEvent.OP_CHAT_CANVAS_ELEMENT,params:d})},displayCanvasText:function(a,b,c,d){var e=
{};e[KonduitEvent.PARAM_DATA]={type:"text",name:a,text:b,position:c,options:d};this._services.sendMessage({opcode:KonduitEvent.OP_CHAT_CANVAS_ELEMENT,params:e})},drawCanvasObject:function(a,b){var c={};c[KonduitEvent.PARAM_DATA]={type:"draw",name:a,commands:b};this._services.sendMessage({opcode:KonduitEvent.OP_CHAT_CANVAS_ELEMENT,params:c})},removeCanvasObject:function(a){var b={};b[KonduitEvent.PARAM_DATA]={type:"remove",name:a};this._services.sendMessage({opcode:KonduitEvent.OP_CHAT_CANVAS_ELEMENT,
params:b})},_onIncomingMessage:function(a,b){switch(a){case KonduitEvent.OP_CHAT_MSG:this._handleChatEvent("message",b);break;case KonduitEvent.OP_CHAT_ROOM_MESSAGE:this._handleChatEvent("room.message",b);break;case KonduitEvent.OP_CHAT_TAB:this._handleChatEvent("tab_visible",b)}},addEventListener:function(a,b){"function"!==typeof b?Kongregate.Log.error("addEventListener requires a callback function"):(this._eventCallbacks[a]||(this._eventCallbacks[a]=[]),this._eventCallbacks[a].push(b))},_handleChatEvent:function(a,
b){var c=this._eventCallbacks[a];if(c)for(var d=0;d<c.length;d++)c[d](b)}};Kongregate.ImageServices=function(a){this.initialize(a)};
Kongregate.ImageServices.prototype={initialize:function(a){var b=this;this._services=a.services;this._submitting=!1;this._callback=null;this._services.addEventListener(KonduitEvent.KONDUIT_MESSAGE,function(a){b._onIncomingMessage(a.opcode,a.params)})},submitAvatar:function(a,b){this._submitting?(Kongregate.Log.warn("Another avatar submission is active, ignoring"),b&&b({success:!1})):(this._submitting=!0,this._callback=b,this._services.sendMessage({opcode:KonduitEvent.OP_IMAGE_AVATAR_SUBMIT,params:{image:a}}))},
_onIncomingMessage:function(a,b){KonduitEvent.OP_IMAGE_AVATAR_FINISHED===a&&(this._submitting=!1,this._callback&&this._callback(b.success))}};function KongregateAPI(){this._initialize()}
KongregateAPI.prototype={unityElementId:null,_initialize:function(){this._flashVarsString="";this._flashVarsObject={};this._services={};this._postMessageParams=void 0;this._loaded=this._paramsReceived=!1;this._klient=Kongregate.Utils.isKlient();this._queuedMessages=[];this._loadCallbacks=[];this._processParentKongregateParams();this._processParams(location.search.split("?")[1]);this._updateDebugLevel();this._kongWindow=Kongregate.Utils.findKongregateWindow();if(this._postMessageParams=!this.flashVarsObject().kongregate_username&&
top!=window){var a=this;Kongregate.polyfillJSON();Kongregate.PostMessage.addMessageListener(window,function(b){a._messageOriginIsKongregate(b)&&(b=Kongregate.PostMessage.parseMessage(b.data))&&"params"===b.type&&a._handleParamsMessage(b.data)});this._kongWindow.postMessage("kongregate_request_params","*")}else this._paramsReceived=!0;setTimeout(this._hijackUnityErrorHandler,0)},flashVarsString:function(){return this._flashVarsString},flashVarsObject:function(){return this._flashVarsObject},getVariable:function(a){return this._flashVarsObject[a]},
loadAPI:function(a){!this._postMessageParams||this._paramsReceived?this._doLoadAPI(a):this._loadCallbacks.push(a)},getAPI:function(){return this._services},embedFrame:function(a,b){try{console.warn("KONGREGATE WARNING: The Kongregate Shell and embedFrame method are deprecated, and it is very unlikely that this functionality is really needed. See the note on the documentation page: https://docs.kongregate.com/v1.0/docs/concepts-kongregate-shell")}catch(c){}var d=document.getElementById(b?b:"contentdiv"),
e;e="<iframe id='content' frameborder='0' style='position:relative;top:0px;left:0px;"+("border:0px none;padding:0px;width:"+d.offsetWidth+"px;height:"+d.offsetHeight+"px;'");e+="src='"+a+"'></iframe>";d.innerHTML=e},_forwardToKlient:function(a,b){this._klient&&top.postMessage({type:"kongregate:api-message:"+b,message:a},"*")},_setGameSwf:function(a){var b=this.flashVarsObject(),c=this,d=this._findSwf(a);d?(this._gameSwf=d,this.messageConnection=this.messageConnection||this._createMessageConnection(b),
this.messageConnection.isSupported()?setTimeout(function(){c._gameSwf.setConnectionObject("kongregateAPI.messageConnection")?c.messageConnection.connect():Kongregate.Log.warn("setConnectionObject returned false, not connecting")},1):(Kongregate.Log.debug("MessageConnection isSupported was false"),setTimeout(function(){c._gameSwf.setConnectionObject(null)},1))):Kongregate.Log.debug("Kongregate game SWF element does not appear to be a swf: "+a)},_isSwf:function(a){return a&&"undefined"!==typeof a.Play&&
"undefined"!==typeof a.setConnectionObject},_findSwf:function(a){var b=document.getElementById(a),c=this,d=function(a){for(var d=0;d<a.length;d++)if(b=a[d],c._isSwf(b))return b};return this._isSwf(b)?b:b=d(document.getElementsByName(a))||d(document.querySelectorAll("[id='"+a+"']"))||d(document.getElementsByTagName("object"))||d(document.getElementsByTagName("embed"))},_updateDebugLevel:function(){Kongregate.Log.debugLevel=this._flashVarsObject.kongregate_debug_level||2},_processParentKongregateParams:function(a){try{for(var b=
window.parent;b!==top;){try{b.kongregateAPI&&this._processParams(b.kongregateAPI.flashVarsString())}catch(c){}b=b.parent}}catch(d){}},_handleParamsMessage:function(a){if(!this._paramsReceived){for(var b in a)this._processParam(b,a[b]);this._paramsReceived=!0;this._updateDebugLevel();this._hijackUnityErrorHandler();0<this._loadCallbacks.length&&this._doLoadAPI()}},_fireLoadCallbacks:function(){var a=this._loadCallbacks.length;Kongregate.Log.debug("Kongregate API: Firing "+a+" load callback(s)");for(var b=
0;b<a;b++){var c=this._loadCallbacks[b];"function"===typeof c&&setTimeout(c,0)}this._loadCallbacks=[]},_checkAlreadyLoaded:function(){this._loaded&&this._fireLoadCallbacks();return this._loaded},_doLoadAPI:function(a){var b=this;Kongregate.contentLoaded(function(){b._loadCallbacks.push(a);b._checkAlreadyLoaded()||(b._loaded=!0,Kongregate.polyfillJSON(),b._hijackUnityErrorHandler(),b.messageConnection=b._createMessageConnection(),b._createJavascriptApi(),b._fireLoadCallbacks())})},_processParams:function(a){if(a){a=
a.split("&");for(var b=0;b<a.length;b++){var c=a[b].split("=");c&&2==c.length&&this._processParam(c[0],c[1])}}},_processParam:function(a,b){0===a.indexOf("kongregate")&&(this._flashVarsObject[a]=b,this._flashVarsString+=a+"="+b+"&")},_messageOriginIsKongregate:function(a){var b=decodeURIComponent(this._flashVarsObject.kongregate_host||"");a=a.origin;return b&&(a===b||a=="http://"+b||a=="https://"+b)},_createJavascriptApi:function(){var a=this;this._services.services=new Kongregate.ApiServices({kongregate_variables:this.flashVarsObject(),
message_connection:this.messageConnection});this._services.stats=new Kongregate.StatisticServices({services:this._services.services});this._services.sharedContent=new Kongregate.SharedContentServices({services:this._services.services});this._services.images=new Kongregate.ImageServices({services:this._services.services});this._services.mtx=new Kongregate.MicrotransactionServices({services:this._services.services});this._services.chat=new Kongregate.ChatServices({services:this._services.services});
this._services.analytics=new Kongregate.AnalyticsServices({services:this._services.services,mtx:this._services.mtx,kongregate_variables:this.flashVarsObject(),enable_persistence:!0,start:!0});setTimeout(function(){a.messageConnection.connect()},0)},_createMessageConnection:function(){var a=this,b=this.flashVarsObject(),b={target_window:this._kongWindow,target_origin:decodeURIComponent(b.kongregate_host),channel_id:b.kongregate_channel_id,retry_connection:!0};this._klient&&(b.send_listener=function(c,
b){a._forwardToKlient({opcode:c,params:b},"out")});b=new Kongregate.MessageConnection(b);b.isSupported()&&b.addMessageListener(function(c,b){var e=a._gameSwf,k={opcode:c,params:b};e&&"function"===typeof e.handleMessageConnectionEvent&&e.handleMessageConnectionEvent(JSON.stringify(k));a._forwardToKlient(k,"in")});return b},_hijackUnityErrorHandler:function(){try{kongregateUnitySupport.hijackUnityErrorHandler()}catch(a){}}};kongregateAPI=new KongregateAPI;
!function(a){function b(a){for(var c=16;c--;){var b=c<<2;m[c]=a.charCodeAt(b)+(a.charCodeAt(b+1)<<8)+(a.charCodeAt(b+2)<<16)+(a.charCodeAt(b+3)<<24)}}function c(a,c,b,d,e,g,h){c+=a+d+h;return(c<<e|c>>>g)+b<<0}function d(a){k(0,0,0,0,a);q[0]=s[0]+1732584193<<0;q[1]=s[1]-271733879<<0;q[2]=s[2]-1732584194<<0;q[3]=s[3]+271733878<<0}function e(a){k(q[0],q[1],q[2],q[3],a);q[0]=s[0]+q[0]<<0;q[1]=s[1]+q[1]<<0;q[2]=s[2]+q[2]<<0;q[3]=s[3]+q[3]<<0}function k(a,b,d,f,e){var g;v?(a=c((d^f)&b^f,a,b,e[0],7,25,-680876936),
f=c((b^d)&a^d,f,a,e[1],12,20,-389564586),d=c((a^b)&f^b,d,f,e[2],17,15,606105819),b=c((f^a)&d^a,b,d,e[3],22,10,-1044525330)):(a=e[0]-680876937,a=(a<<7|a>>>25)-271733879<<0,f=e[1]-117830708+(2004318071&a^-1732584194),f=(f<<12|f>>>20)+a<<0,d=e[2]-1126478375+((a^-271733879)&f^-271733879),d=(d<<17|d>>>15)+f<<0,b=e[3]-1316259209+((f^a)&d^a),b=(b<<22|b>>>10)+d<<0);a=c((d^f)&b^f,a,b,e[4],7,25,-176418897);f=c((b^d)&a^d,f,a,e[5],12,20,1200080426);d=c((a^b)&f^b,d,f,e[6],17,15,-1473231341);b=c((f^a)&d^a,b,d,
e[7],22,10,-45705983);a=c((d^f)&b^f,a,b,e[8],7,25,1770035416);f=c((b^d)&a^d,f,a,e[9],12,20,-1958414417);d=c((a^b)&f^b,d,f,e[10],17,15,-42063);b=c((f^a)&d^a,b,d,e[11],22,10,-1990404162);a=c((d^f)&b^f,a,b,e[12],7,25,1804603682);f=c((b^d)&a^d,f,a,e[13],12,20,-40341101);d=c((a^b)&f^b,d,f,e[14],17,15,-1502002290);b=c((f^a)&d^a,b,d,e[15],22,10,1236535329);a=c((b^d)&f^d,a,b,e[1],5,27,-165796510);f=c((a^b)&d^b,f,a,e[6],9,23,-1069501632);d=c((f^a)&b^a,d,f,e[11],14,18,643717713);b=c((d^f)&a^f,b,d,e[0],20,12,
-373897302);a=c((b^d)&f^d,a,b,e[5],5,27,-701558691);f=c((a^b)&d^b,f,a,e[10],9,23,38016083);d=c((f^a)&b^a,d,f,e[15],14,18,-660478335);b=c((d^f)&a^f,b,d,e[4],20,12,-405537848);a=c((b^d)&f^d,a,b,e[9],5,27,568446438);f=c((a^b)&d^b,f,a,e[14],9,23,-1019803690);d=c((f^a)&b^a,d,f,e[3],14,18,-187363961);b=c((d^f)&a^f,b,d,e[8],20,12,1163531501);a=c((b^d)&f^d,a,b,e[13],5,27,-1444681467);f=c((a^b)&d^b,f,a,e[2],9,23,-51403784);d=c((f^a)&b^a,d,f,e[7],14,18,1735328473);b=c((d^f)&a^f,b,d,e[12],20,12,-1926607734);
g=b^d;a=c(g^f,a,b,e[5],4,28,-378558);f=c(g^a,f,a,e[8],11,21,-2022574463);g=f^a;d=c(g^b,d,f,e[11],16,16,1839030562);b=c(g^d,b,d,e[14],23,9,-35309556);g=b^d;a=c(g^f,a,b,e[1],4,28,-1530992060);f=c(g^a,f,a,e[4],11,21,1272893353);g=f^a;d=c(g^b,d,f,e[7],16,16,-155497632);b=c(g^d,b,d,e[10],23,9,-1094730640);g=b^d;a=c(g^f,a,b,e[13],4,28,681279174);f=c(g^a,f,a,e[0],11,21,-358537222);g=f^a;d=c(g^b,d,f,e[3],16,16,-722521979);b=c(g^d,b,d,e[6],23,9,76029189);g=b^d;a=c(g^f,a,b,e[9],4,28,-640364487);f=c(g^a,f,a,
e[12],11,21,-421815835);g=f^a;d=c(g^b,d,f,e[15],16,16,530742520);b=c(g^d,b,d,e[2],23,9,-995338651);a=c(d^(b|~f),a,b,e[0],6,26,-198630844);f=c(b^(a|~d),f,a,e[7],10,22,1126891415);d=c(a^(f|~b),d,f,e[14],15,17,-1416354905);b=c(f^(d|~a),b,d,e[5],21,11,-57434055);a=c(d^(b|~f),a,b,e[12],6,26,1700485571);f=c(b^(a|~d),f,a,e[3],10,22,-1894986606);d=c(a^(f|~b),d,f,e[10],15,17,-1051523);b=c(f^(d|~a),b,d,e[1],21,11,-2054922799);a=c(d^(b|~f),a,b,e[8],6,26,1873313359);f=c(b^(a|~d),f,a,e[15],10,22,-30611744);d=
c(a^(f|~b),d,f,e[6],15,17,-1560198380);b=c(f^(d|~a),b,d,e[13],21,11,1309151649);a=c(d^(b|~f),a,b,e[4],6,26,-145523070);f=c(b^(a|~d),f,a,e[11],10,22,-1120210379);d=c(a^(f|~b),d,f,e[2],15,17,718787259);b=c(f^(d|~a),b,d,e[9],21,11,-343485551);s[0]=a;s[1]=b;s[2]=d;s[3]=f}var h=[],g=[],m=[],p=[],l="0123456789abcdef".split(""),r=[],q=[],v=!1,A=0,x=0,s=[];if(a.Int32Array)g=new Int32Array(16),m=new Int32Array(16),p=new Int32Array(4),r=new Int32Array(4),q=new Int32Array(4),s=new Int32Array(4);else{for(a=0;16>
a;a++)g[a]=m[a]=0;for(a=0;4>a;a++)p[a]=r[a]=q[a]=s[a]=0}p[0]=128;p[1]=32768;p[2]=8388608;p[3]=-2147483648;r[0]=0;r[1]=8;r[2]=16;r[3]=24;Kongregate.Utils.md5=function(a,c,k){if(!c){for(var f=c="",s=0,w=0,u=0,t=a.length;u<t;u++)f=a.charCodeAt(u),128>f?w++:(f=2048>f?String.fromCharCode(f>>6|192,f&63|128):String.fromCharCode(f>>12|224,f>>6&63|128,f&63|128),w>s&&(c+=a.slice(s,w)),c+=f,s=w=u+1);w>s&&(c+=a.slice(s,t));a=c}a+="";v=!1;A=x=a.length;if(63<x){b(a.substring(0,64));d(m);v=!0;for(c=128;c<=x;c+=
64)b(a.substring(c-64,c)),e(m);a=a.substring(c-64);x=a.length}for(c=g[0]=g[1]=g[2]=g[3]=g[4]=g[5]=g[6]=g[7]=g[8]=g[9]=g[10]=g[11]=g[12]=g[13]=g[14]=g[15]=0;c<x;c++)s=c&3,g[c>>2]=0===s?a.charCodeAt(c):g[c>>2]|a.charCodeAt(c)<<r[s];g[c>>2]|=p[c&3];55<c?(v?e(g):(d(g),v=!0),e([0,0,0,0,0,0,0,0,0,0,0,0,0,0,A<<3,0])):(g[14]=A<<3,v?e(g):d(g));a=q[0];h[1]=l[a&15];h[0]=l[(a>>=4)&15];h[3]=l[(a>>=4)&15];h[2]=l[(a>>=4)&15];h[5]=l[(a>>=4)&15];h[4]=l[(a>>=4)&15];h[7]=l[(a>>=4)&15];h[6]=l[a>>4&15];a=q[1];h[9]=l[a&
15];h[8]=l[(a>>=4)&15];h[11]=l[(a>>=4)&15];h[10]=l[(a>>=4)&15];h[13]=l[(a>>=4)&15];h[12]=l[(a>>=4)&15];h[15]=l[(a>>=4)&15];h[14]=l[a>>4&15];a=q[2];h[17]=l[a&15];h[16]=l[(a>>=4)&15];h[19]=l[(a>>=4)&15];h[18]=l[(a>>=4)&15];h[21]=l[(a>>=4)&15];h[20]=l[(a>>=4)&15];h[23]=l[(a>>=4)&15];h[22]=l[a>>4&15];a=q[3];h[25]=l[a&15];h[24]=l[(a>>=4)&15];h[27]=l[(a>>=4)&15];h[26]=l[(a>>=4)&15];h[29]=l[(a>>=4)&15];h[28]=l[(a>>=4)&15];h[31]=l[(a>>=4)&15];h[30]=l[a>>4&15];return k?h:h.join("")}}("undefined"===typeof global?
window:global);Kongregate.MicrotransactionServices=function(a){this.initialize(a)};
Kongregate.MicrotransactionServices.prototype={initialize:function(a){var b=this;this._services=a.services;this._services.addEventListener(KonduitEvent.KONDUIT_MESSAGE,function(a){b._onIncomingMessage(a.opcode,a.params)});this._adCallbacks=[]},requestItemList:function(a,b){Kongregate.Log.info("MicrotransactionServices.requestItemList("+a+")");var c={};a&&0<a.length&&(c[KonduitEvent.PARAM_ITEM_TAGS]=a);this._services._enqueueRequest(c,b);this._services.sendMessage({opcode:KonduitEvent.ITEM_LIST,params:c})},
requestUserItemList:function(a,b){Kongregate.Log.info("MicrotransactionServices.requestUserItemList("+a+")");var c={};c[KonduitEvent.PARAM_USER]=a||this._services.getUsername();this._services._enqueueRequest(c,b);this._services.sendMessage({opcode:KonduitEvent.ITEM_INSTANCES,params:c})},purchaseItems:function(a,b){Kongregate.Log.info("MicrotransactionServices.purchaseItems("+a+")");var c={};a&&0<a.length?(this._purchaseItemsCallback=b,c[KonduitEvent.PARAM_ITEMS]=a,this._services.sendMessage({opcode:KonduitEvent.ITEM_CHECKOUT,
params:c})):(Kongregate.Log.error("purchaseItems requires a non-empty item identifier array"),b&&b({success:!1}))},purchaseItemsRemote:function(a,b){Kongregate.Log.info("MicrotransactionServices.purchaseItemsRemote("+a+")");var c={};a&&0<String(a).length?(this._purchaseItemsCallback=b,c[KonduitEvent.PARAM_ORDER_INFO]=String(a),this._services.sendMessage({opcode:KonduitEvent.ITEM_CHECKOUT,params:c})):(Kongregate.Log.error("purchaseItemsRemote requires an orderInformation string"),b&&b({success:!1}))},
useItemInstance:function(a,b){Kongregate.Log.info("MicrotransactionServices.useItemInstance("+a+")");var c={};a?(c[KonduitEvent.PARAM_ID]=a,this._services._enqueueRequest(c,b),this._services.sendMessage({opcode:KonduitEvent.USE_ITEM_INSTANCE,params:c})):(Kongregate.Log.error("useItemInstance requires an itemInstanceId"),b&&b({success:!1}))},showKredPurchaseDialog:function(a){var b={};b[KonduitEvent.PARAM_PURCHASE_METHOD]=a;this._services.sendMessage({opcode:KonduitEvent.PURCHASE_KREDS,params:b})},
initializeIncentivizedAds:function(){this._services.sendMessage({opcode:KonduitEvent.ADS_INITIALIZE})},showIncentivizedAd:function(){this._services.sendMessage({opcode:KonduitEvent.ADS_SHOW_INCENTIVIZED})},addEventListener:function(a,b){"function"!==typeof b?Kongregate.Log.error("addEventListener requires a callback function"):(this._adCallbacks[a]||(this._adCallbacks[a]=[]),this._adCallbacks[a].push(b))},_onIncomingMessage:function(a,b){switch(a){case KonduitEvent.ITEM_INSTANCES:case KonduitEvent.ITEM_LIST:case KonduitEvent.USE_ITEM_INSTANCE:this._services._completeRequest(b);
break;case KonduitEvent.PURCHASE_RESULT:this._onPurchaseResultResponse(b);break;case KonduitEvent.ADS_AVAILABLE:this._handleAdEvent("adsAvailable",b);break;case KonduitEvent.ADS_UNAVAILABLE:this._handleAdEvent("adsUnavailable",b);break;case KonduitEvent.AD_OPENED:this._handleAdEvent("adOpened",b);break;case KonduitEvent.AD_COMPLETED:this._handleAdEvent("adCompleted",b);break;case KonduitEvent.AD_ABANDONED:this._handleAdEvent("adAbandoned",b)}},_onPurchaseResultResponse:function(a){this._purchaseItemsCallback&&
(this._purchaseItemsCallback(a),this._purchaseItemsCallback=null)},_handleAdEvent:function(a,b){var c=this._adCallbacks[a];if(c)for(var d=0;d<c.length;d++)c[d](b)}};Kongregate.SharedContentServices=function(a){this.initialize(a)};Kongregate.SharedContentServices.CONTENT_TYPE_LIMIT=12;
Kongregate.SharedContentServices.prototype={initialize:function(a){var b=this;this._services=a.services;this._loadListeners={};this._services.addEventListener(KonduitEvent.KONDUIT_MESSAGE,function(a){b._onIncomingMessage(a.opcode,a.params)})},browse:function(a,b,c){var d={};d[KonduitEvent.PARAM_CONTENT_TYPE]=a;c&&(d[KonduitEvent.PARAM_LABEL]=c);b&&(d[KonduitEvent.PARAM_SORT]=b);this._services.sendMessage({opcode:KonduitEvent.OP_BROWSE_SHARED_CONTENT,params:d})},save:function(a,b,c,d,e){if(this._saving||
a.length>Kongregate.SharedContentServices.CONTENT_TYPE_LIMIT)c&&c({success:!1});else{var k={};k[KonduitEvent.PARAM_CONTENT_TYPE]=a;k[KonduitEvent.PARAM_LABEL]=e;k[KonduitEvent.PARAM_DATA]=b;k[KonduitEvent.PARAM_IMAGE]=d;this._services.sendMessage({opcode:KonduitEvent.OP_SAVE_SHARED_CONTENT,params:k});this._saving=!0;this._saveCallback=c}},addLoadListener:function(a,b){this._loadListeners[a]||(this._loadListeners[a]=[]);this._loadListeners[a].push(b)},_onIncomingMessage:function(a,b){switch(a){case KonduitEvent.OP_SHARED_CONTENT_SAVE_COMPLETE:this._onSaveContentComplete(b);
break;case KonduitEvent.OP_LOAD_SHARED_CONTENT:this._onLoadSharedContent(b)}},_onSaveContentComplete:function(a){this._saving=!1;this._saveCallback&&(this._saveCallback(a),this._saveCallback=null)},_onLoadSharedContent:function(a){var b=a.contentType;a={id:a.id,name:a.name,permalink:a.permalink,content:a.content,label:a.label};Kongregate.Log.info({loadContent:a});for(var b=this._loadListeners[b]||[],c=0;c<b.length;c++)b[c](a)}};Kongregate.StatisticServices=function(a){this.initialize(a)};
Kongregate.StatisticServices.prototype={initialize:function(a){this._services=a.services},submit:function(a,b){Kongregate.Log.info("StatServices.submit("+a+","+b+")");!a||null===b||void 0===b||isNaN(b)?Kongregate.Log.warn("Invalid stat name or value:",a,b):this._services.sendMessage({opcode:KonduitEvent.OP_STATS_SUBMIT,params:{stats:[{name:a,value:b}]}})},submitArray:function(a){if(a&&a.length)for(var b=0;b<a.length;b++)this.submit(a[b].name,a[b].value)}};
(function(){Kongregate.SwrveClient=function(a){this.initialize(a)};var a=Kongregate.SwrveClient;Kongregate.SwrveClient.prototype={initialize:function(a){this._applicationId=a.application_id;this._apiKey=a.api_key;this._playerId=a.player_id;this._clientVersion=a.client_version},sendEvents:function(a,b){var e=new XMLHttpRequest,k=a.length,h=this,g=function(e){h._onError(a,k,e,b)};e.open("POST","https://"+this._applicationId+".api.swrve.com/1/batch");e.setRequestHeader("Content-Type","application/json; charset=utf-8");
e.onerror=e.onabort=g;e.onload=function(){h._onBatchResponse(e,a,k,b,g)};"undefined"!==typeof e.timeout&&(e.timeout=3E4,e.ontimeout=g);e.send(JSON.stringify(this._createPayload(a)))},_onBatchResponse:function(a,b,e,k,h){var g=!1;if(200===a.status){var m=a.responseText;(g=0===m.length)||(g=200===JSON.parse(m).code)}g?(Kongregate.Log.debug("SWRVE submission complete, "+e+" event(s)"),b.splice(0,e),k&&k({success:!0})):(Kongregate.Log.error("Error while parsing swrve result: "+a.status+", removing "+
e+" event(s)"),h(!0))},_onError:function(a,b,e,k){for(var h=0;h<b&&h<a.length;h++){var g=a[h];if(g){var m=(g.event.retry_count||0)+(e?this._maxRetries()+1:1);g.event.retry_count=m}}this._pruneEvents(a);k&&k({success:!1})},_createPayload:function(b){for(var d={app_version:this._clientVersion,session_token:this._createSessionToken(),user:this._playerId},e=[],k=0;k<b.length;k++){var h=b[k],g=h.name,m=this._getTime(h),h=Kongregate.Utils.merge({},h.event);this._removeTransientProperties(h);a.SWRVE_SESSION_START_IDENTIFIER===
g?e.push({type:"session_start",time:m}):a.SWRVE_USER_IDENTIFIER===g?e.push({type:"user",time:m,attributes:h}):a.SWRVE_IAP_IDENTIFIER===g?e.push(Kongregate.Utils.merge({type:"iap",time:m},h)):0===g.indexOf("swrve.")?(g=g.replace("swrve.","Kongregate."),e.push({type:"event",name:g,time:m,payload:h})):(g="Kongregate.RawData."+g,e.push({type:"event",name:g,time:m,payload:{data:JSON.stringify(h)}}))}d.data=e;return d},_pruneEvents:function(a){for(var b=a.length-1;0<=b;b--)a[b].event&&a[b].event.retry_count>
this._maxRetries()&&(Kongregate.Log.debug("Event "+a[b].name+" is over max retry count, deleting it"),a.splice(b,1));b=this._maxBacklogSize();a&&a.length>b&&a.splice(0,a.length-b)},_removeTransientProperties:function(a){for(var d=0;d<b.length;d++){var e=b[d];void 0!==a[e]&&delete a[e]}},_createSessionToken:function(){var a=Math.floor(this._getDate().getTime()/1E3);return this._applicationId+"="+this._playerId+"="+String(a)+"="+Kongregate.Utils.md5(this._playerId+String(a)+this._apiKey)},_maxRetries:function(){return 2},
_maxBacklogSize:function(){return 100},_getDate:function(){return new Date},_getTime:function(a){var b=this._getDate();a.event&&a.event[Kongregate.AnalyticsServices.KONG_ANALYTICS_EVENT_TIME]&&(b=Kongregate.Utils.parseW3CDTF(a.event[Kongregate.AnalyticsServices.KONG_ANALYTICS_EVENT_TIME],this._getDate()));return Math.floor(b.getTime()/1E3)}};a.SWRVE_EVENT_IDENTIFIER="swrve.";a.SWRVE_BARE_EVENT_IDENTIFIER=a.SWRVE_EVENT_IDENTIFIER+"__bare_";a.SWRVE_SESSION_START_IDENTIFIER=a.SWRVE_BARE_EVENT_IDENTIFIER+
"session_start";a.SWRVE_USER_IDENTIFIER=a.SWRVE_BARE_EVENT_IDENTIFIER+"user";a.SWRVE_IAP_IDENTIFIER=a.SWRVE_BARE_EVENT_IDENTIFIER+"iap";var b=["auto_event","retry_count"]})();
(function(){Kongregate.Utils.merge=function(a,c){if(!a||!c)return a;for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d]);return a};Kongregate.Utils.toW3CDTF=function(a){function c(a){return 10>a?"0"+a:a}return!(a instanceof Date)?"":a.getUTCFullYear()+"-"+c(a.getUTCMonth()+1)+"-"+c(a.getUTCDate())+"T"+c(a.getUTCHours())+":"+c(a.getUTCMinutes())+":"+c(a.getUTCSeconds())+"."+(a.getUTCMilliseconds()/1E3).toFixed(3).slice(2,5)+"-00:00"};Kongregate.Utils.parseW3CDTF=function(b,c){var d;try{var e,k=0,h=[1,4,
5,6,7,10,11];if(e=a.exec(b)){for(var g=0,m;m=h[g];++g)e[m]=+e[m]||0;e[2]=(+e[2]||1)-1;e[3]=+e[3]||1;"Z"!==e[8]&&void 0!==e[9]&&(k=60*e[10]+e[11],"+"===e[9]&&(k=0-k));d=new Date(Date.UTC(e[1],e[2],e[3],e[4],e[5]+k,e[6],e[7]))}if(!d||"Invalid Date"===d.toString())throw Error("This date does not conform to W3CDTF.");}catch(p){return d="Unable to parse the string ["+b+"] into a date. "+("The internal error was: "+p.toString()),Kongregate.Log.error(d),c}return d};Kongregate.Utils.indexOf=function(a,c){if(!a)return-1;
if("function"===typeof a.indexOf)return a.indexOf(c);for(var d=0;d<a.length;d++)if(a[d]===c)return d;return-1};var a=/^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/})();
"undefined"==typeof kongregateUnitySupport&&(kongregateUnitySupport=function(){function a(a){a=h.getElementById(a);if(!a)return null;var b;r.win&&r.ie?(a=a.getElementsByTagName("object")[0])&&"OBJECT"==a.nodeName&&(b=a):(a=a.getElementsByTagName("embed")[0])&&"EMBED"==a.nodeName&&(b=a);return b&&typeof b.GetPluginVersion==e?null:b}function b(){var b=typeof kongregateAPI!=e&&kongregateAPI.unityGameInstance?kongregateAPI.unityGameInstance:"function"===typeof window.SendMessage?window:window.gameInstance&&
"function"===typeof window.gameInstance.SendMessage?window.gameInstance:null;if(b)return b;b="kongregateUnityDiv";typeof kongregateAPI!=e&&kongregateAPI.unityElementId&&(b=kongregateAPI.unityElementId);return a(b)||a("unityPlayer")}function c(){return[kongregate.services.getUserId(),kongregate.services.getUsername(),kongregate.services.getGameAuthToken()].join("|")}var d=[],e="undefined",k=navigator,h=document,g=k.userAgent,k=k.platform,m=!1,p=/chrome/i.test(g),l={};/msie/i.test(g)?m=parseFloat(g.replace(/^.*msie ([0-9]+(\.[0-9]+)?).*$/i,
"$1")):/Trident/i.test(g)&&(m=parseFloat(g.replace(/^.*rv:([0-9]+(\.[0-9]+)?).*$/i,"$1")));var r={w3:typeof h.getElementById!=e&&typeof h.getElementsByTagName!=e&&typeof h.createElement!=e,win:k?/win/i.test(k):/win/i.test(g),mac:k?/mac/i.test(k):/mac/i.test(g),ie:m,ff:/firefox/i.test(g),op:/opera/i.test(g),ch:p,ch_v:/chrome/i.test(g)?parseFloat(g.replace(/^.*chrome\/(\d+(\.\d+)?).*$/i,"$1")):!1,sf:/safari/i.test(g)&&!p,wk:/webkit/i.test(g)?parseFloat(g.replace(/^.*webkit\/(\d+(\.\d+)?).*$/i,"$1")):
!1,x64:/win64/i.test(g)&&/x64/i.test(g),moz:/mozilla/i.test(g)?parseFloat(g.replace(/^.*mozilla\/([0-9]+(\.[0-9]+)?).*$/i,"$1")):0,mobile:/ipad/i.test(k)||/iphone/i.test(k)||/ipod/i.test(k)||/android/i.test(g)||/windows phone/i.test(g)};r.clientBrand=r.ch?"ch":r.ff?"ff":r.sf?"sf":r.ie?"ie":r.op?"op":"??";r.clientPlatform=r.win?"win":r.mac?"mac":"???";return{onUnityEmbed:function(a){$("unity_missing")&&(a.success?"missingUnityObject"==a.id?($("missingUnityObject").update(""),$("kongregateUnityDiv").update(""),
top.location.replace(decodeURIComponent(kongregateAPI.getVariable("kongregate_game_url")))):$("unity_missing").remove():$("unity_missing").show())},initAPI:function(a,e){d.push({object:a||"KongregateAPI",callback:e||"OnKongregateAPILoaded"});kongregateAPI.loadAPI(function(){"undefined"===typeof kongregate&&(kongregate=kongregateAPI.getAPI());for(var a=0;a<d.length;a++){var e=d[a];b().SendMessage(e.object,e.callback,c())}d=[]})},getUnityObject:function(){return b()},getUserInfoString:function(){return c()},
hijackUnityErrorHandler:function(){if(!kongregateAPI.disableUnityErrorHandler&&!this.unityErrorHandlerInstalled){var a=function(a){if(a.match(/Permission denied to access property/)){try{console.error("Caught error: "+a)}catch(b){}return!0}try{var c;b:{if("string"===typeof a){if(-1!==a.indexOf("Cannot enlarge memory arrays")){c="UnityWebGL:Memory:WebGL";break b}if(-1!==a.indexOf("out of memory")){c="UnityWebGL:Memory:Browser";break b}}c=void 0}if(c&&!l[c]){var d=decodeURIComponent(kongregateAPI.flashVarsObject().kongregate_host||
"*");l[c]=!0;top.postMessage({kongregateGameError:{type:c}},d)}}catch(e){}};if("undefined"!==typeof UnityLoader&&UnityLoader.Error&&UnityLoader.Error.handler){var b=UnityLoader.Error.handler;UnityLoader.Error.handler=function(c){return a(c.message)?!0:"function"===typeof b&&b.apply(UnityLoader.Error,arguments)};this.unityErrorHandlerInstalled=!0}var c=window.Module;if(c&&c.TOTAL_MEMORY&&c.codeUrl){var d=c.errorhandler;c.errorhandler=function(b,c,e){return a(b)?!0:"function"===typeof d&&d(b,c,e)};
this.unityErrorHandlerInstalled=!0}}}}}());

/// <reference path="../typings/PlayFab/PlayFabClientApi.d.ts" />

var PlayFab = typeof PlayFab != "undefined" ? PlayFab : {};

if(!PlayFab.settings) {
    PlayFab.settings = {
        titleId: null, // You must set this value for PlayFabSdk to work properly (Found in the Game Manager for your title, at the PlayFab Website)
        developerSecretKey: null, // For security reasons you must never expose this value to the client or players - You must set this value for Server-APIs to work properly (Found in the Game Manager for your title, at the PlayFab Website)
        advertisingIdType: null,
        advertisingIdValue: null,
        GlobalHeaderInjection: null,

        // disableAdvertising is provided for completeness, but changing it is not suggested
        // Disabling this may prevent your advertising-related PlayFab marketplace partners from working correctly
        disableAdvertising: false,
        AD_TYPE_IDFA: "Idfa",
        AD_TYPE_ANDROID_ID: "Adid"
    }
}

if(!PlayFab._internalSettings) {
    PlayFab._internalSettings = {
        entityToken: null,
        sdkVersion: "1.18.180122",
        sessionTicket: null,
        productionServerUrl: ".playfabapi.com",
        errorTitleId: "Must be have PlayFab.settings.titleId set to call this method",
        errorLoggedIn: "Must be logged in to call this method",
        errorEntityToken: "You must successfully call GetEntityToken before calling this",
        errorSecretKey: "Must have PlayFab.settings.developerSecretKey set to call this method",

        GetServerUrl: function () {
            return "https://" + PlayFab.settings.titleId + PlayFab._internalSettings.productionServerUrl;
        },

        InjectHeaders: function (xhr, headersObj) {
            if (!headersObj)
                return;

            for (var headerKey in headersObj)
            {
                try {
                    xhr.setRequestHeader(gHeaderKey, headersObj[headerKey]);
                } catch (e) {
                    console.log("Failed to append header: " + headerKey + " = " + headersObj[headerKey] + "Error: " + e);
                }
            }
        },

        ExecuteRequest: function (completeUrl, request, authkey, authValue, callback, customData, extraHeaders) {
            if (callback != null && typeof (callback) != "function")
                throw "Callback must be null of a function";

            if (request == null)
                request = {};

            var startTime = new Date();
            var requestBody = JSON.stringify(request);

            var xhr = new XMLHttpRequest();
            // window.console.log("URL: " + completeUrl);
            xhr.open("POST", completeUrl, true);

            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.setRequestHeader("X-PlayFabSDK", "JavaScriptSDK-" + PlayFab._internalSettings.sdkVersion);
            if (authkey != null)
                xhr.setRequestHeader(authkey, authValue);
            PlayFab._internalSettings.InjectHeaders(xhr, PlayFab.settings.GlobalHeaderInjection);
            PlayFab._internalSettings.InjectHeaders(xhr, extraHeaders);

            xhr.onloadend = function () {
                if (callback == null)
                    return;

                var result;
                try {
                    // window.console.log("parsing json result: " + xhr.responseText);
                    result = JSON.parse(xhr.responseText);
                } catch (e) {
                    result = {
                        code: 503, // Service Unavailable
                        status: "Service Unavailable",
                        error: "Connection error",
                        errorCode: 2, // PlayFabErrorCode.ConnectionError
                        errorMessage: xhr.responseText
                    };
                }

                result.CallBackTimeMS = new Date() - startTime;
                result.Request = request;
                result.CustomData = customData;

                if (result.code === 200)
                    callback(result, null);
                else
                    callback(null, result);
            }

            xhr.onerror = function () {
                if (callback == null)
                    return;

                var result;
                try {
                    result = JSON.parse(xhr.responseText);
                } catch (e) {
                    result = {
                        code: 503, // Service Unavailable
                        status: "Service Unavailable",
                        error: "Connection error",
                        errorCode: 2, // PlayFabErrorCode.ConnectionError
                        errorMessage: xhr.responseText
                    };
                }

                result.CallBackTimeMS = new Date() - startTime;
                result.Request = request;
                result.CustomData = customData;

                callback(null, result);
            }

            xhr.send(requestBody);
        }
    }
}

PlayFab.buildIdentifier = "jbuild_javascriptsdk_0";
PlayFab.sdkVersion = "1.18.180122";
PlayFab.GenerateErrorReport = function (error) {
    if (error == null)
        return "";
    var fullErrors = error.errorMessage;
    for (var paramName in error.errorDetails)
        for (var msgIdx in error.errorDetails[paramName])
            fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
    return fullErrors;
};

PlayFab.ClientApi = {

    IsClientLoggedIn: function () {
        return PlayFab._internalSettings.sessionTicket != null && PlayFab._internalSettings.sessionTicket.length > 0;
    },
    ForgetAllCredentials: function () {
        PlayFab._internalSettings.sessionTicket = null;
        PlayFab._internalSettings.entityToken = null;
    },

    AcceptTrade: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AcceptTrade", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    AddFriend: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AddFriend", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    AddGenericID: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AddGenericID", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    AddOrUpdateContactEmail: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AddOrUpdateContactEmail", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    AddSharedGroupMembers: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AddSharedGroupMembers", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    AddUsernamePassword: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AddUsernamePassword", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    AddUserVirtualCurrency: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AddUserVirtualCurrency", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    AndroidDevicePushNotificationRegistration: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AndroidDevicePushNotificationRegistration", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    AttributeInstall: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        var overloadCallback = function (result, error) {
            // Modify advertisingIdType:  Prevents us from sending the id multiple times, and allows automated tests to determine id was sent successfully
            PlayFab.settings.advertisingIdType += "_Successful";

            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/AttributeInstall", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, overloadCallback);
    },

    CancelTrade: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/CancelTrade", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    ConfirmPurchase: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ConfirmPurchase", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    ConsumeItem: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ConsumeItem", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    CreateSharedGroup: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/CreateSharedGroup", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    ExecuteCloudScript: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ExecuteCloudScript", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetAccountInfo: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetAccountInfo", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetAllUsersCharacters: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetAllUsersCharacters", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetCatalogItems: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCatalogItems", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetCharacterData: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCharacterData", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetCharacterInventory: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCharacterInventory", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetCharacterLeaderboard: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCharacterLeaderboard", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetCharacterReadOnlyData: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCharacterReadOnlyData", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetCharacterStatistics: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCharacterStatistics", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetContentDownloadUrl: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetContentDownloadUrl", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetCurrentGames: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetCurrentGames", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetFriendLeaderboard: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetFriendLeaderboard", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetFriendLeaderboardAroundPlayer: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetFriendLeaderboardAroundPlayer", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetFriendsList: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetFriendsList", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetGameServerRegions: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetGameServerRegions", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetLeaderboard: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetLeaderboard", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetLeaderboardAroundCharacter: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetLeaderboardAroundCharacter", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetLeaderboardAroundPlayer: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetLeaderboardAroundPlayer", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetLeaderboardForUserCharacters: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetLeaderboardForUserCharacters", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPaymentToken: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPaymentToken", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPhotonAuthenticationToken: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPhotonAuthenticationToken", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayerCombinedInfo: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayerCombinedInfo", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayerProfile: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayerProfile", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayerSegments: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayerSegments", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayerStatistics: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayerStatistics", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayerStatisticVersions: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayerStatisticVersions", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayerTags: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayerTags", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayerTrades: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayerTrades", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayFabIDsFromFacebookIDs: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayFabIDsFromFacebookIDs", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayFabIDsFromGameCenterIDs: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayFabIDsFromGameCenterIDs", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayFabIDsFromGenericIDs: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayFabIDsFromGenericIDs", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayFabIDsFromGoogleIDs: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayFabIDsFromGoogleIDs", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayFabIDsFromKongregateIDs: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayFabIDsFromKongregateIDs", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayFabIDsFromSteamIDs: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayFabIDsFromSteamIDs", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPlayFabIDsFromTwitchIDs: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPlayFabIDsFromTwitchIDs", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPublisherData: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPublisherData", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetPurchase: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetPurchase", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetSharedGroupData: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetSharedGroupData", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetStoreItems: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetStoreItems", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetTime: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetTime", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetTitleData: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetTitleData", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetTitleNews: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetTitleNews", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetTitlePublicKey: function (request, callback, customData, extraHeaders) {
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetTitlePublicKey", request, null, null, callback, customData, extraHeaders);
    },

    GetTradeStatus: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetTradeStatus", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetUserData: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetUserData", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetUserInventory: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetUserInventory", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetUserPublisherData: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetUserPublisherData", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetUserPublisherReadOnlyData: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetUserPublisherReadOnlyData", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetUserReadOnlyData: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetUserReadOnlyData", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    GetWindowsHelloChallenge: function (request, callback, customData, extraHeaders) {
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GetWindowsHelloChallenge", request, null, null, callback, customData, extraHeaders);
    },

    GrantCharacterToUser: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/GrantCharacterToUser", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    LinkAndroidDeviceID: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkAndroidDeviceID", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    LinkCustomID: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkCustomID", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    LinkFacebookAccount: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkFacebookAccount", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    LinkGameCenterAccount: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkGameCenterAccount", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    LinkGoogleAccount: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkGoogleAccount", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    LinkIOSDeviceID: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkIOSDeviceID", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    LinkKongregate: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkKongregate", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    LinkSteamAccount: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkSteamAccount", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    LinkTwitch: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkTwitch", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    LinkWindowsHello: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LinkWindowsHello", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    LoginWithAndroidDeviceID: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithAndroidDeviceID", request, null, null, overloadCallback);
    },

    LoginWithCustomID: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithCustomID", request, null, null, overloadCallback);
    },

    LoginWithEmailAddress: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithEmailAddress", request, null, null, overloadCallback);
    },

    LoginWithFacebook: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithFacebook", request, null, null, overloadCallback);
    },

    LoginWithGameCenter: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithGameCenter", request, null, null, overloadCallback);
    },

    LoginWithGoogleAccount: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithGoogleAccount", request, null, null, overloadCallback);
    },

    LoginWithIOSDeviceID: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithIOSDeviceID", request, null, null, overloadCallback);
    },

    LoginWithKongregate: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithKongregate", request, null, null, overloadCallback);
    },

    LoginWithPlayFab: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithPlayFab", request, null, null, overloadCallback);
    },

    LoginWithSteam: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithSteam", request, null, null, overloadCallback);
    },

    LoginWithTwitch: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithTwitch", request, null, null, overloadCallback);
    },

    LoginWithWindowsHello: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/LoginWithWindowsHello", request, null, null, overloadCallback);
    },

    Matchmake: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/Matchmake", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    OpenTrade: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/OpenTrade", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    PayForPurchase: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/PayForPurchase", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    PurchaseItem: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/PurchaseItem", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    RedeemCoupon: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RedeemCoupon", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    RegisterForIOSPushNotification: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RegisterForIOSPushNotification", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    RegisterPlayFabUser: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RegisterPlayFabUser", request, null, null, overloadCallback);
    },

    RegisterWithWindowsHello: function (request, callback, customData, extraHeaders) {
        request.TitleId = PlayFab.settings.titleId ? PlayFab.settings.titleId : request.TitleId; if (!request.TitleId) throw PlayFab._internalSettings.errorTitleId;
        var overloadCallback = function (result, error) {
            if (result != null && result.data.SessionTicket != null) {
                PlayFab._internalSettings.sessionTicket = result.data.SessionTicket;
                PlayFab.ClientApi._MultiStepClientLogin(result.data.SettingsForUser.NeedsAttribution);
            }
            if (callback != null && typeof (callback) == "function")
                callback(result, error);
        };
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RegisterWithWindowsHello", request, null, null, overloadCallback);
    },

    RemoveContactEmail: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RemoveContactEmail", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    RemoveFriend: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RemoveFriend", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    RemoveGenericID: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RemoveGenericID", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    RemoveSharedGroupMembers: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RemoveSharedGroupMembers", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    ReportDeviceInfo: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ReportDeviceInfo", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    ReportPlayer: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ReportPlayer", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    RestoreIOSPurchases: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/RestoreIOSPurchases", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    SendAccountRecoveryEmail: function (request, callback, customData, extraHeaders) {
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/SendAccountRecoveryEmail", request, null, null, callback, customData, extraHeaders);
    },

    SetFriendTags: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/SetFriendTags", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    SetPlayerSecret: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/SetPlayerSecret", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    StartGame: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/StartGame", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    StartPurchase: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/StartPurchase", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    SubtractUserVirtualCurrency: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/SubtractUserVirtualCurrency", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UnlinkAndroidDeviceID: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkAndroidDeviceID", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UnlinkCustomID: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkCustomID", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UnlinkFacebookAccount: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkFacebookAccount", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UnlinkGameCenterAccount: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkGameCenterAccount", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UnlinkGoogleAccount: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkGoogleAccount", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UnlinkIOSDeviceID: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkIOSDeviceID", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UnlinkKongregate: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkKongregate", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UnlinkSteamAccount: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkSteamAccount", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UnlinkTwitch: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkTwitch", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UnlinkWindowsHello: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlinkWindowsHello", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UnlockContainerInstance: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlockContainerInstance", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UnlockContainerItem: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UnlockContainerItem", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UpdateAvatarUrl: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateAvatarUrl", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UpdateCharacterData: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateCharacterData", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UpdateCharacterStatistics: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateCharacterStatistics", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UpdatePlayerStatistics: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdatePlayerStatistics", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UpdateSharedGroupData: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateSharedGroupData", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UpdateUserData: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateUserData", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UpdateUserPublisherData: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateUserPublisherData", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    UpdateUserTitleDisplayName: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/UpdateUserTitleDisplayName", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    ValidateAmazonIAPReceipt: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ValidateAmazonIAPReceipt", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    ValidateGooglePlayPurchase: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ValidateGooglePlayPurchase", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    ValidateIOSReceipt: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ValidateIOSReceipt", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    ValidateWindowsStoreReceipt: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/ValidateWindowsStoreReceipt", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    WriteCharacterEvent: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/WriteCharacterEvent", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    WritePlayerEvent: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/WritePlayerEvent", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    WriteTitleEvent: function (request, callback, customData, extraHeaders) {
        if (!PlayFab._internalSettings.sessionTicket) throw PlayFab._internalSettings.errorLoggedIn;
        PlayFab._internalSettings.ExecuteRequest(PlayFab._internalSettings.GetServerUrl() + "/Client/WriteTitleEvent", request, "X-Authorization", PlayFab._internalSettings.sessionTicket, callback, customData, extraHeaders);
    },

    _MultiStepClientLogin: function (needsAttribution) {
        if (needsAttribution && !PlayFab.settings.disableAdvertising && PlayFab.settings.advertisingIdType !== null && PlayFab.settings.advertisingIdValue !== null) {
            var request = {};
            if (PlayFab.settings.advertisingIdType === PlayFab.settings.AD_TYPE_IDFA)
                request.Idfa = PlayFab.settings.advertisingIdValue;
            else if (PlayFab.settings.advertisingIdType === PlayFab.settings.AD_TYPE_ANDROID_ID)
                request.Adid = PlayFab.settings.advertisingIdValue;
            else
                return;
            PlayFab.ClientApi.AttributeInstall(request, null);
        }
    }
};

var PlayFabClientSDK = PlayFab.ClientApi;

PlayFab.RegisterWithPhaser = function() {
    if ( typeof Phaser === "undefined" )
        return;

    Phaser.Plugin.PlayFab = function (game, parent) {
        Phaser.Plugin.call(this, game, parent);
    };
    Phaser.Plugin.PlayFab.prototype = Object.create(Phaser.Plugin.prototype);
    Phaser.Plugin.PlayFab.prototype.constructor = Phaser.Plugin.PlayFab;
    Phaser.Plugin.PlayFab.prototype.PlayFab = PlayFab;
    Phaser.Plugin.PlayFab.prototype.settings = PlayFab.settings;
    Phaser.Plugin.PlayFab.prototype.ClientApi = PlayFab.ClientApi;
};
PlayFab.RegisterWithPhaser();


/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

/**
 * Created by Lutz on 13.02.2017.
 */
Luts = {
    version     :   "0.0.38",
    release:true,
    fullscreen  :   false,
    numberFormat: 0,
    State       :   {},
    Object      :   {},
    Util        :   {},
    Events      :   {
        onAfterResize: new Phaser.Signal()
    },
    Config      :   {},
    currentState:   {},
    Credits     :   [{type: "general", author: "Lutz Schönfelder"}],
    gamePaused  :   false,
    track       :   false,
    trackLog    :   false,
    mtxEnabled  :   false,
    Name        :   "Idle Dices",
    isActive    :   true,
    GAME_WIDTH  :   960,
    GAME_HEIGHT :   540,
    scale       :   1,
    res         :   1,
    turnPrompt  :   false,
    DEBUG       :   true,
    TEMP_STORE  :   false,
    GAME_SPEED  :   100,
    isLocal     :   window.location.href.toString().includes("localhost"),
    gameAnalytics:{
        id: "",
        secret:""
    },
    playfab:{
        id: "D9D7"
    }
};

init = function () {
    Luts.Store.init(Luts.Name,Luts.TEMP_STORE);

    Luts.Upgrades.init();
    Luts.Shop.init();

    this.webgl = new Luts.Setting('canvas', false, 'Use WebGL (Requires Restart)','Switch this if you have performance issues');

    var game = new Phaser.Game(Luts.GAME_WIDTH, Luts.GAME_HEIGHT, this.webgl.value ? Phaser.AUTO : Phaser.CANVAS);

    game.state.add('Boot', Luts.State.Boot);
    game.state.add('Preloader', Luts.State.Preloader);
    game.state.add('Menu', Luts.State.Menu);
    game.state.add('Credits', Luts.State.Credits);
    game.state.add('Settings', Luts.State.Settings);
    game.state.add('LevelSelection', Luts.State.LevelSelection);
    game.state.add('Game', Luts.State.Game);

    Luts.Connect.all(function(){
        game.state.start('Boot');
    }.bind(this));
};


if ('serviceWorker' in navigator && Luts.release && !Luts.isLocal) {
    navigator.serviceWorker.register('service-worker.js').then(function(reg) {
        reg.onupdatefound = function() {
            var installingWorker = reg.installing;
           installingWorker.onstatechange = function() {
                switch (installingWorker.state) {
                    case 'installed':
                        if (navigator.serviceWorker.controller) {
                            Luts.newContent = true;
                            console.log('New or updated content is available.');
                        } else {
                            console.log('Content is now available offline!');
                        }
                        break;

                    case 'redundant':
                        //console.error('The installing service worker became redundant.');
                        break;
                }
            };
        };
    }).catch(function(e) {
        console.error('Error during service worker registration:', e);
    });
}
/**
 * Created by Lutz on 13.02.2017.
 */
Luts.State.BaseState = function(game){
    this.game = game;
    Luts.currentState = this;
    this.lastScale = 1;
};

Luts.State.BaseState.constructor = Luts.State.BaseState;
Luts.State.BaseState.prototype = Object.create(Phaser.State.prototype);

Luts.State.BaseState.prototype.init = function () {

};

Luts.State.BaseState.prototype.preload = function () {

};

Luts.State.BaseState.prototype.create = function () {

};

Luts.State.BaseState.prototype.resize = function () {
    var scale = Math.min(this.game.height / Luts.GAME_HEIGHT, this.game.width / Luts.GAME_WIDTH);
    this.lastScale = scale;


    for(var i = 0; i < this.world.children.length; i++){
        var child = this.world.children[i];
        this.setPosition(child,scale);
    }

    if (!this.game.device.desktop && Luts.turnPrompt){
        if ((this.game.width > this.game.height && Luts.GAME_WIDTH < Luts.GAME_HEIGHT) ||
            (this.game.width < this.game.height && Luts.GAME_WIDTH > Luts.GAME_HEIGHT)){
            document.getElementById("turn").style.display="block";
        }else{
            document.getElementById("turn").style.display="none";
        }
    }
    Luts.Events.onAfterResize.dispatch(scale);
};

Luts.State.BaseState.prototype.setPosition = function(child, scale){
    if (child.responsivePosition){
        child.cameraOffset.x = this.game.width * child.responsivePosition.x;
        child.cameraOffset.y = this.game.height * child.responsivePosition.y;
        child.scale.set((scale * child.scl * Luts.scale) / this.world.scale.x);

        if (child.options) {
            if (child.options.scaleWithGame) {
                child.scale.set(child.scl * Luts.scale * (this.game.width / Luts.GAME_WIDTH), child.scl * Luts.scale * (this.game.height / Luts.GAME_HEIGHT));
            }
        }
    }
    for(var i = 0; i < child.children.length; i++){
        this.setPosition(child.children[i],scale);
    }
};

Luts.State.BaseState.prototype.addResponsive = function (relativeX, relativeY, key, frame) {
    var image = this.game.add.image(this.game.width * relativeX, this.game.height * relativeY, key, frame);
    image.responsivePosition = {x: relativeX, y: relativeY};
    image.scl = 1;
    image.scale.set((this.game.width / Luts.GAME_WIDTH));
    image.fixedToCamera = true;
    return image;
};

Luts.State.BaseState.prototype.setResponsive = function (image, options) {
    image.responsivePosition = {x: image.x / Luts.GAME_WIDTH, y: image.y / Luts.GAME_HEIGHT};
    if (image.scale)
        image.scl = image.scale.x;
    else
        image.scl = 1;
    image.rWidth = image.width;
    image.rHeight = image.height;
    image.options = options;
    if (options){

    }
    image.fixedToCamera = true;
    this.resize();
};
/**
 * Created by Lutz on 13.02.2017.
 */
Luts.State.Boot = function (game) {

};

Luts.State.Boot.constructor = Luts.State.Boot;
Luts.State.Boot.prototype = Object.create(Luts.State.BaseState.prototype);

Luts.State.Boot.prototype.init = function () {
    this.game.input.maxPointers = 1;
    this.game.stage.displayVisibilityChange = true;
    if (!this.game.device.desktop || Luts.release) {
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

        if (Luts.release && Luts.fullscreen) {
            document.documentElement.onclick = function () {
                this.game.scale.startFullScreen();
            }.bind(this);
        }

    } else {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    this.game.time.advancedTiming = true;

    Luts.Events.onMouseWheel = new Phaser.Signal();
    this.game.input.mouse.mouseWheelCallback = function (delta) {
        Luts.Events.onMouseWheel.dispatch(delta.deltaY);
        return false;
    };
    document.onmousewheel = function(){return false;};

    Luts.Events.onActive = new Phaser.Signal();
    Luts.Events.onInactive = new Phaser.Signal();
};

Luts.State.Boot.prototype.preload = function () {
    this.game.load.json('preload','data/preload.json');
    this.game.load.json('config','data/config.json');
};

Luts.State.Boot.prototype.create = function () {
    this.game.state.start('Preloader');
    Luts.Config = this.game.cache.getJSON('config');
};
/**
 * Created by Lutz on 13.02.2017.
 */
Luts.State.Preloader = function (game) {

};

Luts.State.Preloader.constructor = Luts.State.Preloader;
Luts.State.Preloader.prototype = Object.create(Luts.State.BaseState.prototype);

Luts.State.Preloader.prototype.init = function () {
    this.loadingText = new Luts.Object.Text(this,this.game.width / 2, this.game.height / 2, 'text', "Loading..",50);
    this.loadingText.anchor.set(0.5);
    this.game.add.tween(this.loadingText.scale).to({x: 0.45,y:0.45},1000,Phaser.Easing.Sinusoidal.InOut,true,0,-1,true);

    this.percentText = new Luts.Object.Text(this,this.loadingText.x,this.loadingText.y + 50,'regular',"0%",40);
    this.percentText.anchor.set(0.5);

    this.currentText = new Luts.Object.Text(this,this.loadingText.x,this.loadingText.y + 80,'text',"",15);
    this.currentText.anchor.set(0.5);

    this.versionText = new Luts.Object.Text(this,0,0,'text',"Version: " + Luts.version,15);

    this.resize();

    this.game.load.onFileComplete.add(function (progress, cacheKey, success, totalLoaded, totalFiles) {
        this.percentText.text = progress + '%';
        this.currentText.text = cacheKey + ' (' + totalLoaded + '/' + totalFiles + ')';
    }, this);
};

Luts.State.Preloader.prototype.preload = function () {
    var json = this.game.cache.getJSON('preload');
    var load, i;
    if (json["image"]){
        load = json["image"];
        for(i = 0; i < load.length; i++) {
            this.game.load.image(load[i]["name"],"assets/img/"+load[i]["url"]);
        }
    }
    if (json["atlas"]){
        load = json["atlas"];
        for(i = 0; i < load.length; i++) {
            this.game.load.atlas(load[i]["name"],"assets/img/"+load[i]["urlImg"],"assets/img/"+load[i]["urlData"]);
        }
    }
    if (json["json"]){
        load = json["json"];
        for(i = 0; i < load.length; i++) {
            this.game.load.json(load[i]["name"],"data/"+load[i]["url"]);
        }
    }
    if(json["font"]){
        load = json["font"];
        for(i = 0; i< load.length; i++){
            this.game.load.bitmapFont(load[i]["name"],"assets/img/font/" + load[i]["url"], "assets/img/font/" + load[i]["data"]);
        }
    }
    if(json["sound"] && Luts.Sound.load){
        load = json["sound"];
        for(i = 0; i< load.length; i++){
            this.game.load.audio(load[i]["name"],"assets/sounds/" + load[i]["file"] + '.m4a',"assets/sounds/" + load[i]["file"] + '.ogg');
            this.checkforCredits(load[i],"sound");
        }
    }

};

Luts.State.Preloader.prototype.checkforCredits = function(data,type){
    if (data["credits"]){
        var c = data["credits"];
        this.addToCredits(type,c["author"],c["name"],c["url"]);
    }
};

Luts.State.Preloader.prototype.addToCredits = function(type,author,name,url){
    Luts.Credits.push({type: type, author: author, name: name, url: url});
};

Luts.State.Preloader.prototype.create = function () {
   this.game.state.start("Menu");
    console.log('Version ' + Luts.version);
};
/**
 * Created by Lutz on 13.02.2017.
 */
Luts.State.Menu = function (game) {

};

Luts.State.Menu.constructor = Luts.State.Menu;
Luts.State.Menu.prototype = Object.create(Luts.State.BaseState.prototype);

Luts.State.Menu.prototype.init = function () {
};

Luts.State.Menu.prototype.create = function () {
    var whiteSquare = this.addResponsive(0.5, 0.5, "whiteSquare");
    whiteSquare.anchor.set(0.5);

    this.game.state.start('LevelSelection');
};
/**
 * Created by Lutz on 13.02.2017.
 */
Luts.State.Credits = function (game) {

};

Luts.State.Credits.constructor = Luts.State.Credits;
Luts.State.Credits.prototype = Object.create(Luts.State.BaseState.prototype);

Luts.State.Credits.prototype.init = function () {
};

Luts.State.Credits.prototype.create = function () {
    var whiteSquare = this.addResponsive(0.5, 0.5, "whiteSquare");
    whiteSquare.anchor.set(0.5);

    this.game.state.start('Credits');
};
/**
 * Created by Lutz on 13.02.2017.
 */
Luts.State.Settings = function (game) {

};

Luts.State.Settings.constructor = Luts.State.Settings;
Luts.State.Settings.prototype = Object.create(Luts.State.BaseState.prototype);

Luts.State.Settings.prototype.init = function () {
};

Luts.State.Settings.prototype.create = function () {
    var whiteSquare = this.addResponsive(0.5, 0.5, "whiteSquare");
    whiteSquare.anchor.set(0.5);

    this.game.state.start('Settings');
};
/**
 * Created by Lutz on 13.02.2017.
 */
Luts.State.LevelSelection = function (game) {

};

Luts.State.LevelSelection.constructor = Luts.State.LevelSelection;
Luts.State.LevelSelection.prototype = Object.create(Luts.State.BaseState.prototype);

Luts.State.LevelSelection.prototype.init = function () {
};

Luts.State.LevelSelection.prototype.create = function () {
    this.game.state.start('Game', true, false, 0);
};
/**
 * Created by Lutz on 13.02.2017.
 */
Luts.State.Game = function (game) {

};

Luts.State.Game.constructor = Luts.State.Game;
Luts.State.Game.prototype = Object.create(Luts.State.BaseState.prototype);

Luts.State.Game.prototype.init = function (level) {
    this.level = level;
    this.game.stage.disableVisibilityChange = true;
};

Luts.State.Game.prototype.create = function () {
    Luts.Time.init(this);
    Luts.Events.onGainMoney = new Phaser.Signal();
    Luts.Events.onUpdate = new Phaser.Signal();
    Luts.Events.onAsyncUpdate = new Phaser.Signal();
    Luts.Events.onUnlockedDice = new Phaser.Signal();

    Luts.Object.AchievementsHandler.init(this);
    Luts.Object.HighscoreHandler.init(this);
    Luts.Sound.init(this);

    Luts.Save.init();
    Luts.Upgrades.createCurrency('Points');
    Luts.Upgrades.createCurrency('AscentionPoints');

    Luts.Store.setItem('version',Luts.version);

    this.fbMulti = 1;
    this.kongMulti = 1;

    this.rollInterval = 5;
    this.rollCounter = this.rollInterval;
    this.rollAnim = 2;
    this.animPlaying = false;
    this.dices = [];
    this.lastScore = 0;

    this.game.stage.backgroundColor = 0xffffff;

    this.gameGroup = this.game.add.image(Luts.GAME_WIDTH / 2 ,Luts.GAME_HEIGHT / 2);
    this.gameGroup.anchor.set(0.5);
    this.setResponsive(this.gameGroup);

    this.groupUI = this.game.add.group();

    this.topUI = this.game.add.image(Luts.GAME_WIDTH / 2,0,'ui','uiLabelTop');
    this.topUI.anchor.set(0.5,0.1);
    this.setResponsive(this.topUI);
    this.groupUI.add(this.topUI);

    this.nextRollText = new Luts.Object.Text(this,-340,2,'text','Next Auto Roll:',12,'#000000');
    this.nextRollText.strokeThickness = 0;
    this.topUI.addChild(this.nextRollText);
    this.nextRollBar = new Luts.Object.Bar(this,-350,10,'progressBackSmall','progressBarSmall');
    this.topUI.addChild(this.nextRollBar);

    this.rollButton = new Luts.Object.Button(this,-100,40,'Roll','',this.roll.bind(this));
    this.topUI.addChild(this.rollButton);

    this.scoreCounter = new Luts.Object.Text(this,0, 30, 'regular', '0', 30);
    this.scoreCounter.anchor.set(0.5);
    this.topUI.addChild(this.scoreCounter);

    this.buyAmountButtons = new Luts.Object.BuyAmountButtons(this, 320, 40, [1,10,100], true);
    this.topUI.addChild(this.buyAmountButtons);

    this.settingsWindow = new Luts.Object.SettingsWindow(this);
    this.creditsWindow = new Luts.Object.CreditsWindow(this);
    this.infoWindow = new Luts.Object.InfoWindow(this);

    this.settingsButton = new Luts.Object.Button(this, -450, 35,'','',this.settingsClicked.bind(this));
    this.settingsButton.setFrames('settings','settings');
    this.topUI.addChild(this.settingsButton);

    this.infoButton = new Luts.Object.Button(this, -400, 35,'','',this.infoClicked.bind(this));
    this.infoButton.setFrames('infoButton','infoButton');
    this.topUI.addChild(this.infoButton);

    Luts.Events.onCurrencyChanged[0].add(function (v) {
        if(this.scoreCounter.tw)
            this.scoreCounter.tw.stop();
        this.scoreCounter.setText(Luts.Format.BigNumber(v,false,0));
        this.scoreCounter.scale.set(1);
        this.scoreCounter.tw = this.game.add.tween(this.scoreCounter.scale).from({x: 1.1, y: 1.1},1000,Phaser.Easing.Elastic.Out,true);
    },this);

    this.diceContainers = [];
    var dc = new Luts.Object.DiceContainer(this,0,0,'main');
    this.diceContainers.push(dc);
    this.gameGroup.addChild(dc);

    Luts.Time.handleTimeAway(0,function(timeAway){
        Luts.Time.passivePlaytime += timeAway.msec;
        Luts.Time.currentResetPassivePlaytime += timeAway.msec;
        this.handleTimeAway(timeAway);
    }.bind(this));

    Luts.GameData.getNews(function(data){
        new Luts.Object.Popup(this,data);
    }.bind(this));

    this.resize();
};

Luts.State.Game.prototype.settingsClicked = function(){
    this.settingsWindow.toggle();
};
Luts.State.Game.prototype.creditsClicked = function(){
    this.creditsWindow.toggle();
};
Luts.State.Game.prototype.infoClicked = function(){
    this.infoWindow.toggle();
};

Luts.State.Game.prototype.roll = function(){
    this.rollCounter = 0;
    this.rollAll();
    this.animPlaying = true;
};

Luts.State.Game.prototype.asyncUpdate = function(){
    if (Luts.gamePaused)
        return;

    this.rollButton.setActive(!this.animPlaying,true);

    this.rollCounter += 1 / 10;
    if (!this.animPlaying) {
        if (this.rollCounter >= this.rollInterval) {
            this.roll();
            this.nextRollBar.playCompletedEffect();
        }
    }else{
        if (this.rollCounter >= this.rollAnim) {
            this.rollCounter = 0;
            this.animPlaying = false;
            Luts.Upgrades.changeCurrency(0, this.lastScore);
        }
    }

    Luts.Events.onAsyncUpdate.dispatch();
    this.save();
};

Luts.State.Game.prototype.rollAll = function(){
    var total = BigNumber(0);
    var values = [];
    this.diceContainers.forEach(function(d){
        total = total.add(d.rollAll());
    }.bind(this));

    this.lastScore = total;
};

Luts.State.Game.prototype.update = function(){
    Luts.Events.onUpdate.dispatch();

    this.nextRollBar.barText.setText(this.animPlaying ? 0 : Luts.Format.Time((this.rollInterval - this.rollCounter) * 1000));
    this.nextRollBar.stepTo(this.animPlaying ? 0 : this.rollCounter / this.rollInterval, 0.1);
    this.nextRollBar.update();

    if (Luts.newContent){
        Luts.newContent = false;
        new Luts.Object.Popup(this,'New Update available, refresh now?',true,function (yes) {
            if (yes){
                window.location.reload(false);
            }
        });
    }

    if (Luts.DEBUG) {
        this.game.debug.text(this.game.time.fps, this.game.width - 25, 20, 0);
        this.game.debug.text(Luts.Format.Time(Luts.Time.activePlaytime), this.game.width - 90, 40);
        this.game.debug.text(Luts.Format.Time(Luts.Time.passivePlaytime), this.game.width - 90, 60);
        this.game.debug.text(Luts.Format.Time(Luts.Time.currentResetActivePlaytime), this.game.width - 90, 80);
        this.game.debug.text(Luts.Format.Time(Luts.Time.currentResetPassivePlaytime), this.game.width - 90, 100);
    }
};

Luts.State.Game.prototype.save = function(){
};

Luts.State.Game.prototype.hardReset = function(){
    Luts.gamePaused = true;
    new Luts.Object.Popup(this,"Are you sure? All of your progress will be lost forever.",true,function (yes) {
        if (yes){
            Luts.Storage.clear();
            window.location.reload(false);
        }else{
            Luts.gamePaused = false;
        }
    }.bind(this));
};

Luts.State.Game.prototype.handleTimeAway = function(timeAway){
    var lastMoney = Luts.Upgrades.currency[0];

    var interval = this.rollInterval + this.rollAnim;
    Luts.Upgrades.changeCurrency(0,this.averagePerSecond().times(timeAway.sec).dividedBy(interval));

    if (timeAway.sec >= 10){
        var msg = "You were gone for " + Luts.Format.Time(timeAway.msec,true) +
            ".\nYou gained: " + Luts.Format.BigNumber(Luts.Upgrades.currency[0].minus(lastMoney),true);

        new Luts.Object.Popup(this,msg);
    }
};

Luts.State.Game.prototype.averagePerSecond = function(){
    var total = BigNumber(0);
    this.diceContainers.forEach(function (dc) {
        total = total.add(dc.averagePerSecond());
    });
    return total;
};

Luts.State.Game.prototype.clickFacebook = function(){
    window.open("https://www.facebook.com/lutsgamedev/");
    this.fbMulti = 1.5;
    new Luts.Object.Popup(this,"Thank you!");
    Luts.Store.setItem('fbMulti',this.fbMulti);
};

Luts.State.Game.prototype.clickKong = function(){
    window.open("https://www.kongregate.com/games/Luts91");
    this.kongMulti = 1.5;
    new Luts.Object.Popup(this,"Thank you!");
    Luts.Store.setItem('kongMulti',this.kongMulti);
};
Luts.Util.httpGetAsync = function(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange =  function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
};

Luts.Util.RandomWeight = function(rnd,array){
    var total = 0;
    for(var j = 0; j < array.length; j++){
        total += parseFloat(array[j]);
    }

    var sum = 0;
    for(var i = 0; i < array.length; i++){
        sum += parseFloat(array[i]);
        if (rnd * total < sum)
            break;
    }
    return i;
};
Luts.Store = {
    savingEnabled: true
};

Luts.Store.init = function(pre,temp){
    Luts.Store.pre = pre;
    Luts.Store.temp = temp;
    if (temp)
        Luts.Storage = sessionStorage;
    else
        Luts.Storage = localStorage;
};

Luts.Store.setItem = function(name,val){
    if (this.savingEnabled)
        Luts.Storage.setItem(Luts.Store.pre + '_' + name, val);
};

Luts.Store.removeItem = function(name,val){
    Luts.Storage.removeItem(Luts.Store.pre + '_' + name);
};

Luts.Store.getItem = function (name, def,dontParse) {
    var ret = Luts.Storage.getItem(Luts.Store.pre + "_" + name);
    if (ret == null || ret == "undefined")
        ret = def;
    if(!isNaN(parseFloat(ret)) && !dontParse)
       ret = parseFloat(ret);
    if (ret == "true")
        ret = true;
    if (ret == "false")
        ret = false;
    return ret;
};

Luts.Store.setStorage = function(data){
    for(key in data) {
        //console.log(key);
        //console.log(data[key]);
        Luts.Storage.setItem(key,data[key]);
    }
};


Luts.Upgrades = {

};

Luts.Upgrades.init = function(){
    Luts.Upgrades.buyAmount = Luts.Store.getItem('buyAmount',1);
    Luts.Upgrades.currency = [];
    Luts.Upgrades.currencyNames = [];

    Luts.Events.onUpgrade = new Phaser.Signal();
    Luts.Events.onBuyAmountChanged = new Phaser.Signal();
    Luts.Events.onCurrencyChanged = [];
};

Luts.Upgrades.createCurrency = function(name,initial){
    if (!initial)
        initial = 0;
    if (Luts.Upgrades.getCurrency(name) == null) {
        Luts.Upgrades.currencyNames.push(name);
        Luts.Upgrades.currency.push(BigNumber(Luts.Store.getItem('currency_' + Luts.Upgrades.currency.length, initial, true)));
        Luts.Events.onCurrencyChanged.push(new Phaser.Signal());
    }
    return Luts.Upgrades.currency.length - 1;
};

Luts.Upgrades.changeCurrency = function(name,value){
    var c;
    var id;
    if (typeof name == 'string') {
        c = Luts.Upgrades.getCurrency(name);
        id = Luts.Upgrades.getCurrencyId(name);
    }else {
        c = Luts.Upgrades.currency[name];
        id = name;
    }
    if (value.e == null)
        value = Phaser.Math.roundTo(value,-4);
    Luts.Upgrades.currency[id] = BigNumber.max(0,c.add(value));
    Luts.Events.onCurrencyChanged[id].dispatch(Luts.Upgrades.currency[id]);
    this.saveCurrency(id);
};

Luts.Upgrades.loadCurrency = function(num){
    Luts.Upgrades.currency[num] = BigNumber(Luts.Store.getItem('currency_' + num,0,true));
};

Luts.Upgrades.saveCurrency = function(num){
    Luts.Store.setItem('currency_' + num,Luts.Upgrades.currency[num].toExponential(6));
};

Luts.Upgrades.getCurrency = function(name){
    for(var i = 0; i < Luts.Upgrades.currencyNames.length; i++){
        if (Luts.Upgrades.currencyNames[i] == name)
            return Luts.Upgrades.currency[i];
    }
    return null;
};

Luts.Upgrades.getCurrencyId = function(name){
    for(var i = 0; i < Luts.Upgrades.currencyNames.length; i++){
        if (Luts.Upgrades.currencyNames[i] == name)
            return i;
    }
    return null;
};

Luts.Upgrades.upgrades = [];

Luts.Upgrades.add = function(name,displayName,description,initialPrice,initialValue,priceIncreaseFactor,valueIncrease, maxLevel, initalLevel,condition,currencyType){
    if (Luts.Upgrades.getByName(name))
        return Luts.Upgrades.getByName(name);

    if (initalLevel == null)
        initalLevel = 1;
    if (maxLevel == null)
        maxLevel = -1;

    var upgrade = {
        name: name,
        displayName: displayName,
        description: description,
        level: initalLevel,
        initialLevel: initalLevel,
        maxLevel: maxLevel,
        multiplier: BigNumber(1),
        initialValue: BigNumber(initialValue),
        initialPrice: initialPrice,
        value: BigNumber(initialValue),
        priceIncreaseFactor: priceIncreaseFactor,
        valueIncrease: BigNumber(valueIncrease),
        condition: condition,
        lastBuyAmount: [],
        lastBuyAmountLevel: [],
        lastBuyAmountPrice: [],
        lastMaxPrice: initialPrice,
        currencyType: currencyType || 0,
        priceIncreaseMethod: 0,
        valueIncreaseMethod: 0,
        onUpgrade: new Phaser.Signal()
    };

    if (Array.isArray(initialPrice)) {
        upgrade.price = [];
        upgrade.initialPrice = [];
        initialPrice.forEach(function (a) {
            upgrade.price.push(BigNumber(a));
            upgrade.initialPrice.push(BigNumber(a));
            upgrade.lastBuyAmountPrice.push(BigNumber(0));
            upgrade.lastBuyAmount.push(0);
            upgrade.lastBuyAmountLevel.push(0);
        });
    }else{
        upgrade.price = BigNumber(initialPrice);
        upgrade.initialPrice = BigNumber(initialPrice);
        upgrade.lastBuyAmountPrice.push(BigNumber(0));
        upgrade.lastBuyAmount.push(0);
        upgrade.lastBuyAmountLevel.push(0);
    }


    upgrade.value = Luts.Upgrades.calcValue(upgrade);
    Luts.Upgrades.loadUpgrade(upgrade);
    Luts.Upgrades.upgrades.push(upgrade);
    return upgrade;
};

Luts.Upgrades.reset = function(upgrade){
    var u = Luts.Upgrades.get(upgrade);
    u.level = u.initialLevel;

    if (Array.isArray(u.initialPrice)){
        for(var i = 0; i < u.initialPrice.length; i++)
            u.price[i] = u.initialPrice[i];
    }else
        u.price = u.initialPrice;

    Luts.Upgrades.calcValue(u);
    u.lastBuyAmount.forEach(function(l){
        l = 0;
    });
    u.lastBuyAmountPrice.forEach(function(l){
        l = BigNumber(0);
    });
    u.lastBuyAmountLevel.forEach(function(l){
        l = 0;
    });
    u.lastMaxPrice = u.initialPrice;

    Luts.Upgrades.saveUpgrade(u);
};

Luts.Upgrades.resetOfCurrency = function(currency){
    Luts.Upgrades.upgrades.forEach(function(u){
        if (Array.isArray(u.currencyType)){
            if(u.currencyType.some(function (value) { return (value == currency) }))
                Luts.Upgrades.reset(u);
        }else
        if (u.currencyType == currency)
            Luts.Upgrades.reset(u);
    });
    Luts.Upgrades.currency[currency] = BigNumber(0);
    Luts.Events.onCurrencyChanged[currency].dispatch();
    Luts.Upgrades.saveCurrency(currency);
};

Luts.Upgrades.remove = function(upgrade){
    var u = Luts.Upgrades.get(upgrade);
    for(var i = Luts.Upgrades.upgrades.length - 1; i >= 0; i--){
        if(Luts.Upgrades.upgrades[i].name == u.name){
            Luts.Upgrades.upgrades.splice(i,1);
        }
    }
};

Luts.Upgrades.upgrade = function (upgrade,noPriceCheck,noSignal) {
    var u = Luts.Upgrades.get(upgrade);
    if (Luts.Upgrades.isUpgradeable(upgrade,noPriceCheck)){
        if (!noPriceCheck) {
            if (Array.isArray(u.currencyType)){
                u.currencyType.forEach(function(c,i){
                    if (Array.isArray(u.price)) {
                        Luts.Upgrades.changeCurrency(c,u.price[i].neg());
                    }else
                        Luts.Upgrades.changeCurrency(c,u.price.neg());
                });
            }else
                Luts.Upgrades.changeCurrency(u.currencyType,u.price.neg());
        }

        u.level += 1;

        if(u.priceIncreaseMethod == 0) {
            if (Array.isArray(u.price)){
                for(var i = 0; i < u.price.length; i++){
                    u.price[i] = u.price[i].times(u.priceIncreaseFactor[i].toString());
                }
            }else
                u.price = u.price.times(u.priceIncreaseFactor.toString());
        }else if(u.priceIncreaseMethod == 1)
            if (Array.isArray(u.price)){
                for(var i = 0; i < u.price.length; i++){
                    u.price[i] = u.price[i].add(u.priceIncreaseFactor[i].toString());
                }
            }else
                u.price = u.price.add(u.priceIncreaseFactor.toString());
        u.value = Luts.Upgrades.calcValue(u);

        if(!noSignal) {
            Luts.Events.onUpgrade.dispatch(u,1);
            u.onUpgrade.dispatch(1);
        }
        this.saveUpgrade(u);
        return true;
    }
    return false;
};

Luts.Upgrades.calcValue = function(upgrade){
    var u = Luts.Upgrades.get(upgrade);
    if(u.valueIncreaseMethod == 0)
        u.value = u.initialValue.plus(u.valueIncrease.times(u.level)).times(u.multiplier);
    if(u.valueIncreaseMethod == 1)
        u.value = u.initialValue.times(u.valueIncrease.pow(u.level)).times(u.multiplier);
    return u.value;
};

Luts.Upgrades.upgradeMultiple = function(upgrade,num,noPriceCheck){
    var u = Luts.Upgrades.get(upgrade);
    if(num == null)
        num = Luts.Upgrades.buyAmount;
    if(num != -1){
        if (Array.isArray(u.currencyType)){
            for(var i = 0; i < u.currencyType.length; i++){
                if (Luts.Upgrades.currency[u.currencyType[i]].lessThan(Luts.Upgrades.priceMultiple(upgrade,num,i).floor()))
                    return 0;
            }
        } else if (Luts.Upgrades.currency[u.currencyType].lessThan(Luts.Upgrades.priceMultiple(upgrade,num).floor()))
            return 0;
    }
    for(var i = 0; (i < num || num == -1); i++){
        if (!Luts.Upgrades.upgrade(upgrade,noPriceCheck,true))
            break;
    }

    Luts.Events.onUpgrade.dispatch(u,i);
    u.onUpgrade.dispatch(i);
    Luts.Analytics.track('design','Upgrade:'+u.name+':Level',u.level);
    Luts.Analytics.track('design','Upgrade:'+u.name+':Amount',i);
    return i;
};

Luts.Upgrades.setBuyAmount = function(amount){
    Luts.Upgrades.buyAmount = amount;
    Luts.Upgrades.upgrades.forEach(function(u){
        u.lastBuyAmount.forEach(function(l){
            l = 0;
        });
        u.lastBuyAmountPrice.forEach(function(l){
            l = BigNumber(0);
        });
        u.lastBuyAmountLevel.forEach(function(l){
            l = 0;
        });
        u.lastMaxPrice = u.price;
    });
    Luts.Events.onBuyAmountChanged.dispatch();
    Luts.Store.setItem('buyAmount',Luts.Upgrades.buyAmount);
};

Luts.Upgrades.priceMultiple = function(upgrade,num,currencyPos){
    var u = Luts.Upgrades.get(upgrade);
    var lvl = 0;
    var currencyType = u.currencyType;
    if (currencyPos != null)
        currencyType = u.currencyType[currencyPos];
    else
        currencyPos = 0;

    var price = u.price;
    if (Array.isArray(price)) {
        price = price[currencyPos];
    }

    var sum = BigNumber(price);

    if(num == null)
        num = Luts.Upgrades.buyAmount;

    if(num == -1) {
        /*
        if (!u.lastBuyAmountPrice[currencyPos].equals(0) && Luts.Upgrades.currency[currencyType].greaterThanOrEqualTo(u.lastBuyAmountPrice[currencyPos].floor())){
            sum = BigNumber(u.lastBuyAmountPrice[currencyPos]);
            price = BigNumber(u.lastMaxPrice);
        }else {
            u.lastBuyAmount[currencyPos] = 1;
        }

        while(Luts.Upgrades.currency[currencyType].greaterThanOrEqualTo(sum.add(Luts.Upgrades.nextPrice(u,price,currencyPos)).floor())){
            price = Luts.Upgrades.nextPrice(u,price,currencyPos);

            sum = sum.add(price);
            u.lastMaxPrice = price;
            u.lastBuyAmount[currencyPos] += 1;
        }*/
        u.lastBuyAmount[currencyPos] = -1;
    }else{
        if(u.lastBuyAmount[currencyPos] == Luts.Upgrades.buyAmount && u.level == u.lastBuyAmountLevel[currencyPos])
            return u.lastBuyAmountPrice[currencyPos];
        for(var i = 1; i < num; i++) {
            price = Luts.Upgrades.nextPrice(u,price,currencyPos);
            sum = sum.add(price);
            u.lastMaxPrice = price;
        }
        u.lastBuyAmount[currencyPos] = Luts.Upgrades.buyAmount;
    }

    u.lastBuyAmountLevel[currencyPos] = u.level;
    u.lastBuyAmountPrice[currencyPos] = sum;
    return sum;
};

Luts.Upgrades.nextPrice = function(upgrade,price,currencyPos){
    var u = Luts.Upgrades.get(upgrade);
    var ret;
    if (price == null){
        price = u.price;
        if (Array.isArray(price)) {
            price = price[currencyPos];
        }
    }

    var pif = u.priceIncreaseFactor;
    if (Array.isArray(pif)) {
        pif = pif[currencyPos];
    }

    if (u.priceIncreaseMethod == 0)
        ret = price.times(pif.toString());
    if (u.priceIncreaseMethod == 1)
        ret = price.add(pif.toString());
    return ret;
};

Luts.Upgrades.isBelowMaxLevel = function(upgrade){
    var u = Luts.Upgrades.get(upgrade);
    return u.maxLevel == -1 || u.level < u.maxLevel;
};

Luts.Upgrades.isUpgradeable = function(upgrade,noPriceCheck,multipleNum){
    var u = Luts.Upgrades.get(upgrade);
    if(u.condition && !u.condition(u))
        return false;
    return Luts.Upgrades.isAffordable(upgrade,noPriceCheck,multipleNum) && Luts.Upgrades.isBelowMaxLevel(upgrade);
};

Luts.Upgrades.isAffordable = function(upgrade,noPriceCheck,multipleNum){
    if(multipleNum == null)
        multipleNum = 1;

    var u = Luts.Upgrades.get(upgrade);

    if (Array.isArray(u.currencyType)){
        return u.currencyType.every(function(c,i){
            return (Luts.Upgrades.currency[c].greaterThanOrEqualTo(Luts.Upgrades.priceMultiple(u,multipleNum,i).floor()) || noPriceCheck)
        })
    }else
        return (Luts.Upgrades.currency[u.currencyType].greaterThanOrEqualTo(Luts.Upgrades.priceMultiple(u,multipleNum).floor()) || noPriceCheck);
};


Luts.Upgrades.get = function(upgrade){
    if (typeof upgrade == 'string')
        return Luts.Upgrades.getByName(upgrade);
    else
        return upgrade;
};

Luts.Upgrades.value = function(upgrade){
    return Luts.Upgrades.get(upgrade).value;
};

Luts.Upgrades.getByName = function(name){
    for(var i = 0; i < Luts.Upgrades.upgrades.length; i++){
        var u = Luts.Upgrades.upgrades[i];
        if (u.name == name)
            return u;
    }
    return null;
};

Luts.Upgrades.saveUpgrade = function(upgrade){
    var u = Luts.Upgrades.get(upgrade);
    Luts.Store.setItem('u_level_' + u.name,u.level);
    Luts.Store.setItem('u_value_' + u.name,u.value.toExponential(6));
    Luts.Store.setItem('u_multi_' + u.name,u.multiplier.toExponential(6));
    //Luts.Store.setItem('u_piv_' + u.name,u.priceIncreaseFactor);
    Luts.Store.setItem('u_vi_' + u.name,u.valueIncrease.toExponential(6));

    if (Array.isArray(u.price)){
        for(var i = 0; i < u.price.length; i++){
            Luts.Store.setItem('u_price' + i + '_' + u.name, u.price[i].toExponential(6));
        }
    }else {
        Luts.Store.setItem('u_price_' + u.name, u.price.toExponential(6));
    }
};

Luts.Upgrades.loadUpgrade = function(upgrade){
    var u = Luts.Upgrades.get(upgrade);
    var lvl = Luts.Store.getItem('u_level_' + u.name);
    if (lvl != null){
        u.level = lvl;
        u.value = BigNumber(Luts.Store.getItem('u_value_' + u.name,u.value,true));
        u.multiplier = BigNumber(Luts.Store.getItem('u_multi_' + u.name,u.multiplier,true));
        //u.priceIncreaseFactor = Luts.Store.getItem('u_piv_' + u.name);
        u.valueIncrease = BigNumber(Luts.Store.getItem('u_vi_' + u.name));

        if (Array.isArray(u.price)){
            for(var i = 0; i < u.price.length; i++){
                u.price[i] = BigNumber(Luts.Store.getItem('u_price' + i + '_' + u.name,u.price[i],true));
            }
        }else {
            u.price = BigNumber(Luts.Store.getItem('u_price_' + u.name, u.price, true));
        }
    }
};

Luts.Upgrades.saveAll = function(){
    Luts.Upgrades.upgrades.forEach(Luts.Upgrades.saveUpgrade);
    Luts.Store.setItem('buyAmount',Luts.Upgrades.buyAmount);

    for(var i=0; i<Luts.Upgrades.currency.length; i++){
        Luts.Upgrades.saveCurrency(i);
    }
};

Luts.Upgrades.loadAll = function(){
    Luts.Upgrades.upgrades.forEach(Luts.Upgrades.loadUpgrade);
    Luts.Upgrades.buyAmount = Luts.Store.getItem('buyAmount',1);

    for(var i=0; i<Luts.Upgrades.currency.length; i++){
        Luts.Upgrades.loadCurrency(i);
    }
};


Luts.Achievements = {};

Luts.Achievements.init = function(){
    Luts.Achievements.achievements = [];
    Luts.Achievements.achievedNum = Luts.Store.getItem('achievedNum',0);
    Luts.Events.onAchievementUnlocked = new Phaser.Signal();
};

Luts.Achievements.add = function(id,name,description,goal,goalIncrease,callback,reward,rewardIncrease){
    var achievement = {
        id: id,
        name: name,
        description: description,
        value: BigNumber(0),
        level: 0,
        baseGoal: BigNumber(goal),
        goal: BigNumber(goal),
        goalIncrease: goalIncrease,
        callback: callback,
        signal: new Phaser.Signal(),
        goalIncreaseMethod: 0,
        baseReward: BigNumber(reward),
        reward: BigNumber(reward),
        rewardIncrease: rewardIncrease,
        maxLevel: -1
    };
    Luts.Achievements.achievements.push(achievement);
    Luts.Achievements.loadAchievement(id);
    return achievement;
};

Luts.Achievements.reset = function(achievement){
    var a = Luts.Achievements.get(achievement);
    a.level = 0;
    a.value = BigNumber(0);
    a.goal = a.baseGoal;
    a.reward = a.baseReward;
};

Luts.Achievements.resetAll = function(){
    Luts.Achievements.achievements.forEach(function(a){
        Luts.Achievements.reset(a);
    });
    Luts.Achievements.achievedNum = 0;
};

Luts.Achievements.get = function(achievement){
    if (typeof achievement == 'string')
        return Luts.Achievements.getByName(achievement);
    else
        return achievement;
};

Luts.Achievements.getByName = function(id){
    for(var i = 0; i < Luts.Achievements.achievements.length; i++){
        var u = Luts.Achievements.achievements[i];
        if (u.id == id)
            return u;
    }
    return null;
};

Luts.Achievements.set = function(achievement,value,absolute){
    var a = Luts.Achievements.get(achievement);
    if (a == null)
        return;

    if (absolute)
        a.value = BigNumber(value);
    else
        a.value = a.value.add(value);

    while (a.value.greaterThanOrEqualTo(a.goal) && (a.level < a.maxLevel || a.maxLevel == -1)){
        if (a.callback)
            a.callback(a);
        if(a.goalIncreaseMethod == 0)
            a.goal = a.goal.times(a.goalIncrease);
        else
            a.goal = a.goal.add(a.goalIncrease);
        a.level += 1;
        Luts.Achievements.achievedNum += 1;


        a.reward = a.reward.times(a.rewardIncrease);

        Luts.Store.setItem('achievedNum',Luts.Achievements.achievedNum);

        Luts.Events.onAchievementUnlocked.dispatch(a);
        a.signal.dispatch(a);
    }
    Luts.Achievements.saveAchievement(achievement);
};


Luts.Achievements.saveAchievement = function(achievement){
    var u = Luts.Achievements.get(achievement);
    Luts.Store.setItem('a_level_' + u.id,u.level);
    Luts.Store.setItem('a_value_' + u.id,u.value.toExponential(6));
    Luts.Store.setItem('a_goal_' + u.id,u.goal.toExponential(6));
    Luts.Store.setItem('a_reward_' + u.id,u.reward.toExponential(6));
};

Luts.Achievements.loadAchievement = function(achievement){
    var u = Luts.Achievements.get(achievement);
    var lvl = Luts.Store.getItem('a_level_' + u.id);
    if (lvl != null){
        u.level = lvl;
        u.value = BigNumber(Luts.Store.getItem('a_value_' + u.id,u.value,true));
        u.goal = BigNumber(Luts.Store.getItem('a_goal_' + u.id,u.goal,true));
        u.reward = BigNumber(Luts.Store.getItem('a_reward_' + u.id,u.reward,true));
    }
};

Luts.Achievements.saveAll = function(){
    Luts.Achievements.achievements.forEach(Luts.Achievements.saveAchievement);
    Luts.Store.setItem('achievedNum',Luts.Achievements.achievedNum);
};

Luts.Achievements.loadAll = function(){
    Luts.Achievements.achievements.forEach(Luts.Achievements.loadAchievement);
};
Luts.Format = {};

Luts.Format.Time = function(mseconds,long){
    var msec = mseconds;
    var sec = Math.floor(msec / 1000);
    var min = Math.floor(sec / 60);
    var hours = Math.floor(min / 60);
    var days = Math.floor(hours / 24);

    var subHours = hours - days * 24;
    var subMin = min - hours * 60;
    var subSec = sec - min * 60;
    var subMsec = msec - sec * 1000;

    var ret = "";
    var daysSpace,hoursSpace,minSpace,secSpace,msecSpace;
    if(long){
        daysSpace = " Days, ";
        hoursSpace = " Hours, ";
        minSpace = " Minutes, ";
        secSpace = " Seconds";
        msecSpace = "";
    }else{
        daysSpace = "d";
        hoursSpace = ":";
        minSpace = ":";
        secSpace = "";
        msecSpace = "";
    }

    if (days > 0)
        ret += days + daysSpace;
    if (subHours > 0 || days > 0)
        ret += subHours + hoursSpace;
    if (subMin > 0 || subHours > 0 || days > 0) {
        if(subHours > 0 || days > 0)
            ret += subMin.toString().paddingLeft("00") + minSpace;
        else
            ret += subMin.toString() + minSpace;
        ret += subSec.toString().paddingLeft("00") + secSpace;
    }else {
        ret += subSec.toString() + secSpace;
        if(subSec < 10 && !long)
            ret += "." + Math.floor(subMsec / 100) + msecSpace;
    }

    return ret;
};

Luts.Format.Color = function(color){
    return ('<c=' + Luts.Config['colors'][color] + '>');
};

Luts.Format.BigNumber = function(bigNumber,long,decimalPlaces){
    var post = "";
    var i = 0;

    if (decimalPlaces == null)
        decimalPlaces = 2;


    if (bigNumber.e == null)
        bigNumber = BigNumber(parseFloat(bigNumber).toExponential(15));

    BigNumber.config({EXPONENTIAL_AT: 6, DECIMAL_PLACES: 3});

    if (bigNumber.e < 3)
        return bigNumber.times(Math.pow(10,decimalPlaces)).round().dividedBy(Math.pow(10,decimalPlaces)).toString();
    
    var format;
    if (Luts.numberFormat == 0)
        format = Luts.Format.BigNumberSuffix(bigNumber,long);
    if (Luts.numberFormat == 1)
        format = Luts.Format.BigNumberExp(bigNumber);
    if (Luts.numberFormat == 2)
        format = Luts.Format.BigNumberAB(bigNumber);
    post = format.post;
    i = format.i;

    var div = 1;
    var counter = 0;
    while (i > 0 && counter++ < 2){
        i--;
        div *= 10;
    }

    return (bigNumber.dividedBy(BigNumber(10).pow(i)).round() / div) + post;
};

Luts.Format.BigNumberSuffix = function(bigNumber,long){
    var i = 0;
    var post = "";
    var names;
    if(long)
        names = Luts.Format.BigNumberNames;
    else
        names = Luts.Format.BigNumberNamesSmall;

    if (bigNumber.e > 100) {
        return (Luts.Format.BigNumberExp(bigNumber));
    }else if (bigNumber.e >= 3){
        if (long)
            post = " ";
        post += names[Math.floor((bigNumber.e - 3) / 3)];
        i = Math.floor((bigNumber.e) / 3) * 3;
    }

    return {post: post, i: i};
};

Luts.Format.BigNumberExp = function(bigNumber){
    var i = 0;
    var post = "";
    if (bigNumber.e >= 3) {
        post += "e" + (Math.floor((bigNumber.e) / 3) * 3);
        i = Math.floor((bigNumber.e) / 3) * 3;
    }

    return {post: post, i: i};
};

Luts.Format.BigNumberAB = function(bigNumber){
    var i = 0;
    var post = "";
    var l = Luts.Format.Letters;

    var n = Math.floor((bigNumber.e - 6) / 3);

    if(n < l.length)
        post += l[n];
    else if (n < Math.pow(l.length,2)){
        post += l[Math.floor(n / l.length)];
        post += l[n % l.length];
    }else if (n < Math.pow(l.length,3)){
        post += l[Math.floor(n / Math.pow(l.length,2))];
        post += l[n % Math.pow(l.length,2)];
        post += l[n % l.length];
    }

    i = Math.floor((bigNumber.e) / 3) * 3;

    return {post: post, i: i};
};

Luts.Format.BigNumberNames = [
    "Thousand","Million", "Billion", "Trillion", "Quadrillion","Quintillion","Sextillion","Septillion","Octillion","Nonillion","Decillion","Undecillion","Duodecillion",
    "Tredecillion","Quattuordecillion","Quinquadecillion","Sedecillion","Septendecillion","Octodecillion","Novendecillion","Vigintillion","Unvigintillion","Duovigintillion","Tresvigintillion",
    "Quattuorvigintillion","Quinquavigintillion","Sesvigintillion","Septemvigintillion","Octovigintillion","Novemvigintillion","Trigintillion","Untrigintillion","Duotrigintillion"
];

Luts.Format.BigNumberNamesSmall = [
    "k","M", "B", "T", "Qa","Qi","Sx","Sp","Oc","No","De","UD","DD",
    "TD","QaD","QiD","SxD","SpD","OcD","NoD","Vi","UV","DuV","TV",
    "QaV","QiV","SxV","SpV","OcV","NoV","Tg","UT","DT"
];

Luts.Format.Letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

String.prototype.paddingLeft = function (paddingValue) {
    return String(paddingValue + this).slice(-paddingValue.length);
};
Luts.Value = function(name,value,displayName){
    this.name = name;
    this.displayName = displayName;
    this.v = BigNumber(Luts.Store.getItem(name,value,true));
    this.multipliers = [];
    Luts.Value.values.push(this);

    var mNames = JSON.parse(Luts.Store.getItem(name + '_m',null));
    if (mNames){
        mNames.forEach(function (m) {
            var multi = new Luts.Multiplier(m,this.name);
            this.multipliers.push(multi);
        }.bind(this))
    }
    this.save();
};

Luts.Value.values = [];

Luts.Value.prototype.constructor = Luts.Value;

Luts.Value.saveAll = function(){
    Luts.Value.values.forEach(function(t){
        t.save();
    });
};

Luts.Value.getByName = function(name){
    for(var i = 0; i  <Luts.Value.values.length; i++){
        if ( Luts.Value.values[i].name == name)
            return Luts.Value.values[i];
    }
    return null;
};

Luts.Value.get = function(value){
    if (typeof (value) == 'string')
        return Luts.Value.getByName(value);
    else
        return value;
};

Luts.Value.prototype.save = function(){
    Luts.Store.setItem(this.name,this.v.toExponential(6));

    var mNames = [];
    for (var i = 0; i < this.multipliers.length; i++){
        mNames.push(this.multipliers[i].name);
    }
    Luts.Store.setItem(this.name + '_m',JSON.stringify(mNames));

    this.multipliers.forEach(function (value) { value.save() });
};

Luts.Value.prototype.setMultiplier = function(name,value,type){
    var multi;
    multi = this.getMultiplier(name);
    if (!multi) {
        multi = new Luts.Multiplier(name,this.name, value, type);
        this.multipliers.push(multi);
    }
    multi.value = BigNumber(value);
    this.save();
    return multi;
};

Luts.Value.prototype.getMultiplier = function(name){
    for(var i = 0; i < this.multipliers.length; i++) {
        if (this.multipliers[i].name == name)
            return this.multipliers[i];
    }
    return null;
};

Luts.Value.prototype.modValue = function(){
    var sum = this.v;
    for(var i = 0; i < this.multipliers.length; i++){
        var m = this.multipliers[i];
        if (m.type == 1)
            sum = sum.add(m.value);
    }
    for(i = 0; i < this.multipliers.length; i++){
        m = this.multipliers[i];
        if (m.type == 0)
            sum = sum.mul(m.value);
    }
    return sum;
};

Luts.Multiplier = function (name,prefix,value,type) {
    if (type == null)
        type = 0;

    this.name = name;
    this.prefix = prefix;
    this.value = BigNumber(Luts.Store.getItem(this.prefix + '_' + this.name,value,true));
    this.type = type;
};

Luts.Multiplier.prototype.constructor = Luts.Multiplier;

Luts.Multiplier.prototype.save = function () {
    Luts.Store.setItem(this.prefix + '_' + this.name,this.value.toExponential(6));
};


Luts.Levelable = function(name,baseCost,costIncrease){
    this.name = name;
    this.baseCost = baseCost;
    this.progress = new Luts.Value('la_' + name + 'Progress',0);
    this.cost = new Luts.Value('la_' + name + 'Cost',baseCost);
    this.costIncrease = costIncrease;
    this.level = new Luts.Value('la_' + name + 'Level',0);
    this.onIncreaseLevel = new Phaser.Signal();
    this.onChange = new Phaser.Signal();
};

Luts.Levelable.prototype.constructor = Luts.Levelable;

Luts.Levelable.prototype.addProgress = function(num){
    this.progress.v = this.progress.v.add(num);
    this.onChange.dispatch(this);

    while(this.progress.v.greaterThanOrEqualTo(this.cost.v)){
        this.progress.v = this.progress.v.minus(this.cost.v);
        this.cost.v = this.cost.v.times(this.costIncrease);
        this.level.v = this.level.v.add(1);
        this.onIncreaseLevel.dispatch(this.level.v);
    }
};

Luts.Levelable.prototype.progressDiv = function(){
    return (this.progress.v.dividedBy(this.cost.v));
};

Luts.Levelable.prototype.progressDivString = function(){
    return Luts.Format.BigNumber(this.progress.v) + " / " + Luts.Format.BigNumber(this.cost.v);
};

Luts.Levelable.prototype.reset = function(){
    this.level.v = BigNumber(0);
    this.progress.v = BigNumber(0);
    this.cost.v = BigNumber(this.baseCost);
};
Luts.Shop = {
    buyableItems: []
};

Luts.Shop.init = function(callback){

};

Luts.Shop.getBuyableItems = function (callback) {
    var array = [];
    if (Luts.Connect.kong){
        Luts.Connect.kong.mtx.requestItemList([],function(result){
            if (result.success){
                if(Luts.DEBUG)
                    console.log(result.data);
                result.data.forEach(function(a){
                    array.push({id: a.identifier,name: a.name, cost: a.price});
                })
            }
            callback(array);
        });
    }  else{
        for(var i = 0; i < 100; i++){
            array.push({id: "item" + i,name: "item" + i, cost: 10});
        }
        callback(array);
    }
};

Luts.Shop.getCost = function(id,callback){
    if (Luts.Shop.buyableItems.length == 0){
        setTimeout(function(){Luts.Shop.getCost(id,callback)},1000);
    }else{
        for(var i = 0; i < Luts.Shop.buyableItems.length; i++){
            var item = Luts.Shop.buyableItems[i];
            if (item.id == id) {
                callback(item.cost);
                return;
            }
        }
        callback(10);
    }
};

Luts.Shop.buyItem = function(item,callback){
    if (Luts.Connect.kong) {
        Luts.Connect.kong.mtx.purchaseItems([item], function (result) {
            if (callback)
                callback(result.success);
        });
    }else{
        if(Luts.DEBUG)
            console.log("Bought item " + item);
        callback(true);
    }
};

Luts.Shop.getItemList = function(callback){
    if (Luts.Connect.kong) {
        Luts.Connect.kong.mtx.requestUserItemList(null, function (result) {
            if (result.success) {
                if (callback)
                    callback(result.data);
            }
        });
    }else {
        if(Luts.DEBUG)
            console.log("Got item list");
        callback([]);
    }
};

Luts.Shop.hasItem = function(id,callback){
    if (Luts.Connect.kong) {
        Luts.Shop.getItemList(function (array) {
            if(Luts.DEBUG)
                console.log("Item list: ",array);
            for (var i = 0; i < array.length; i++) {
                if (array[i].identifier == id) {
                    callback(true);
                    return;
                }
            }
            callback(false);
        });
    }else{
        if(Luts.DEBUG)
            console.log("Checked for " + id);
        callback(false);
    }
};

Luts.Shop.getItemCount = function(id,callback){
    var n = 0;
    if (Luts.Connect.kong) {
        Luts.Shop.getItemList(function (array) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].identifier == id) {
                    n++;
                }
            }
            callback(n);
        });
    }else {
        callback(n);
    }
};

Luts.Shop.getFirstItemId = function(identifier,callback){
    if (Luts.Connect.kong) {
        Luts.Shop.getItemList(function (array) {
            if(Luts.DEBUG)
                console.log("Item list: ",array);
            for (var i = 0; i < array.length; i++) {
                if (array[i].identifier == identifier) {
                    callback(array[i].id);
                    return;
                }
            }
            callback(null);
        });
    }else{
        if(Luts.DEBUG)
            console.log("Checked for " + identifier);
        callback(1);
    }
};



Luts.Shop.useItem = function(id,callback){
    if (Luts.Connect.kong) {
        Luts.Shop.getFirstItemId(id, function (item) {
            if (item) {
                Luts.Connect.kong.mtx.useItemInstance(item, function (result) {
                    callback(result.success);
                })
            }else {
                if(Luts.DEBUG)
                    console.log("doesnt have item");
            }
        });
    }else{
        if(Luts.DEBUG)
            console.log("Used item " + id);
        callback(false);
    }
};

Luts.Connect = {
    kong: false,
    ga: false,
    playfab: false
};

Luts.Connect.all = function(callback){
    Luts.Connect.Kongregate(function(){
        Luts.Connect.PlayFab(callback);
    });
    Luts.Connect.GameAnalytics();

};

Luts.Connect.Kongregate = function(callback) {
    if (window.location.href.toString().includes("kongregate")) {
        kongregateAPI.loadAPI(function () {
            Luts.Connect.kong = kongregateAPI.getAPI();

            Luts.Shop.getBuyableItems(function(array){
                Luts.Shop.buyableItems = array;
            });

            if (callback)
                callback();
        });
    }else{
        console.log("not connected to kongregate");
        if (callback)
            callback();
    }
};

Luts.Connect.GameAnalytics = function () {
    if(Luts.track) {
        GameAnalytics("setEnabledInfoLog", Luts.DEBUG && Luts.trackLog);
        GameAnalytics("setEnabledVerboseLog", Luts.DEBUG && Luts.trackLog);
        GameAnalytics("configureBuild", Luts.version);
        GameAnalytics('initialize', Luts.gameAnalytics.id, Luts.gameAnalytics.secret);
        Luts.Connect.ga = GameAnalytics;
    }
};

Luts.Connect.PlayFab = function(callback){
    PlayFab.settings.titleId = Luts.playfab.id;
    Luts.Connect.playfab = PlayFab;

    PlayFab.ClientApi.LoginWithCustomID({
        TitleId: PlayFab.settings.titleId,
        CustomId: 'anonymous',
        CreateAccount: true
    },function(a){Luts.Connect.playfab = a;callback()});
};
Luts.Highscore = {};

Luts.Highscore.submit = function(highscore,value){
    Luts.Analytics.track('design','Highscore:'+highscore,value);

    if(Luts.DEBUG)
        console.log("HS_Submit: " + highscore + ": " + value);

    if(Luts.Connect.kong){
        Luts.Connect.kong.stats.submit(highscore,value);
    }
};
Luts.Analytics = {};

Luts.Analytics.track = function(type,param1,param2,param3,param4,param5){
    if (!Luts.track)
        return;

    if (Luts.trackLog)
        console.log(type,param1,param2);

    if (Luts.Connect.ga){
        var eventType;
        switch (type){
            case 'progress':
                eventType = "addProgressionEvent";
                break;
            case 'design':
                eventType = "addDesignEvent";
                break;
            default: return;
        }
        GameAnalytics(eventType,param1,param2,param3,param4,param5);
    }
};
Luts.GameData = {

};

Luts.GameData.getNews = function(callback){
    if(Luts.Connect.playfab){
        PlayFab.ClientApi.GetTitleNews({Count: 1},function (ret) {
            var news = ret["data"]["News"][0];
            if (news && news['Timestamp'] != Luts.Store.getItem('latestNews',0,true)) {
                Luts.Store.setItem('latestNews',news['Timestamp']);
                callback(news["Body"]);
            }
        });
    }
};
Luts.Time = {};

Luts.Time.init = function(state){
    Luts.Time.state = state;

    Luts.Time.timeStampAdress = "//currentmillis.com/time/minutes-since-unix-epoch.php";
    setInterval(Luts.Time.asyncUpdate,Luts.GAME_SPEED);

    Luts.Time.activePlaytime = Luts.Store.getItem('activePlaytime',0);
    Luts.Time.passivePlaytime = Luts.Store.getItem('passivePlaytime',0);
    Luts.Time.currentResetActivePlaytime = Luts.Store.getItem('currentResetActivePlaytime',0);
    Luts.Time.currentResetPassivePlaytime = Luts.Store.getItem('currentResetPassivePlaytime',0);
};

Luts.Time.asyncUpdate = function(){
    Luts.Time.activePlaytime += 100;
    Luts.Time.passivePlaytime += 100;
    Luts.Time.currentResetActivePlaytime += 100;
    Luts.Time.currentResetPassivePlaytime += 100;

    if(Luts.Time.state.asyncUpdate)
        Luts.Time.state.asyncUpdate();
};


Luts.Time.handleTimeAway = function(additionalDif,callback){
    Luts.Util.httpGetAsync(this.timeStampAdress,function(res){
        var onlineTime = new Date(res * 60 * 1000);
        var lastTime = Luts.Store.getItem('time', new Date().getTime());
        Luts.Store.setItem('time',new Date().getTime());

        //console.log(onlineTime.getTime(),lastTime);
        //console.log(onlineTime);

        var  dif = Math.max(new Date().getTime() - lastTime,0);

        if (new Date().getTime() - onlineTime > 1000 * 60 * 60)
            dif = 0;

        if (additionalDif)
            dif += additionalDif;

        var ret = {};
        ret.lastTime = lastTime;
        ret.msec = dif;
        ret.sec = Math.floor(dif / 1000);
        ret.min = Math.floor(ret.sec / 60);
        ret.hour = Math.floor(ret.min / 60);
        ret.day = Math.floor(ret.hour / 24);
        ret.month = Math.floor(ret.day / 30);
        ret.year = Math.floor(ret.day / 365);

        console.log("Gone for:");
        console.log(ret);

        if (callback)
            callback(ret);
        setInterval(Luts.Time.saveTime,1000);
    });
};

Luts.Time.saveTime = function(){
    Luts.Store.setItem('time',new Date().getTime());
    Luts.Store.setItem('activePlaytime',Luts.Time.activePlaytime);
    Luts.Store.setItem('passivePlaytime',Luts.Time.passivePlaytime);
    Luts.Store.setItem('currentResetActivePlaytime',Luts.Time.currentResetActivePlaytime);
    Luts.Store.setItem('currentResetPassivePlaytime',Luts.Time.currentResetPassivePlaytime);
};
Luts.Save = {};

Luts.Save.init = function(){
    document.getElementById('close').onclick = this.closeSavePrompt.bind(this);
    document.getElementById('copy').onclick = this.copySave.bind(this);
    document.getElementById('load').onclick = this.loadSave.bind(this);
};


Luts.Save.savePrompt = function(){
    document.getElementById('savePrompt').style.display = 'block';
    document.getElementById('saveInstruction').style.display = 'block';
    document.getElementById('loadInstruction').style.display = 'none';
    document.getElementById('load').style.display = 'none';
    document.getElementById('copy').style.display = 'inline';

    var textArea = document.getElementById('save');
    textArea.value = btoa(JSON.stringify(Luts.Storage));
    textArea.value = CryptoJS.AES.encrypt(textArea.value,Luts.Name);
    textArea.select();

    Luts.gamePaused = true;
};

Luts.Save.loadPrompt = function(){
    document.getElementById('savePrompt').style.display = 'block';
    document.getElementById('saveInstruction').style.display = 'none';
    document.getElementById('loadInstruction').style.display = 'block';
    document.getElementById('load').style.display = 'inline';
    document.getElementById('copy').style.display = 'none';

    var textArea = document.getElementById('save');
    textArea.value = '';

    Luts.gamePaused = true;
};

Luts.Save.closeSavePrompt = function(){
    document.getElementById('savePrompt').style.display = 'none';
    Luts.gamePaused = false;
};


Luts.Save.copySave = function(){
    var textArea = document.getElementById('save');
    textArea.select();
    document.execCommand('copy');
    //this.closeSavePrompt();
};

Luts.Save.loadSave = function(){
    var textArea = document.getElementById('save');
    var data = CryptoJS.AES.decrypt(textArea.value,Luts.Name).toString(CryptoJS.enc.Utf8);
    data = atob(data);
    Luts.Store.setStorage(JSON.parse(data.toString()));
    window.location.reload(false);
};
Luts.Camera = function (state,minX,maxX,minY,maxY) {
    this.state = state;
    this.game = state.game;

    this.setSize(minX,maxX,minY,maxY);

    this.follow = null;

    this.raw = {x: 0,y:0};
    this.smooth = {x: 0,y:0};

    this.CAMERA_SMOOTH = 0.1;
    this.perlin = new SimplexNoise();
    this.minShake = 0.1;
    this.shakeEnabled = new Luts.Util.Setting('shakeEnabled',true,'Enable screen shake');
    this.shake = 0;
    this.shakeMulti = 50;
    this.shakeReduce = 0.9;
    this.shakeSpeed = 0.2;
    this.t = 0;
};

Luts.Camera.prototype.constructor = Luts.Camera;

Luts.Camera.prototype.setSize = function(minX,maxX,minY,maxY){
    this.minX =minX;
    this.maxX =maxX;
    this.minY =minY;
    this.maxY =maxY;
};

Luts.Camera.prototype.update = function(){
    if (this.follow){
        this.centerOn(this.follow.x,this.follow.y);
    }

    var realShake =  Phaser.Math.clamp(this.shake,this.minShake,1);
    this.shake = Math.max(0,this.shake * this.shakeReduce);
    this.t += this.shakeSpeed * realShake;

    this.raw.x = Phaser.Math.clamp(this.raw.x, this.minX, this.maxX);
    this.raw.y = Phaser.Math.clamp(this.raw.y, this.minY, this.maxY);

    this.smooth.x += (this.raw.x - this.smooth.x) * this.CAMERA_SMOOTH;
    this.smooth.y += (this.raw.y - this.smooth.y) * this.CAMERA_SMOOTH;

    if (!this.shakeEnabled.value)
        realShake = 0;

    this.game.camera.x = this.smooth.x + Math.pow(realShake,2) * this.shakeMulti * this.perlin.noise2D(this.t,0);
    this.game.camera.y = this.smooth.y + Math.pow(realShake,2) * this.shakeMulti * this.perlin.noise2D(this.t,1);
};

Luts.Camera.prototype.setFollow = function(obj) {
    this.follow = obj;
    this.setTo(this.follow.x - this.game.width / 2,this.follow.y - this.game.height / 2);
};

Luts.Camera.prototype.centerOn = function(x,y){
    this.raw.x = x - this.game.width / 2;
    this.raw.y = y - this.game.height / 2;
};

Luts.Camera.prototype.setTo = function(x,y){
    this.raw.x = x;
    this.raw.y = y;

    this.smooth.x = x;
    this.smooth.y = y;

    this.game.camera.x = x;
    this.game.camera.y = y;
};
Luts.Pathfinding={
    findPath: function(world,start,end){
        var world1 = [];
        for(var i=0; i<world.length; i++){
            world1[i] = [];
            for(var j = 0; j< world[i].length; j++){
                world1[i][j] =  world[i][j].tileObject.getWeight();
            }
        }


        var graph = new Graph(world1,{diagonal: true});
        var startNode = graph.grid[start.x][start.y];
        var endNode = graph.grid[end.x][end.y];
        var path = astar.search(graph, startNode,endNode);
        if (path.length > 0)
            return path;
        else
            return [];
    }
};


// javascript-astar 0.4.1
// http://github.com/bgrins/javascript-astar
// Freely distributable under the MIT License.
// Implements the astar search algorithm in javascript using a Binary Heap.
// Includes Binary Heap (with modifications) from Marijn Haverbeke.
// http://eloquentjavascript.net/appendix2.html
function pathTo(node) {
    var curr = node;
    var path = [];
    while (curr.parent) {
        path.unshift(curr);
        curr = curr.parent;
    }
    return path;
}

function getHeap() {
    return new BinaryHeap(function(node) {
        return node.f;
    });
}

var astar = {
    /**
     * Perform an A* Search on a graph given a start and end node.
     * @param {Graph} graph
     * @param {GridNode} start
     * @param {GridNode} end
     * @param {Object} [options]
     * @param {bool} [options.closest] Specifies whether to return the
     path to the closest node if the target is unreachable.
     * @param {Function} [options.heuristic] Heuristic function (see
     *          astar.heuristics).
     */
    search: function(graph, start, end, options) {
        graph.cleanDirty();
        options = options || {};
        var heuristic = options.heuristic || astar.heuristics.manhattan;
        var closest = options.closest || false;

        var openHeap = getHeap();
        var closestNode = start; // set the start node to be the closest if required

        start.h = heuristic(start, end);
        graph.markDirty(start);

        openHeap.push(start);

        while (openHeap.size() > 0) {

            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            var currentNode = openHeap.pop();

            // End case -- result has been found, return the traced path.
            if (currentNode === end) {
                return pathTo(currentNode);
            }

            // Normal case -- move currentNode from open to closed, process each of its neighbors.
            currentNode.closed = true;

            // Find all neighbors for the current node.
            var neighbors = graph.neighbors(currentNode);

            for (var i = 0, il = neighbors.length; i < il; ++i) {
                var neighbor = neighbors[i];

                if (neighbor.closed || neighbor.isWall()) {
                    // Not a valid node to process, skip to next neighbor.
                    continue;
                }

                // The g score is the shortest distance from start to current node.
                // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
                var gScore = currentNode.g + neighbor.getCost(currentNode);
                var beenVisited = neighbor.visited;

                if (!beenVisited || gScore < neighbor.g) {

                    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                    neighbor.visited = true;
                    neighbor.parent = currentNode;
                    neighbor.h = neighbor.h || heuristic(neighbor, end);
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;
                    graph.markDirty(neighbor);
                    if (closest) {
                        // If the neighbour is closer than the current closestNode or if it's equally close but has
                        // a cheaper path than the current closest node then it becomes the closest node
                        if (neighbor.h < closestNode.h || (neighbor.h === closestNode.h && neighbor.g < closestNode.g)) {
                            closestNode = neighbor;
                        }
                    }

                    if (!beenVisited) {
                        // Pushing to heap will put it in proper place based on the 'f' value.
                        openHeap.push(neighbor);
                    } else {
                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                        openHeap.rescoreElement(neighbor);
                    }
                }
            }
        }

        if (closest) {
            return pathTo(closestNode);
        }

        // No result was found - empty array signifies failure to find path.
        return [];
    },
    // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
    heuristics: {
        manhattan: function(pos0, pos1) {
            var d1 = Math.abs(pos1.x - pos0.x);
            var d2 = Math.abs(pos1.y - pos0.y);
            return d1 + d2;
        },
        diagonal: function(pos0, pos1) {
            var D = 1;
            var D2 = Math.sqrt(2);
            var d1 = Math.abs(pos1.x - pos0.x);
            var d2 = Math.abs(pos1.y - pos0.y);
            return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
        }
    },
    cleanNode: function(node) {
        node.f = 0;
        node.g = 0;
        node.h = 0;
        node.visited = false;
        node.closed = false;
        node.parent = null;
    }
};

/**
 * A graph memory structure
 * @param {Array} gridIn 2D array of input weights
 * @param {Object} [options]
 * @param {bool} [options.diagonal] Specifies whether diagonal moves are allowed
 */
/** @constructor */
function Graph(gridIn, options) {
    options = options || {};
    this.nodes = [];
    this.diagonal = !!options.diagonal;
    this.grid = [];
    for (var x = 0; x < gridIn.length; x++) {
        this.grid[x] = [];

        for (var y = 0, row = gridIn[x]; y < row.length; y++) {
            var node = new GridNode(x, y, row[y]);
            this.grid[x][y] = node;
            this.nodes.push(node);
        }
    }
    this.init();
}

Graph.prototype.init = function() {
    this.dirtyNodes = [];
    for (var i = 0; i < this.nodes.length; i++) {
        astar.cleanNode(this.nodes[i]);
    }
};

Graph.prototype.cleanDirty = function() {
    for (var i = 0; i < this.dirtyNodes.length; i++) {
        astar.cleanNode(this.dirtyNodes[i]);
    }
    this.dirtyNodes = [];
};

Graph.prototype.markDirty = function(node) {
    this.dirtyNodes.push(node);
};

Graph.prototype.neighbors = function(node) {
    var ret = [];
    var x = node.x;
    var y = node.y;
    var grid = this.grid;

    // West
    if (grid[x - 1] && grid[x - 1][y]) {
        ret.push(grid[x - 1][y]);
    }

    // East
    if (grid[x + 1] && grid[x + 1][y]) {
        ret.push(grid[x + 1][y]);
    }

    // South
    if (grid[x] && grid[x][y - 1]) {
        ret.push(grid[x][y - 1]);
    }

    // North
    if (grid[x] && grid[x][y + 1]) {
        ret.push(grid[x][y + 1]);
    }

    if (this.diagonal) {
        // Southwest
        if (grid[x - 1] && grid[x - 1][y - 1]) {
            ret.push(grid[x - 1][y - 1]);
        }

        // Southeast
        if (grid[x + 1] && grid[x + 1][y - 1]) {
            ret.push(grid[x + 1][y - 1]);
        }

        // Northwest
        if (grid[x - 1] && grid[x - 1][y + 1]) {
            ret.push(grid[x - 1][y + 1]);
        }

        // Northeast
        if (grid[x + 1] && grid[x + 1][y + 1]) {
            ret.push(grid[x + 1][y + 1]);
        }
    }

    return ret;
};

Graph.prototype.toString = function() {
    var graphString = [];
    var nodes = this.grid;
    for (var x = 0; x < nodes.length; x++) {
        var rowDebug = [];
        var row = nodes[x];
        for (var y = 0; y < row.length; y++) {
            rowDebug.push(row[y].weight);
        }
        graphString.push(rowDebug.join(" "));
    }
    return graphString.join("\n");
};

/** @constructor */
function GridNode(x, y, weight) {
    this.x = x;
    this.y = y;
    this.weight = weight;
}

GridNode.prototype.toString = function() {
    return "[" + this.x + " " + this.y + "]";
};

GridNode.prototype.getCost = function(fromNeighbor) {
    // Take diagonal weight into consideration.
    if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
        return this.weight * 1.41421;
    }
    return this.weight;
};

GridNode.prototype.isWall = function() {
    return this.weight === 0;
};
/** @constructor */
function BinaryHeap(scoreFunction) {
    this.content = [];
    this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
    push: function(element) {
        // Add the new element to the end of the array.
        this.content.push(element);

        // Allow it to sink down.
        this.sinkDown(this.content.length - 1);
    },
    pop: function() {
        // Store the first element so we can return it later.
        var result = this.content[0];
        // Get the element at the end of the array.
        var end = this.content.pop();
        // If there are any elements left, put the end element at the
        // start, and let it bubble up.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.bubbleUp(0);
        }
        return result;
    },
    remove: function(node) {
        var i = this.content.indexOf(node);

        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();

        if (i !== this.content.length - 1) {
            this.content[i] = end;

            if (this.scoreFunction(end) < this.scoreFunction(node)) {
                this.sinkDown(i);
            } else {
                this.bubbleUp(i);
            }
        }
    },
    size: function() {
        return this.content.length;
    },
    rescoreElement: function(node) {
        this.sinkDown(this.content.indexOf(node));
    },
    sinkDown: function(n) {
        // Fetch the element that has to be sunk.
        var element = this.content[n];

        // When at 0, an element can not sink any further.
        while (n > 0) {

            // Compute the parent element's index, and fetch it.
            var parentN = ((n + 1) >> 1) - 1;
            var parent = this.content[parentN];
            // Swap the elements if the parent is greater.
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                this.content[parentN] = element;
                this.content[n] = parent;
                // Update 'n' to continue at the new position.
                n = parentN;
            }
            // Found a parent that is less, no need to sink any further.
            else {
                break;
            }
        }
    },
    bubbleUp: function(n) {
        // Look up the target element and its score.
        var length = this.content.length;
        var element = this.content[n];
        var elemScore = this.scoreFunction(element);

        while (true) {
            // Compute the indices of the child elements.
            var child2N = (n + 1) << 1;
            var child1N = child2N - 1;
            // This is used to store the new position of the element, if any.
            var swap = null;
            var child1Score;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                var child1 = this.content[child1N];
                child1Score = this.scoreFunction(child1);

                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore) {
                    swap = child1N;
                }
            }

            // Do the same checks for the other child.
            if (child2N < length) {
                var child2 = this.content[child2N];
                var child2Score = this.scoreFunction(child2);
                if (child2Score < (swap === null ? elemScore : child1Score)) {
                    swap = child2N;
                }
            }

            // If the element needs to be moved, swap it, and continue.
            if (swap !== null) {
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }
            // Otherwise, we are done.
            else {
                break;
            }
        }
    }
};

Luts.Skills = {
    skills: []
};

Luts.Skills.add = function(id,name,description,condition,multiUseable){
      Luts.Skills.skills.push(new Luts.Skill(id,name,description,condition,multiUseable));
};

Luts.Skills.get = function(id){
    if (typeof id == 'string')
        return Luts.Skills.getByName(id);
    else
        return id;
};

Luts.Skills.getByName = function(id){
    for(var i = 0; i < Luts.Skills.skills.length; i++){
        if (Luts.Skills.skills[i].id == id)
            return Luts.Skills.skills[i];
    }
    return null;
};



Luts.Skill = function (id,name,description,condition,multiUseable) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.condition = condition;
    this.multiUseable = multiUseable;
    this.canUse = true;
    this.isActive = false;
    this.currentActiveTime = 0;
    this.activatable = false;

    this.onUse = new Phaser.Signal();
    this.onCanUse = new Phaser.Signal();
    this.onCanUseChanged = new Phaser.Signal();
    this.onActivate = new Phaser.Signal();
    this.onDeactivate = new Phaser.Signal();

    this.checkCondition();
};

Luts.Skill.prototype.use = function(times){
    //if (this.checkCondition())
    if (this.button.active)
        this.onUse.dispatch(times);
};

Luts.Skill.prototype.checkCondition = function () {
    var old = this.canUse;
    if (this.condition)
        this.canUse = this.condition() && !this.isActive;
    else
        this.canUse = true;

    if (!old && this.canUse) {
        this.onCanUse.dispatch();
        this.onCanUseChanged.dispatch();
    }
    if (old && !this.canUse)
        this.onCanUseChanged.dispatch();

    return this.canUse;
};

Luts.Skill.prototype.update = function(){
    var before = this.isActive;
    if (this.isActive)
        this.currentActiveTime -= 1;
    if (this.currentActiveTime <= 0){
        this.currentActiveTime = 0;
        this.isActive = false;
        if (before)
            this.onDeactivate.dispatch();
    }
};

Luts.Skill.prototype.setActive = function(active,duration){
    this.activatable = true;
    var before = this.isActive;
    this.isActive = active;
    if (active) {
        this.currentActiveTime = duration;
        if (!before)
            this.onActivate.dispatch();
    }else {
        if (before)
            this.onDeactivate.dispatch();
    }
};

Luts.Skill.prototype.constructor = Luts.Skill;
Luts.Lock = function(name,def){
    this.name = name;
    this.unlocked = Luts.Store.getItem('lock_' + name,def);
    Luts.Lock.locks.push(this);
    this.onUnlocked = new Phaser.Signal();
    this.onLocked = new Phaser.Signal();
};

Luts.Lock.locks = [];

Luts.Lock.prototype.constructor = Luts.Lock;

Luts.Lock.saveAll = function(){
    Luts.Lock.locks.forEach(function(t){
        t.save();
    });
};

Luts.Lock.getByName = function(name){
    for(var i = 0; i  <Luts.Lock.locks.length; i++){
        if ( Luts.Lock.locks[i].name == name)
            return Luts.Lock.locks[i];
    }
    return null;
};

Luts.Lock.get = function(Lock){
    if (typeof (Lock) == 'string') {
        var lock = Luts.Lock.getByName(Lock);
        if (lock)
            return lock;
        else
            return new Luts.Lock(Lock,false);
    }else
        return Lock;
};

Luts.Lock.unlock = function(name){
    var lock = Luts.Lock.get(name);
    if (lock)
        lock.unlock();
};

Luts.Lock.lock = function(name){
    var lock = Luts.Lock.get(name);
    if (lock)
        lock.lock();
};

Luts.Lock.prototype.save = function(){
    Luts.Store.setItem('lock_' + this.name,this.unlocked);
};

Luts.Lock.prototype.lock = function () {
    var old = this.unlocked;
    this.unlocked = false;
    if (old != this.unlocked) {
        this.save();
        this.onLocked.dispatch();
    }
};

Luts.Lock.prototype.unlock = function () {
    var old = this.unlocked;
    this.unlocked = true;
    if (old != this.unlocked) {
        this.save();
        this.onUnlocked.dispatch(this);
    }
};

Luts.Sound = {
    load: true,
    enabledIfInactive: true,
    currentAmbient: [],
    currentAmbientName: "",
    sounds: []
};

Luts.Sound.init = function(state){
    Luts.Sound.enabled = new Luts.Setting('soundEnabled',true,'Enable sound:');
    this.state = state;
    this.game = state.game;

    var key = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
    key.onDown.add(Luts.Sound.enabled.toggle,Luts.Sound.enabled);

    Luts.Events.onAsyncUpdate.add(function () {
        this.game.sound.mute = !Luts.Sound.enabled.value;
        Luts.Sound.playAmbient();
    }.bind(this));
};

Luts.Sound.play = function (name) {
    if (this.enabled.value && (Luts.isActive || this.enabledIfInactive) && this.load) {
        if (this.sounds[name])
            this.sounds[name].play();
        else
            this.sounds[name] = this.game.sound.play(name);
    }
};

Luts.Sound.playRandom = function(names){
    this.play(this.game.rnd.pick(names));
};



Luts.Sound.playAmbient = function(){
    this.currentAmbient.forEach(function (value) { value.update() });
};

Luts.Sound.setAmbient = function (name) {
    if (this.currentAmbientName != name) {
        this.currentAmbientName = name;
        this.currentAmbient.forEach(function (value) {
            if(Luts.Sound.sounds[value.name])
                Luts.Sound.sounds[value.name].stop()
        });
        this.currentAmbient = [];
        var amb = this.getAmbient(name);
        if (amb) {
            amb["sounds"].forEach(function (s) {
                this.currentAmbient.push(new Luts.Sound.IntervalSound(s["name"], s["interval_min"], s["interval_max"], s["start"]));
            }.bind(this))
        }
    }
};

Luts.Sound.getAmbient = function(name){
    for(var i = 0; i < Luts.Config["ambient"].length; i++){
        if (Luts.Config["ambient"][i].name == name)
            return Luts.Config["ambient"][i];
    }
    return null;
};

Luts.Sound.IntervalSound = function (name,intervalmin,intervalmax,start) {
    this.name = name;
    this.intervalMin = intervalmin;
    this.intervalMax = intervalmax;
    this.counter = 0;
    this.setInterval();

    if(start)
        Luts.Sound.play(this.name);
};

Luts.Sound.IntervalSound.prototype.setInterval = function(){
    this.currentInterval = Luts.Sound.game.rnd.between(this.intervalMin,this.intervalMax);
};

Luts.Sound.IntervalSound.prototype.update = function(){
    this.counter++;
    if (this.counter >= this.currentInterval * 10){
        if (!Luts.Sound.sounds[this.name] || !Luts.Sound.sounds[this.name].isPlaying)
            Luts.Sound.play(this.name);
        this.counter = 0;
        this.setInterval();
    }
};


Luts.Sound.IntervalSound.prototype.constructor = Luts.Sound.IntervalSound;
Luts.Settings = [];

Luts.Setting = function (name,defaultValue,description,longDescription) {
    this.name = name;
    this.value = Luts.Store.getItem('setting_' + name, defaultValue);
    this.description = description;
    this.longDescription = longDescription;

    this.onChanged = new Phaser.Signal();

    Luts.Settings.push(this);
};

Luts.Setting.prototype.constructor = Luts.Setting;

Luts.Setting.prototype.set = function (value) {
    this.value = value;
    this.save();
    this.onChanged.dispatch(this);
};

Luts.Setting.prototype.toggle = function () {
    this.set(!this.value);
};



Luts.Setting.prototype.save = function () {
    Luts.Store.setItem('setting_' + this.name,this.value);
};
Luts.Object.Text = function(state, x, y,font,text,size,color){
    if (color == null)
        color =  "#ffffff";

    this.rawText = text;
    this.baseColor = color;
    this.size = size;
    this.fnt = font;

    if (text.e)
        text = Luts.Format.BigNumber(text);
    text = this.handleTags();

    Phaser.Text.call(this, state.game, x, y, text,{font:size +"px " + font, fill:color});
    state.game.add.existing(this);
    this.game = state.game;
    this.state = state;

    if (!this.game.device.desktop)
        this.fontWeight = 'bold';

    this.smoothed = true;
    this.wordWrapWidth = 1000;
    this.wordWrap = true;
    this.strokeThickness = (size / 10);
    this.resolution = 1;

    this.applyColors();

    Luts.Events.onAfterResize.add(function (scale) {
        var p = this.parent;
        var scl = 1;
        while(p && p.scale){
            scl *= p.scale.x;
            p = p.parent;
        }
        //this.resolution = scl / this.state.world.scale.x * Luts.res;
        this.fontSize = this.size * scl;
        Math.round(this.fontSize);
        this.scale.set(1/(this.fontSize/this.size));
    },this);
};

Luts.Object.Text.prototype.constructor = Luts.Object.Text;
Luts.Object.Text.prototype = Object.create(Phaser.Text.prototype);

Luts.Object.Text.prototype.update = function () {

};

Luts.Object.Text.prototype.setText = function(text) {
    if (text.e)
        text = Luts.Format.BigNumber(text);

    this.rawText = text;
    this.text = this.handleTags();
    this.applyColors();
};

Luts.Object.Text.prototype.applyColors = function(){
    this.clearColors();
    for(var i = 0; i < this.colors2.length; i++){
        var color = this.colors2[i];
        this.addColor(color.color, color.start);
        this.addColor(this.baseColor, color.end);
    }
};

Luts.Object.Text.prototype.handleTags = function () {
    this.colors2 = [];
    var text = this.rawText;
    var result = {remaining: text, changed: false};
    do {
        result = this.handleSingleTag(result.remaining);
    } while(result.changed);
    return result.remaining;
};

Luts.Object.Text.prototype.handleSingleTag = function (text) {
    var result = {remaining: text, changed: false};
    if (typeof text != 'string')
        return result;

    var start = text.indexOf('<');
    var end = text.indexOf('>');
    if (start != -1 && end != -1){
        var sub = text.substring(start,end);
        var tagIndex = sub.indexOf('c');
        var tag = sub.substr(tagIndex, 1);
        var equalIndex = sub.indexOf('=');

        if (equalIndex != -1) {
            this.colors2.push({
                color: sub.substring(equalIndex + 1, end),
                start: start
            });
        }else{
            this.colors2[this.colors2.length-1].end = start;
        }

        result.remaining = text.substring(0,start) + text.substring(end + 1);
        result.changed = true;
    }
    return result;
};
Luts.Object.Tab = function(state, x, y,name){
    Phaser.Image.call(this, state.game, x, y);
    state.game.add.existing(this);
    this.game = state.game;
    this.state = state;
    this.name = name;
};

Luts.Object.Tab.prototype.constructor = Luts.Object.Tab;
Luts.Object.Tab.prototype = Object.create(Phaser.Image.prototype);

Luts.Object.Tab.prototype.update = function () {
    this.children.forEach(function(child){
        child.update();
    }.bind(this));
};

Luts.Object.Tab.prototype.showExclamation = function(){
    if (!this.visible) {
        this.exclamation.alpha = 1;
        this.exclamation.scale.set(1);
        this.game.add.tween(this.exclamation).from({alpha: 0}, 500, Phaser.Easing.Linear.None, true);
        this.game.add.tween(this.exclamation.scale).from({x: 5, y: 5}, 3000, Phaser.Easing.Elastic.Out, true);
    }
};
Luts.Object.TabManager = function(state, x, y){
    this.game = state.game;
    this.state = state;
    this.x = x;
    this.y = y;

    this.tabs = [];
    this.tabButtons = [];
};

Luts.Object.TabManager.prototype.constructor = Luts.Object.TabManager;

Luts.Object.TabManager.prototype.add = function(name){
    var tab = new Luts.Object.Tab(this.state,this.x,this.y,name);
    this.tabs.push(tab);
    return tab;
};

Luts.Object.TabManager.prototype.show = function(name){
    this.tabs.forEach(function(tab){
        tab.visible = false;
    }.bind(this));
    this.tabButtons.forEach(function(tabButton){
        tabButton.setActive(true);
    }.bind(this));


    var activeTab = this.get(name);
    activeTab.visible = true;
    if (activeTab.tabButton)
        activeTab.tabButton.setActive(false);
    if (activeTab.exclamation)
        activeTab.exclamation.alpha = 0;
};

Luts.Object.TabManager.prototype.get = function(name){
    if (typeof name != 'string')
        return name;
    for(var i = 0; i < this.tabs.length; i++){
        var tab = this.tabs[i];
        if (tab.name == name)
            return tab;
    }
    return null;
};

Luts.Object.TabManager.prototype.createTabButtons = function(x,y,width,height){
    this.tabButtons = [];
    var w = width / this.tabs.length;
    for(var i = 0; i< this.tabs.length; i++){
        var tab = this.tabs[i];
        var button = new Luts.Object.Button(this.state,x + i * w,y + height / 2,tab.name,'');
        button.setFrames('buttonMiddleActive','buttonMiddleInactive');
        button.setFontSize(18);
        button.fixedToCamera = true;

        this.setTabButton(tab,button);
    }
};

Luts.Object.TabManager.prototype.setTabButton = function(tab,button){
    button.callback = function(button){this.show(button.tab);}.bind(this);

    tab = this.get(tab);
/*
    tab.exclamation = this.game.add.image(button.width * 0.85, 10,'ui','exclamation');
    tab.exclamation.anchor.set(0.5);
    tab.exclamation.alpha = 0;
    button.addChild(tab.exclamation);
*/
    this.tabButtons.push(button);
    button.tab = tab;
    tab.tabButton = button;
};

Luts.Object.Scrollable = function(state, x, y, width, height){
    Phaser.Image.call(this, state.game, x, y);
    state.game.add.existing(this);
    this.game = state.game;
    this.state = state;

    this.w = width;
    this.h = height;

    this.scrollGroup = this.game.add.group();
    this.addChild(this.scrollGroup);

    this.scrollMask = this.game.add.graphics();
    this.addChild(this.scrollMask);
    this.scrollMask.beginFill(0x000000);
    this.scrollMask.drawRect(0,0,width,height);
    this.scrollMask.endFill();
    this.scrollGroup.mask = this.scrollMask;

    this.createScrollbar(width - 6,6);

    Luts.Events.onMouseWheel.add(function(){
        this.scroll(this.game.input.mouse.wheelDelta * this.mouseWheelSpeed);
    },this);

    this.mouseWheelSpeed = 170;

    this.inputEnabled = true;
    this.events.onInputDown.add(function(a,pointer){
        this.lastY = this.game.input.y;
        this.lastGroupY = this.scrollGroup.y;
        this.dragging = true;
    },this);
    this.game.input.onUp.add(function(){
        this.dragging = false;
    },this);
};

Luts.Object.Scrollable.prototype.constructor = Luts.Object.Scrollable;
Luts.Object.Scrollable.prototype = Object.create(Phaser.Image.prototype);

Luts.Object.Scrollable.prototype.update = function () {
    this.children.forEach(function(child){
        child.update();
    }.bind(this));

    if(this.scrollGroup.worldVisible) {
        if (this.dragging) {
            this.previousY = this.scrollGroup.y;
            this.scrollGroup.y = this.lastGroupY + (this.game.input.y - this.lastY);
            this.speed = this.scrollGroup.y - this.previousY;
        } else {
            if (this.speed) {
                this.scrollGroup.y += this.speed;
                this.speed *= 0.9;
            }
        }

        if(!this.dragging)
            this.scrollGroup.y = this.smoothClamp(this.scrollGroup.y, 0, this.h - this.getBottom());

        this.scrollBar.scale.y = this.h / this.getTotalHeight();
        this.normalizedY = this.scrollGroup.y / (this.h - this.getTotalHeight());
        this.scrollBar.maxY = this.h - this.scrollBar.height;
        this.scrollBar.y = this.normalizedY * this.scrollBar.maxY;

        if (this.scrollBar.scale.y >= 1)
            this.scrollGroup.y = 0;
    }
};

Luts.Object.Scrollable.prototype.scroll = function(delta){
    if(this.scrollGroup.worldVisible) {
        this.scrollGroup.y += delta;
        //this.speed = delta;
    }
};

Luts.Object.Scrollable.prototype.addToScrollGroup = function(child){
    this.scrollGroup.add(child);
};

Luts.Object.Scrollable.prototype.smoothClamp = function(value,min,max,speed){
    speed = speed || 0.3;

    if (value < max){
        value += (max - value) * speed;
    }
    if (value > min){
        value += (min - value) * speed;
    }
    return value;
};

Luts.Object.Scrollable.prototype.getBottom = function(){
    var max = 0;
    this.scrollGroup.children.forEach(function(t){
        if (t.bottom > max && t.visible)
            max = t.bottom;
    }.bind(this));
    return max + 140;
};

Luts.Object.Scrollable.prototype.getTop = function(){
    var max = 0;
    this.scrollGroup.children.forEach(function(t){
        if (t.top < max && t.visible)
            max = t.top;
    }.bind(this));
    return max;
};

Luts.Object.Scrollable.prototype.getTotalHeight = function(){
    return this.getBottom() - this.getTop();
};



Luts.Object.Scrollable.prototype.createScrollbar = function(x,width){
    this.scrollBarBack = this.game.add.graphics(x,0);
    this.addChild(this.scrollBarBack);
    this.scrollBarBack.beginFill(0x000000,0.1);
    this.scrollBarBack.drawRect(0,0,width,this.h);
    this.scrollBarBack.endFill();

    this.scrollBarMask = this.game.add.graphics(x,0);
    this.addChild(this.scrollBarMask);
    this.scrollBarMask.beginFill(0x000000);
    this.scrollBarMask.drawRect(0,0,width,this.h);
    this.scrollBarMask.endFill();

    this.scrollBar = this.game.add.graphics(x,0);
    this.addChild(this.scrollBar);
    this.scrollBar.beginFill(0x000000,0.5);
    this.scrollBar.drawRect(0,0,width,this.h);
    this.scrollBar.endFill();

    this.scrollBar.mask = this.scrollBarMask;

    this.scrollBar.minY = 0;
    this.scrollBar.maxY = this.h - this.scrollBar.height;
};
Luts.Object.Button = function(state, x, y,title,subtitle,callback){
    Phaser.Image.call(this, state.game, x, y, "ui",'buttonMiddle_active');
    state.game.add.existing(this);
    this.game = state.game;
    this.state = state;
    this.callback = callback;

    this.activeFrame = 'buttonMiddle_active';
    this.inactiveFrame = 'buttonMiddle_inactive';

    this.anchor.set(0.5);

    this.active = true;
    this.lock = null;
    this.onChanged = new Phaser.Signal();

    this.baseScale = 1;

    this.icon = this.game.add.image(0,0);
    this.icon.anchor.set(0.5);
    this.addChild(this.icon);

    this.text = new Luts.Object.Text(this.state,0,-10,'text',title,Luts.Object.Button.FONT_SIZE_TITLE,'#000000');
    this.text.anchor.set(0.5);
    this.text.strokeThickness = 0;
    this.addChild(this.text);

    if (subtitle == '')
        this.text.y = -5;

    this.subtitle = new Luts.Object.Text(this.state,0,Luts.Object.Button.FONT_SIZE_SUBTITLE - 8,'regular',subtitle,Luts.Object.Button.FONT_SIZE_SUBTITLE,'#000000');
    this.subtitle.anchor.set(0.5);
    this.subtitle.strokeThickness = 0;
    this.addChild(this.subtitle);


    this.lockIcon = this.game.add.image(0,0,'ui','lock');
    this.lockIcon.anchor.set(0.5);
    this.lockIcon.visible = false;
    this.addChild(this.lockIcon);

    this.inputEnabled = true;
    this.mouseIsOver = false;

    this.downCounter = 0;
    this.downCounterMax = 15;

    this.downIntervalMax = 15;
    this.downInterval = 15;
    this.downIntervalCounter = 0;

    this.pulseTween = null;

    this.events.onInputDown.add(function (){this.click(true)},this);
    this.events.onInputUp.add(function () {
        this.isDown = false;
    },this);
    this.events.onInputOver.add(function(){
        this.mouseIsOver = true;
        if(this.active && this.isUnlocked()) {
            if (this.pulseTween)
                this.pulseTween.stop();
            this.scale.set(1 * this.baseScale);
            this.game.add.tween(this.scale).to({x: 1.05 * this.baseScale, y: 1.05 * this.baseScale}, 500, Phaser.Easing.Elastic.Out, true);
        }
    },this);
    this.events.onInputOut.add(function(){
        this.mouseIsOver = false;
        if(this.scale.x > (1 * this.baseScale)) {
            if (this.pulseTween)
                this.pulseTween.stop();
            this.scale.set(1 * this.baseScale);
            this.game.add.tween(this.scale).from({x: 1.05 * this.baseScale, y: 1.05 * this.baseScale}, 500, Phaser.Easing.Elastic.Out, true);
        }
    },this);

    Luts.Events.onUpdate.add(this.updateDown,this);
};

Luts.Object.Button.FONT_SIZE_TITLE = 20;
Luts.Object.Button.FONT_SIZE_SUBTITLE = 16;


Luts.Object.Button.prototype.constructor = Luts.Object.Button;
Luts.Object.Button.prototype = Object.create(Phaser.Image.prototype);

Luts.Object.Button.prototype.updateDown = function () {
    if (this.isDown && this.active){
        this.downCounter += 1;
        if (this.downCounter > this.downCounterMax){
            this.downIntervalCounter += 1;
            if (this.downIntervalCounter > this.downInterval){
                this.downIntervalCounter = 0;
                this.downInterval -= 0.2;
                this.callback(this);
            }
        }
    }
};

Luts.Object.Button.prototype.click = function(byUser,ignoreVisible) {
    if (byUser) {
        this.isDown = true;
        this.downCounter = 0;
        this.downInterval = this.downIntervalMax;
        Luts.Sound.play("button");
    }

    if(this.active && (this.worldVisible || ignoreVisible) && this.isUnlocked()) {
        if (this.pulseTween)
            this.pulseTween.stop();

        var scl = 1;
        if (this.mouseIsOver)
            scl = 1.05;
        this.scale.set(scl * this.baseScale);
        this.game.add.tween(this.scale).from({x: 0.9 * this.baseScale, y: 0.9 * this.baseScale}, 500, Phaser.Easing.Back.Out, true);
        this.callback(this);
    }
};

Luts.Object.Button.prototype.setActive = function(active,animate){
    if (!this.isUnlocked()){
        this.showLock(true);
        if (this.pulseTween)
            this.pulseTween.stop();
        return;
    }
    this.showLock(false);

    var before = this.active;
    if (before != active){
        this.onChanged.dispatch();
    }

    if (active) {
        this.frameName = this.activeFrame;
        this.icon.alpha = 1;
        this.text.alpha = 1;
        this.subtitle.alpha = 1;
        this.active = true;
    } else {
        if (this.pulseTween)
            this.pulseTween.stop();
        this.scale.set(1 * this.baseScale);
        this.frameName = this.inactiveFrame;
        this.icon.alpha = 0.4;
        this.text.alpha = 0.6;
        this.subtitle.alpha = 0.6;
        this.active = false;
    }

    if (!before && active && animate) {
        this.angle = 0;
        this.game.add.tween(this).to({angle: this.game.rnd.between(-10,10)}, 125, Phaser.Easing.Sinusoidal.InOut, true, 0, 2, true);
        if (this.pulseTween)
            this.pulseTween.stop();
        this.pulseTween = this.game.add.tween(this.scale).to({x: 0.9 * this.baseScale, y: 0.9 * this.baseScale}, 250, Phaser.Easing.Sinusoidal.InOut,true,0,1000,true);
    }
};

Luts.Object.Button.prototype.setFrames = function(activeFrame,inactiveFrame){
    this.activeFrame = activeFrame;
    this.inactiveFrame = inactiveFrame;
    this.setActive(this.active);
};

Luts.Object.Button.prototype.setFontSize = function(title,subtitle){
    this.text.fontSize = title;

    if (subtitle) {
        this.subtitle.fontSize = subtitle;
        this.subtitle.y = subtitle - 3;
    }
};

Luts.Object.Button.prototype.isUnlocked = function(){
    if (this.lock == null)
        return true;
    else{
        return this.lock.unlocked;
    }
};

Luts.Object.Button.prototype.showLock = function(show){
    //this.lockIcon.bringToTop();
    this.lockIcon.visible = show;

    if (this.lock) {
        if (show) {
            this.frameName = this.inactiveFrame;
            this.icon.alpha = 0.2;
            this.text.alpha = 0;
            this.subtitle.alpha = 0;
        }
    }
};

Luts.Object.Button.prototype.setLock = function(name){
    this.lock = Luts.Lock.get(name);
    if (this.lock) {
        this.setActive(this.active);

        this.lock.onUnlocked.add(function () {
            this.active = false;
            this.setActive(true, true);
        }, this);
        this.lock.onLocked.add(function () {
            this.active = true;
            this.setActive(false, true);
        }, this);
    }
};
Luts.Object.Bar = function(state, x, y,background,foreground){
    Phaser.Image.call(this, state.game, x, y, "ui",background);
    state.game.add.existing(this);
    this.game = state.game;
    this.state = state;

    this.bar = this.game.add.image(0,0,"ui",foreground);
    this.bar.crop(new Phaser.Rectangle(0,0,this.width,this.height));
    this.bar.w = 0;
    this.addChild(this.bar);

    this.effectBar = this.game.add.image(this.bar.width / 2,this.bar.height / 2,"ui",foreground);
    this.effectBar.alpha = 0;
    this.effectBar.anchor.set(0.5);
    this.addChild(this.effectBar);

    this.effectPlaying = false;

    this.barText = new Luts.Object.Text(this.state,this.width / 2, this.height / 2 - 5, 'regular', "100%",16);
    this.barText.anchor.set(0.5);
    this.addChild(this.barText);

    this.dirty = true;
};

Luts.Object.Bar.prototype.constructor = Luts.Object.Bar;
Luts.Object.Bar.prototype = Object.create(Phaser.Image.prototype);

Luts.Object.Bar.prototype.update = function () {
    if (this.dirty) {
        this.dirty = false;
        this.bar.cropRect.width = this.bar.w * this.width;
        this.bar.updateCrop();
    }
};

Luts.Object.Bar.prototype.stepTo = function(number,speed){
    number = parseFloat(number.toString());
    number = Phaser.Math.clamp(number,0,1);
    this.bar.w += (number - this.bar.w) * (speed || 0.1);
    this.dirty = true;
};

Luts.Object.Bar.prototype.setTo = function(number){
    number = Phaser.Math.clamp(number,0,1);
    this.bar.w = number;
    this.dirty = true;
};

Luts.Object.Bar.prototype.playCompletedEffect = function(){
    if (!this.effectPlaying && Luts.isActive) {
        this.effectPlaying = true;
        this.effectBar.alpha = 0;
        this.effectBar.scale.set(1.1);

        this.game.add.tween(this.effectBar).from({alpha: 0.5}, 500, Phaser.Easing.Linear.None, true);
        var tw = this.game.add.tween(this.effectBar.scale).from({x: 1, y: 1}, 500, Phaser.Easing.Linear.None, true);
        tw.onComplete.add(function () {
            this.effectPlaying = false;
        },this);
    }
};
Luts.Object.Popup = function(state,text,choice,callback){
    Phaser.Image.call(this, state.game, Luts.GAME_WIDTH / 2, Luts.GAME_HEIGHT / 2, "ui",'label');
    state.game.add.existing(this);
    this.game = state.game;
    this.state = state;
    this.anchor.set(0.5);
    this.state.setResponsive(this);

    this.dead = false;

    this.blackPlane = this.game.add.graphics();
    this.blackPlane.beginFill(0x000000,0.5);
    this.blackPlane.drawRect(0,0,Luts.GAME_WIDTH,Luts.GAME_HEIGHT);
    this.blackPlane.endFill();
    this.blackPlane.inputEnabled = true;
    this.state.setResponsive(this.blackPlane,{scaleWithGame: true});

    this.parent.swapChildren(this,this.blackPlane);

    this.text = new Luts.Object.Text(this.state,0,-50,'text',text,16,'#000000');
    this.text.anchor.set(0.5);
    this.text.strokeThickness = 0;
    this.text.wordWrapWidth = this.rWidth * 0.8;
    this.addChild(this.text);

    this.yesButton = new Luts.Object.Button(state,0,70,'Ok','',function() {
        if (!this.dead) {
            if (callback)
                callback(true);
            this.die();
        }
    }.bind(this));
    this.addChild(this.yesButton);

    if(choice){
        this.yesButton.x = -70;
        this.noButton = new Luts.Object.Button(state,70,70,'No','',function(){
            if (!this.dead) {
                if (callback)
                    callback(false);
                this.die();
            }
        }.bind(this));
        this.addChild(this.noButton);
    }

    this.tw1 = this.game.add.tween(this.scale).from({x: 0},1000,Phaser.Easing.Elastic.Out,true);
    this.tw2 = this.game.add.tween(this.scale).from({y: 0},1000,Phaser.Easing.Elastic.Out,true);
    this.tw3 = this.game.add.tween(this.blackPlane).from({alpha: 0},250,Phaser.Easing.Linear.None,true);
};

Luts.Object.Popup.prototype.constructor = Luts.Object.Popup;
Luts.Object.Popup.prototype = Object.create(Phaser.Sprite.prototype);

Luts.Object.Popup.prototype.update = function () {

};

Luts.Object.Popup.prototype.die = function(){
    this.tw1.stop();
    this.tw2.stop();
    this.tw3.stop();

    this.dead = true;
    this.game.add.tween(this.scale).to({x: 0, y: 0},250,Phaser.Easing.Back.In,true);
    var tw = this.game.add.tween(this.blackPlane).to({alpha: 0},500,Phaser.Easing.Linear.None,true);
    tw.onComplete.add(function(){
        this.blackPlane.destroy();
        this.destroy();
    },this);
};
Luts.Object.FloatingText = function(state, x, y,text,color){
    Phaser.Image.call(this, state.game, x, y);
    state.game.add.existing(this);
    this.game = state.game;
    this.state = state;
    this.anchor.set(0.5);

    this.text = new Luts.Object.Text(state,0,0,'text',text,60,color);
    this.text.anchor.set(0.5);
    this.addChild(this.text);

    var duration = 1000;

    var tw = this.game.add.tween(this).to({alpha: 0},duration,Phaser.Easing.Sinusoidal.Out,true);
    tw.onComplete.add(function(){
        this.destroy();
    },this);

    this.game.add.tween(this).to({y: this.y - this.game.rnd.between(15,30)},duration / 2,Phaser.Easing.Sinusoidal.InOut,true,0,2,true);
    this.game.add.tween(this).to({x: this.x - this.game.rnd.between(-30,30)},duration,Phaser.Easing.Sinusoidal.InOut,true,0);
};

Luts.Object.FloatingText.prototype.constructor = Luts.Object.FloatingText;
Luts.Object.FloatingText.prototype = Object.create(Phaser.Image.prototype);

Luts.Object.FloatingText.prototype.update = function () {
};
Luts.Object.Tooltip = function(state, object,text){
    Phaser.Graphics.call(this, state.game, object.x,object.y);
    state.game.add.existing(this);
    this.game = state.game;
    this.state = state;

    this.object = object;
    this.object.inputEnabled = true;

    this.fixedToCamera = true;

    this.textFunction = null;
    this.textString = text;
    if (typeof text == 'function'){
        this.textFunction = text;
        this.textString = this.getText();
    }

    this.text = new Luts.Object.Text(this.state,0,0,'text',this.textString,20);
    this.text.wordWrapWidth = 200;
    this.addChild(this.text);

    this.beginFill(0x000000);
    this.drawRect(-5,-5, this.text.width + 10, this.text.height + 10);
    this.endFill();

    this.alpha = 0;

    this.isOver = false;

    this.counter = 0;
    this.maxCounter = 600;

    object.events.onInputOver.add(function(){
        if (!(this.object.lock && !this.object.lock.unlocked)) {
            this.isOver = true;
            this.setPosition();

            this.clear();
            this.beginFill(0x000000);
            this.drawRect(-5,-5, this.text.width + 10, this.text.height + 10);
            this.endFill();
        }
    },this);
    object.events.onInputOut.add(function(){
        this.isOver = false;
    },this);

};

Luts.Object.Tooltip.prototype.constructor = Luts.Object.Tooltip;
Luts.Object.Tooltip.prototype = Object.create(Phaser.Graphics.prototype);

Luts.Object.Tooltip.prototype.update = function () {
    if (this.isOver) {
        if (!this.object.getBounds().contains(this.game.input.x,this.game.input.y))
            this.isOver = false;

        if (this.counter++ >= this.maxCounter){
            this.isOver = false;
            this.counter = 0;
        }

        this.text.setText(this.getText());
        this.alpha += (1 - this.alpha) * 0.04;
    }else
        this.alpha += (0 - this.alpha) * 0.2;


    if (this.alpha > 0)
        this.setPosition();
};

Luts.Object.Tooltip.prototype.setPosition = function(){
    var x = this.game.input.x + 20;
    var y = this.game.input.y;

    y = Phaser.Math.clamp(y, 0, this.game.height - this.text.height);

    if (x + this.text.width > this.game.width)
        x -= this.text.width + 30;


    this.cameraOffset.set(x,y);
};

Luts.Object.Tooltip.prototype.getText = function () {
    if (this.textFunction != null)
        return this.textFunction();
    else
        return this.textString;
};
Luts.Object.Window = function(state,title){
    Phaser.Image.call(this, state.game, 150,50, "ui",'labelBig');
    state.game.add.existing(this);
    this.game = state.game;
    this.state = state;
    this.state.groupUI.add(this);

    this.inputEnabled = true;
    this.state.setResponsive(this);
    this.toggleTween = null;
    this.shown = false;
    this.visible = false;

    this.title = new Luts.Object.Text(state,this.rWidth / 2, 40,'text',title,50);
    this.title.anchor.set(0.5);
    this.addChild(this.title);

    this.closeButton = new Luts.Object.Button(state,580,50,'','',this.toggle.bind(this));
    this.closeButton.setFrames('closeButton','closeButton');
    this.addChild(this.closeButton);

    this.init();
};

Luts.Object.Window.prototype.constructor = Luts.Object.Window;
Luts.Object.Window.prototype = Object.create(Phaser.Image.prototype);

Luts.Object.Window.prototype.init = function () {

};

Luts.Object.Window.prototype.toggle = function(){
    this.shown = !this.shown;
    if (this.toggleTween)
        this.toggleTween.stop();

    if (this.shown){
        this.bringToTop();
        this.scale.set(1 * this.state.lastScale);
        this.visible = true;
        this.toggleTween = this.game.add.tween(this.scale).from({x: 0, y: 0},250,Phaser.Easing.Back.Out,true);
    }else{
        this.scale.set(0);
        this.toggleTween = this.game.add.tween(this.scale).from({x: this.state.lastScale, y: this.state.lastScale},250,Phaser.Easing.Back.In,true);
        this.toggleTween.onComplete.add(function () {
            this.visible = false;
        },this);
    }
};
Luts.Object.BuyAmountButtons = function (state,x,y,buyAmounts,max) {
    Phaser.Image.call(this, state.game, x, y);
    this.state = state;
    state.game.add.existing(this);
    this.buyAmountButtons = [];

    var i = 0;
    buyAmounts.forEach(function (b) {
        this.addBuyAmountButton((i++) * 45, b);
    }.bind(this));

    if (max){
        this.addBuyAmountButton(i * 45, -1);
    }

    this.setBuyAmount(Luts.Upgrades.buyAmount);

    this.title = new Luts.Object.Text(this.state, -20, -35,'text','Buy: ',12,'#000000');
    this.title.strokeThickness = 0;
    this.addChild(this.title);
};

Luts.Object.BuyAmountButtons.prototype.constructor = Luts.Object.BuyAmountButtons;
Luts.Object.BuyAmountButtons.prototype = Object.create(Phaser.Image.prototype);


Luts.Object.BuyAmountButtons.prototype.addBuyAmountButton = function(x,amount){
    var text = amount;
    if (amount == -1)
        text = "max";

    var btn = new Luts.Object.Button(this.state,x,0,text,'',function (b) {
        this.setBuyAmount(b.amount);
    }.bind(this));
    btn.amount = amount;
    btn.baseScale = 0.7;
    btn.scale.set(0.7);
    btn.setFrames('buttonSmall_active','buttonSmall_inactive');
    this.buyAmountButtons.push(btn);

    this.addChild(btn);
};

Luts.Object.BuyAmountButtons.prototype.setBuyAmount = function(amount){
    this.buyAmountButtons.forEach(function (value) {
        value.setActive(value.amount != amount);
    });
    Luts.Upgrades.setBuyAmount(amount);
};
Luts.Object.CreditsWindow = function(state){
    Luts.Object.Window.call(this, state,'Credits');

    this.scroll = new Luts.Object.Scrollable(state,10,70,this.rWidth - 30,this.rHeight - 90);
    this.addChild(this.scroll);

    this.scrollIndex = 0;
    this.texts = [];

    this.getCreditsType('general').forEach(function (value) {
        this.addCredit("Game made by",value.author);
    }.bind(this));
    this.scrollIndex++;

    var soundTitle = new Luts.Object.Text(this.state, 10, this.scrollIndex * 40, 'text','Sounds used:',20,'#000000');
    soundTitle.strokeThickness = 0;
    this.scroll.addToScrollGroup(soundTitle);
    this.scrollIndex++;

    this.getCreditsType('sound').forEach(function (value) {
        this.addCredit(value.name,value.author, value.url);
    }.bind(this));
};

Luts.Object.CreditsWindow.prototype.constructor = Luts.Object.CreditsWindow;
Luts.Object.CreditsWindow.prototype = Object.create(Luts.Object.Window.prototype);

Luts.Object.CreditsWindow.prototype.update = function () {
    if (!this.shown)
        return;

    this.scroll.update();
};

Luts.Object.CreditsWindow.prototype.getCreditsType = function(type){
    var ret = [];
    for(var i = 0; i < Luts.Credits.length; i++){
        if (Luts.Credits[i].type == type)
            ret.push(Luts.Credits[i]);
    }
    return ret;
};

Luts.Object.CreditsWindow.prototype.addCredit = function(title,text,url){
    var titleText = new Luts.Object.Text(this.state,10,this.scrollIndex * 40,'text',title,20,'#000000');
    var textText = new Luts.Object.Text(this.state,550,this.scrollIndex * 40,'regular',text,20,'#000000');
    textText.anchor.set(1,0);
    if (url) {
        var urlText = new Luts.Object.Text(this.state, 550, this.scrollIndex * 40 + 25, 'regular', url, 10,'#000000');
        urlText.strokeThickness = 0;
        urlText.anchor.set(1, 0);
        this.scroll.addToScrollGroup(urlText);
    }

    titleText.strokeThickness = 0;
    textText.strokeThickness = 0;

    this.scroll.addToScrollGroup(titleText);
    this.scroll.addToScrollGroup(textText);

    this.texts.push(textText);

    this.scrollIndex++;
    return textText;
};
Luts.Object.InfoWindow = function(state){
    Luts.Object.Window.call(this, state,'Statistics');

    this.scroll = new Luts.Object.Scrollable(state,10,70,this.rWidth - 30,this.rHeight - 90);
    this.addChild(this.scroll);

    this.scrollIndex = 0;
    this.texts = [];

    this.gameVersion = this.addStatistic('Game Version',Luts.version);

    this.addStatistic('FPS','',function () {
        return this.game.time.fps;
    }.bind(this));

    this.activePlaytime = this.addStatistic('Active Playtime','',function () {
        return Luts.Format.Time(Luts.Time.activePlaytime);
    });

    this.passivePlaytime = this.addStatistic('Passive Playtime','',function () {
        return Luts.Format.Time(Luts.Time.passivePlaytime);
    });

    Luts.Value.values.forEach(function (value) {
        if (value.displayName) {
            var t = this.addStatistic(value.displayName, '', function () {
                return Luts.Format.BigNumber(value.modValue());
            }.bind(this));

            new Luts.Object.Tooltip(this.state,t,function () {
                var ret = Luts.Format.BigNumber(value.v);
                for(var i = 0; i < value.multipliers.length; i++){
                    var m = value.multipliers[i];
                    ret += ' x ' + Luts.Format.BigNumber(m.value);
                }
                return ret;
            }.bind(this));
        }
    }.bind(this));
};

Luts.Object.InfoWindow.prototype.constructor = Luts.Object.InfoWindow;
Luts.Object.InfoWindow.prototype = Object.create(Luts.Object.Window.prototype);

Luts.Object.InfoWindow.prototype.update = function () {
    if (!this.shown)
        return;

    this.texts.forEach(function(t){
        if (t.assignFunction)
            var newText = t.assignFunction();
            if (newText != null)
                t.text = newText;
    });

    this.scroll.update();
};

Luts.Object.InfoWindow.prototype.addStatistic = function(title,text,assignFunction){
    var titleText = new Luts.Object.Text(this.state,10,this.scrollIndex * 20,'text',title,20,'#000000');
    var textText = new Luts.Object.Text(this.state,600,this.scrollIndex * 20,'regular',text,20,'#000000');
    titleText.strokeThickness = 0;
    textText.strokeThickness = 0;
    textText.anchor.set(1,0);

    this.scroll.addToScrollGroup(titleText);
    this.scroll.addToScrollGroup(textText);

    textText.assignFunction = assignFunction;
    this.texts.push(textText);

    this.scrollIndex++;
    return textText;
};
Luts.Object.SettingsWindow = function(state){
    Luts.Object.Window.call(this, state,'Settings');

    this.exportButton = new Luts.Object.Button(state,100,100,'Export','Save',Luts.Save.savePrompt);
    this.addChild(this.exportButton);

    this.importButton = new Luts.Object.Button(state,230,100,'Import','Save',Luts.Save.loadPrompt);
    this.addChild(this.importButton);

    this.hardResetButton = new Luts.Object.Button(state,360,100,'Hard Reset','',function(){
        Luts.gamePaused = true;
        new Luts.Object.Popup(this.state,"Are you sure? All of your progress will be lost forever.",true,function (yes) {
            if (yes){
                Luts.Store.savingEnabled = false;
                setTimeout(function () {
                    Luts.Storage.clear();
                    window.location.reload(false);
                },1000);
            }else{
                Luts.gamePaused = false;
            }
        }.bind(this));
    }.bind(this));
    this.addChild(this.hardResetButton);

    this.creditsButton = new Luts.Object.Button(state,490,380,'Credits','',function () {
        this.state.creditsClicked();
    }.bind(this));
    this.addChild(this.creditsButton);

    for(var i = 0; i < Luts.Settings.length; i++){
        var setting = Luts.Settings[i];
        this.createSettingEntry(setting,50,150 + i * 50)
    }
};

Luts.Object.SettingsWindow.prototype.constructor = Luts.Object.SettingsWindow;
Luts.Object.SettingsWindow.prototype = Object.create(Luts.Object.Window.prototype);

Luts.Object.SettingsWindow.prototype.update = function () {

};

Luts.Object.SettingsWindow.prototype.createSettingEntry = function(setting,x,y){
    var text = new Luts.Object.Text(this.state,x ,y ,'text',setting.description + ':',16,'#000000');
    text.strokeThickness = 0;
    this.addChild(text);

    var button = new Luts.Object.Button(this.state,x + 310,y + 10,'','',this.settingClicked);
    button.setting = setting;
    this.addChild(button);

    if (setting.longDescription) {
        new Luts.Object.Tooltip(this.state,text,setting.longDescription);
    }

    setting.onChanged.add(function (changedSetting) {
        if (changedSetting.value)
            this.setFrames('settings_enabled','settings_enabled');
        else
            this.setFrames('settings_disabled','settings_disabled');
    }.bind(button));
    setting.onChanged.dispatch(setting);
};

Luts.Object.SettingsWindow.prototype.settingClicked = function () {
    this.setting.toggle();
};

Luts.Object.SampleObject = function(state, x, y){
    Phaser.Image.call(this, state.game, x, y, "whiteSquare");
    state.game.add.existing(this);
    this.game = state.game;
    this.state = state;

};

Luts.Object.SampleObject.prototype.constructor = Luts.Object.SampleObject;
Luts.Object.SampleObject.prototype = Object.create(Phaser.Image.prototype);

Luts.Object.SampleObject.prototype.update = function () {

};
Luts.Object.AchievementsHandler = {
};

Luts.Object.AchievementsHandler.init = function(state){
    Luts.Achievements.init();

    Luts.Object.AchievementsHandler.state = state;

    Luts.Object.AchievementsHandler.add('totalMoney','Total Money','Reach a total of % money',1000,1000,1000,false,1000);
    Luts.Object.AchievementsHandler.add('gangLevel','Gang Level', 'Reach a gang level of %',1,'100000',1,true,1);

    Luts.Events.onAchievementUnlocked.add(function () {
        state.game.camera.flash(1,250);
    },this);


    Luts.Events.onUpgrade.add(function (u) {
        if(Luts.Achievements.getByName('total_' + u.name))
            Luts.Achievements.set('total_' + u.name,u.level,true);
    });
};

Luts.Object.AchievementsHandler.add = function(id,name,desc,goal,reward,increaseFactor,additive,rewardincrease){
    var ach = Luts.Achievements.add(id,name,desc,goal,increaseFactor,Luts.Object.AchievementsHandler.unlocked,reward,rewardincrease);
    if(additive)
        ach.goalIncreaseMethod = 1;
    return ach;
};

Luts.Object.AchievementsHandler.unlocked = function(achievement){
    Luts.Upgrades.currency[0] = Luts.Upgrades.currency[0].add(achievement.reward);
    Luts.Analytics.track('design','AchievementUnlocked:' + achievement.id + ':' + achievement.level,Math.floor(Luts.Time.passivePlaytime / 1000));
    if (Luts.DEBUG)
        console.log(achievement);
};
Luts.Object.HighscoreHandler = {

};

Luts.Object.HighscoreHandler.init = function (state) {
    Luts.Events.onAchievementUnlocked.add(function () {
        Luts.Highscore.submit('achievements',Luts.Achievements.achievedNum);
    });

    Luts.Object.HighscoreHandler.lastMoneyE = 0;
/*
    Luts.Events.onCurrencyChanged[0].add(function(){
        if (Luts.Upgrades.currency[0].e > Luts.Object.HighscoreHandler.lastMoneyE) {
            Luts.Object.HighscoreHandler.lastMoneyE = Luts.Upgrades.currency[0].e;
            Luts.Highscore.submit('money', Luts.Upgrades.currency[0].e);
        }
    });
    */
};
Luts.Object.SkillsHandler = {
};

Luts.Object.SkillsHandler.init = function(state){
    Luts.Object.SkillsHandler.state = state;
    this.game = state.game;

    Luts.Skills.skills.forEach(function (value) { value.onDeactivate.dispatch() });

    Luts.Skills.skills.forEach(function(skill){
        skill.checkCondition();
    });
};
Luts.Object.SoundHandler = {
};

Luts.Object.SoundHandler.init = function(state){
    this.state = state;
    this.game = state.game;
};
Luts.Object.Dice = function(diceContainer, x, y, type, price, value, priceIncrease, valueIncrease, initialLevel, ascentIncrease){
    state = diceContainer.state;
    Phaser.Image.call(this, state.game, x, y);
    state.game.add.existing(this);
    this.game = state.game;
    this.state = state;
    this.diceContainer = diceContainer;
    this.ascentIncrease = ascentIncrease;
    this.diceType = Luts.Config['diceTypes'][type];
    this.id = this.diceContainer.dices.length;

    this.min = 1;
    this.max = this.diceType;
    this.lastPoints = 0;
    this.lastScore = 0;
    this.multi = new Luts.Value(diceContainer.diceName + this.id + '_multi',1);

    this.upgrade = Luts.Upgrades.add(this.diceContainer.diceName + this.id + 'value', 'Dice ' + this.id, '', price, value, priceIncrease, valueIncrease, null, initialLevel || 0, null, 0);
    this.ascentNum = Luts.Store.getItem(this.diceContainer.diceName+this.id+'_ascNum',0);


    this.diceImage = this.game.add.image(0, 0, 'ingame');
    this.diceImage.anchor.set(0.5);
    this.addChild(this.diceImage);


    this.diceNumber = new Luts.Object.Text(this.state,0,0,'regular','1', 24);
    this.diceNumber.anchor.set(0.5);
    this.diceImage.addChild(this.diceNumber);

    this.levelText = new Luts.Object.Text(this.state, 0, 60, 'text', '', 16, '#000000');
    this.levelText.anchor.set(0.5);
    this.levelText.strokeThickness = 0;
    this.addChild(this.levelText);

    this.valueText = new Luts.Object.Text(this.state, 0, 80, 'text', '', 16, '#000000');
    this.valueText.anchor.set(0.5);
    this.valueText.strokeThickness = 0;
    this.addChild(this.valueText);

    this.pointsText = new Luts.Object.Text(this.state, 0, -60, 'regular', '', 24, '#ffffff');
    this.pointsText.anchor.set(0.5);
    this.addChild(this.pointsText);
    this.pointsText.alpha = 0;

    this.plusText = new Luts.Object.Text(this.state, -60, -60, 'regular', (this.id > 0) ? '+' : '', 32, '#000000');
    this.plusText.strokeThickness = 0;
    this.plusText.anchor.set(0.5);
    this.addChild(this.plusText);
    this.plusText.alpha = 0;




    this.upgradeButton = new Luts.Object.Button(this.state,0,120,'Upgrade','0',function (b) {
        Luts.Upgrades.upgradeMultiple(this.upgrade);
        this.multi.setMultiplier('upgrade',this.upgrade.value);
        this.updateText();
    }.bind(this));
    this.addChild(this.upgradeButton);

    this.ascendButton = new Luts.Object.Button(this.state,0,180,Luts.Format.Color('red')+'Ascent','',this.ascent.bind(this));
    this.addChild(this.ascendButton);


    Luts.Events.onCurrencyChanged[0].add(this.updateText,this);
    Luts.Events.onBuyAmountChanged.add(this.updateText,this);
    Luts.Events.onUpgrade.add(this.updateText,this);


    this.setImage(1);
    this.updateText();

    this.diceContainer.dices.push(this);
};

Luts.Object.Dice.prototype.constructor = Luts.Object.Dice;
Luts.Object.Dice.prototype = Object.create(Phaser.Image.prototype);

Luts.Object.Dice.prototype.update = function () {

};

Luts.Object.Dice.prototype.averagePerSecond = function(){
    return this.upgrade.value.times(this.max / 2);
};

Luts.Object.Dice.prototype.ascent = function(){
    this.ascentNum += 1;
    Luts.Upgrades.reset(this.upgrade);
    this.upgrade.price = this.upgrade.price.times(Math.pow(this.ascentIncrease, this.ascentNum));
    if (this.upgrade.initialLevel === 0)
        Luts.Upgrades.upgrade(this.upgrade,true);
    Luts.Upgrades.saveUpgrade(this.upgrade);
    Luts.Store.setItem(this.diceContainer.diceName+this.id+'_ascNum',this.ascentNum);
    this.multi.setMultiplier('upgrade',this.upgrade.value);
    this.multi.setMultiplier('ascent',BigNumber(100).pow(this.ascentNum));
    this.updateText();
};

Luts.Object.Dice.prototype.updateText = function() {
    var upgradeAble = Luts.Upgrades.isUpgradeable(this.upgrade,false,Luts.Upgrades.buyAmount);

    this.upgradeButton.subtitle.setText('<c=' + (upgradeAble ? Luts.Config['colors']['green'] : Luts.Config['colors']['red'])  + '>'+ Luts.Format.BigNumber(Luts.Upgrades.priceMultiple(this.upgrade),false,0));
    this.valueText.setText('Multi: ' + Luts.Format.BigNumber(this.multi.modValue()));
    this.levelText.setText('Level: ' + Luts.Format.BigNumber(this.upgrade.level));

    this.upgradeButton.setActive(upgradeAble,this.upgrade.level <= 1);

    var v = (this.upgrade.level > 0);
    this.diceImage.visible = v;
    this.valueText.visible = v;
    this.levelText.visible = v;
    this.pointsText.visible = v;
    this.plusText.visible = v;

    this.ascendButton.visible = (this.upgrade.level >= 100);

    if (this.id > 0)
        this.upgradeButton.visible = this.diceContainer.dices[this.id - 1].upgrade.level >= 10 || this.diceContainer.dices[this.id - 1].ascentNum > 0;
    if (v){
        this.upgradeButton.text.setText('Upgrade');
    } else {
        this.upgradeButton.text.setText('Buy');
    }
};

Luts.Object.Dice.prototype.roll = function(){
    if(this.upgrade.level > 0) {
        var int = this.game.rnd.between(this.min, this.max);
        this.setImage(int);
        this.lastPoints = int;
        this.lastScore = this.multi.modValue().times(int);
    }
    return this.lastScore;
};

Luts.Object.Dice.prototype.setImage = function(i) {
    if (this.diceType === 6){
        this.diceImage.frameName = 'd' + this.diceType + '_' + i;
        this.diceNumber.visible = false;
    }else {
        this.diceImage.frameName = 'd' + this.diceType;
        this.diceNumber.setText(i);
        this.diceNumber.visible = true;
    }
};

Luts.Object.Dice.prototype.playRollAnim = function (seconds) {
    this.pointsText.alpha = 0;
    this.plusText.alpha = 0;

    if (!Luts.isActive)
        return;

    if (this.rollAnim)
        this.rollAnim.stop();
    this.diceImage.y = 0;
    this.diceImage.angle = 0;
    var dly = this.game.rnd.between(0,seconds / 2);
    this.rollAnim = this.game.add.tween(this.diceImage).from({y: -500}, seconds * 1000, Phaser.Easing.Bounce.Out,true,dly);
    this.game.add.tween(this.diceImage).from({ angle: this.game.rnd.between(-360,360)}, seconds * 1000, Phaser.Easing.Back.Out,true, dly);

    this.rollAnim.onComplete.add(this.playScoreAnim,this);
};

Luts.Object.Dice.prototype.playScoreAnim = function () {
    this.pointsText.alpha = 1;
    this.pointsText.setText(Luts.Format.BigNumber(this.lastScore));
    this.pointsText.scale.set(1);
    this.game.add.tween(this.pointsText.scale).from({x: 0, y: 0}, 500, Phaser.Easing.Elastic.Out,true);

    this.plusText.alpha = 1;
    this.plusText.scale.set(1);
    this.game.add.tween(this.plusText.scale).from({x: 0, y: 0}, 500, Phaser.Easing.Elastic.Out,true);
};
Luts.DiceRules = function (array) {
    var amounts = Luts.DiceRules.getAmounts(array);

    if (amounts.some(function(e){return e.amount === 5})){
        return Luts.DiceRules.Match.FIVER;
    }
    if (amounts.some(function(e){return e.amount === 3}) && amounts.some(function(e){return e.amount === 2})){
        return Luts.DiceRules.Match.FULLHOUSE;
    }
    if (amounts.some(function(e){return e.amount === 4})){
        return Luts.DiceRules.Match.FOUR;
    }
    if (Luts.DiceRules.detectStraight(array)){
        return Luts.DiceRules.Match.STRAIGHT;
    }
    if (amounts.some(function(e){return e.amount === 3})){
        return Luts.DiceRules.Match.TRIPLET;
    }
    if (Luts.DiceRules.detectTwoPair(amounts)){
        return Luts.DiceRules.Match.TWOPAIR;
    }
    if (amounts.some(function(e){return e.amount === 2})){
        return Luts.DiceRules.Match.PAIR;
    }

    return Luts.DiceRules.Match.NOTHING;
};

Luts.DiceRules.Match = {
    NOTHING: 'nothing',
    FIVER: 'fiver',
    FULLHOUSE: 'fullhouse',
    FOUR: 'four',
    TRIPLET: 'triplet',
    PAIR: 'pair',
    STRAIGHT: 'straight',
    TWOPAIR: 'twopair',
    all: ['pair','triplet','twopair','four','straight','fullhouse','fiver']
};

Luts.DiceRules.getData = function(type){
    var ret = {
        displayName: '',
        name: '',
        chance: 1,
        multi: 1,
        effect: 0,
        minDices: 0
    };

    switch (type){
        case Luts.DiceRules.Match.NOTHING:
            break;
        case Luts.DiceRules.Match.FIVER:
            ret.displayName = 'FIVE!!!!!!1';
            ret.name = 'Five';
            ret.minDices = 5;
            ret.chance = 0.00077;
            ret.multi = 1500;
            ret.effect = 5;
            ret.price = 50;
            break;
        case Luts.DiceRules.Match.FULLHOUSE:
            ret.displayName = "FULLHOUSE!!";
            ret.name = 'Full House';
            ret.minDices = 5;
            ret.chance = 0.038;
            ret.multi = 30;
            ret.effect = 3;
            ret.price = 50;
            break;
        case Luts.DiceRules.Match.FOUR:
            ret.displayName = "FOUR!!!";
            ret.name = 'Four';
            ret.minDices = 4;
            ret.chance = 0.019;
            ret.multi = 60;
            ret.effect = 4;
            ret.price = 50;
            break;
        case Luts.DiceRules.Match.TRIPLET:
            ret.displayName = "Triplet!!";
            ret.name = 'Triplet';
            ret.minDices = 3;
            ret.chance = 0.154;
            ret.multi = 7;
            ret.effect = 2;
            ret.price = 50;
            break;
        case Luts.DiceRules.Match.PAIR:
            ret.displayName = "Pair";
            ret.name = 'Pair';
            ret.minDices = 2;
            ret.chance = 0.3;
            ret.multi = 2;
            ret.effect = 1;
            ret.price = 50;
            break;
        case Luts.DiceRules.Match.STRAIGHT:
            ret.displayName = "STRAIGHT!";
            ret.name = 'Straight';
            ret.minDices = 5;
            ret.chance = 0.03;
            ret.multi = 20;
            ret.effect = 3;
            ret.price = 50;
            break;
        case Luts.DiceRules.Match.TWOPAIR:
            ret.displayName = "Two Pair!";
            ret.name = 'Two Pair';
            ret.minDices = 4;
            ret.chance = 0.2;
            ret.multi = 5;
            ret.effect = 1;
            ret.price = 50;
            break;
        default:
            break;
    }
    return ret;
};

Luts.DiceRules.getAmounts = function (array) {
    var amounts = [];
    for(var i = 0; i < array.length; i++){
        if (array[i] == null)
            continue;

        var amountIndex = Luts.DiceRules.hasAmount(amounts,array[i]);
        if (amountIndex != null){
            amounts[amountIndex].amount += 1;
        }else{
            amounts.push({value: array[i], amount: 1});
        }
    }
    return amounts;
};

Luts.DiceRules.hasAmount = function (amounts, value) {
    for(var i = 0; i < amounts.length; i++){
        if (amounts[i].value == value)
            return i;
    }
    return null;
};

Luts.DiceRules.detectTwoPair = function (amounts) {
    var firstPair=null;
    for(var i = 0; i < amounts.length; i++){
        if(amounts[i].amount == 2)
            firstPair = amounts[i];
    }
    if (firstPair){
        for(var i = 0; i < amounts.length; i++){
            if(amounts[i] != firstPair && amounts[i].amount == 2)
                return true;
        }
    }
    return false;
};

Luts.DiceRules.detectStraight = function (array) {
    array.sort();
    for(var i = 1; i < array.length; i++){
        if (array[i] != array[i-1] + 1)
            return false;
    }
    return true;
};
Luts.Object.DiceContainer = function(state, x, y,name){
    Phaser.Image.call(this, state.game, x, y);
    state.game.add.existing(this);
    this.game = state.game;
    this.state = state;
    this.diceName = name;
    this.dices = [];
    this.createDices();
    this.lastScore = 0;
    this.unlockedDices = -1;

    this.totalText = new Luts.Object.Text(state,0, -100,'regular', 100, 30);
    this.totalText.anchor.set(0.5);
    this.addChild(this.totalText);
    this.totalText.visible = false;

    this.bonusText = new Luts.Object.Text(state,-100,-120,'regular','100',32,'#000000');
    this.bonusText.angle = -25;
    this.bonusText.anchor.set(0.5);
    this.addChild(this.bonusText);
    this.bonusText.visible = false;

    this.leftUI = this.game.add.image(0,Luts.GAME_HEIGHT / 2);
    this.state.setResponsive(this.leftUI);
    this.state.groupUI.add(this.leftUI);

    this.matchContainer = this.game.add.image(-270,0,'ui','labelMiddle');
    this.matchContainer.anchor.set(0,0.5);
    this.matchContainer.arrowButton = new Luts.Object.Button(state,280,0,'','',this.moveMatchContainer.bind(this));
    this.matchContainer.arrowButton.setFrames('arrowButton','arrowButton');
    this.matchContainer.out = false;
    this.matchContainer.addChild(this.matchContainer.arrowButton);
    this.leftUI.addChild(this.matchContainer);

    Luts.DiceRules.Match.all.forEach(function (m,i) {
        var d = Luts.DiceRules.getData(m);
        var u = Luts.Upgrades.add(m + '_multi',d.name + ' Multiplier','Multiplies points of rolls of ' + d.name,d.price,d.multi,1.35,d.multi / 10,null,0);
        var btn = new Luts.Object.MatchButton(state,140,-170 + i * 56, u,d,this);
        this.matchContainer.addChild(btn);
    }.bind(this));

    Luts.Events.onUpdate.add(this.update,this);

    Luts.Events.onUnlockedDice.add(function () {
        this.totalText.alpha = this.unlockedDices > 0 ? 1 : 0;

        this.matchContainer.visible = this.unlockedDices > 0;
        this.matchContainer.arrowButton.setActive(this.unlockedDices > 0,true);
    },this);
};

Luts.Object.DiceContainer.prototype.constructor = Luts.Object.DiceContainer;
Luts.Object.DiceContainer.prototype = Object.create(Phaser.Image.prototype);

Luts.Object.DiceContainer.prototype.moveMatchContainer = function(){
    if (this.matchContainer.tw)
        this.matchContainer.tw.stop();

    if (this.matchContainer.out){
        this.matchContainer.x = -270;
        this.matchContainer.tw = this.game.add.tween(this.matchContainer).from({x: -20},250,Phaser.Easing.Elastic.Out,true);
    }else{
        this.matchContainer.x = -20;
        this.matchContainer.tw = this.game.add.tween(this.matchContainer).from({x: -270},250,Phaser.Easing.Bounce.Out,true);
    }

    this.matchContainer.out = !this.matchContainer.out;
};

Luts.Object.DiceContainer.prototype.update = function () {
    var unlockedDices = -1;
    this.dices.forEach(function (d) {
        if (d.upgrade.level > 0 || d.upgrade.ascentNum > 0) {
            unlockedDices += 1;
        }
    }.bind(this));

    if (unlockedDices !== this.unlockedDices){
        this.unlockedDices = unlockedDices;
        Luts.Events.onUnlockedDice.dispatch();
    }

    this.dices.forEach(function (d,i) {
        var tx = -240 / 4 * this.unlockedDices + i * 120;
        d.x += (tx - d.x) * 0.05;
    }.bind(this));
};

Luts.Object.DiceContainer.prototype.createDices = function(){
    var dices = Luts.Config["dices"];
    var mainDices = dices[this.diceName];

    mainDices.forEach(function (d,i) {
        var dObj = new Luts.Object.Dice(this,-240 + i * 120,0,d["startD"],d["cost"],d["value"],d["costIncrease"],d["valueIncrease"],d["initialLevel"], d["ascentIncrease"]);
        dObj.anchor.set(0.5);
        this.addChild(dObj);
    }.bind(this))
};

Luts.Object.DiceContainer.prototype.rollAll = function(){
    var total = BigNumber(0);
    var values = [];
    this.dices.forEach(function(d){
        var value = d.roll();
        total = total.add(value);
        values.push(d.upgrade.level > 0 ? d.lastPoints : null);
        d.playRollAnim(this.state.rollAnim / 2);
    }.bind(this));

    var dr = Luts.DiceRules(values);
    if (dr != Luts.DiceRules.Match.NOTHING) {
        this.playBonusAnim(dr);
        total = total.times(Luts.Upgrades.value(dr + '_multi'));
    }
    this.playTotalAnim(total);
    this.lastScore = total;
    return total;
};

Luts.Object.DiceContainer.prototype.playBonusAnim = function(bonus) {
    if (!Luts.isActive)
        return;
    if (this.bonusTween)
        this.bonusTween.stop();
    if (this.bonusTween2)
        this.bonusTween2.stop();
    if (this.bonusTween3)
        this.bonusTween3.stop();
    this.bonusText.visible = true;
    var b = Luts.DiceRules.getData(bonus);
    var color = '#ffffff';
    var size = 30;
    var shake = 0;
    var animSpeed = this.state.rollAnim / 2;
    this.bonusText.angle = -25;
    switch (b.effect){
        case 1:
            color = '#ffffff';
            size = 30;
            break;
        case 2:
            color = Luts.Config['colors']['yellow'];
            size = 35;
            this.bonusTween = this.game.add.tween(this.bonusText).from({angle: -35}, 250, Phaser.Easing.Sinusoidal.InOut,true,animSpeed * 1500,-1, true);
            shake = 0.005;
            break;
        case 3:
            color = Luts.Config['colors']['pink'];
            size = 45;
            this.bonusTween = this.game.add.tween(this.bonusText).from({angle: -35}, 125, Phaser.Easing.Sinusoidal.InOut,true,animSpeed * 1500,-1, true);
            shake = 0.01;
            break;
        case 4:
            color = Luts.Config['colors']['red'];
            size = 50;
            this.bonusTween = this.game.add.tween(this.bonusText).from({angle: -35}, 125, Phaser.Easing.Sinusoidal.InOut,true,animSpeed * 1500,-1, true);
            shake = 0.05;
            break;
        case 5:
            color = Luts.Config['colors']['red'];
            size = 150;
            this.bonusTween = this.game.add.tween(this.bonusText).from({angle: -35}, 125, Phaser.Easing.Sinusoidal.InOut,true,animSpeed * 1500,-1, true);
            shake = 0.1;
            break;
        default:
            break;
    }

    this.bonusText.scale.set(1);
    this.bonusTween2 = this.game.add.tween(this.bonusText.scale).from({x:0,y:0},animSpeed * 400,Phaser.Easing.Elastic.Out,true, animSpeed * 1500);
    this.bonusTween3 = this.game.add.tween(this.bonusText.scale).to({x:0,y:0}, 1000, Phaser.Easing.Back.In);
    this.bonusTween2.chain(this.bonusTween3);

    this.game.time.events.add(animSpeed * 1600,function () {
        this.game.camera.shake(shake,animSpeed * 500);
    },this);

    this.bonusText.setText('x' + Luts.Format.BigNumber(Luts.Upgrades.value(bonus + '_multi')) + '\n<c='+color+'>' + b.displayName);
    this.bonusText.fontSize = size;
};

Luts.Object.DiceContainer.prototype.playTotalAnim = function (total) {
    if (!Luts.isActive)
        return;
    if(this.totalAnim)
        this.totalAnim.stop();
    this.totalText.visible = true;

    this.totalText.setText(Luts.Format.BigNumber(total));
    this.totalText.scale.set(1);
    this.totalAnim = this.game.add.tween(this.totalText.scale).from({x: 0, y: 0},this.state.rollAnim * 500/2, Phaser.Easing.Elastic.Out,true, this.state.rollAnim * 1500 / 2);
};

Luts.Object.DiceContainer.prototype.averagePerSecond = function () {
    var total = BigNumber(0);
    this.dices.forEach(function (dice) {
        total = total.add(dice.averagePerSecond());
    });
    return total;
};
Luts.Object.MatchButton = function(state, x, y, upgrade,match,container){
    Luts.Object.Button.call(this, state, x, y, upgrade.displayName, upgrade.price, this.clickUpgrade.bind(this));

    this.setFrames('button_active','button_inactive');
    this.upgrade = upgrade;

    this.text.x = -90;
    this.text.anchor.set(0,0.5);
    this.subtitle.x = 90;
    this.subtitle.anchor.set(1,0.5);
    this.valueText = new Luts.Object.Text(state,-90,this.subtitle.y,'regular',upgrade.value,Luts.Object.Button.FONT_SIZE_SUBTITLE,'#000000');
    this.valueText.anchor.set(0,0.5);
    this.valueText.strokeThickness = 0;
    this.addChild(this.valueText);

    this.match = match;
    this.diceContainer = container;


    new Luts.Object.Tooltip(state,this,upgrade.description);

    Luts.Events.onCurrencyChanged[0].add(this.updateText,this);
    Luts.Events.onBuyAmountChanged.add(this.updateText,this);
    Luts.Events.onUnlockedDice.add(this.updateText,this);
};

Luts.Object.MatchButton.prototype.constructor = Luts.Object.MatchButton;
Luts.Object.MatchButton.prototype = Object.create(Luts.Object.Button.prototype);

Luts.Object.MatchButton.prototype.clickUpgrade = function(){
    Luts.Upgrades.upgradeMultiple(this.upgrade);
    this.updateText();
};

Luts.Object.MatchButton.prototype.updateText = function(){
    var upgradeAble = Luts.Upgrades.isUpgradeable(this.upgrade,false,Luts.Upgrades.buyAmount);

    this.subtitle.setText('<c=' + (upgradeAble ? Luts.Config['colors']['green'] : Luts.Config['colors']['red'])  + '>'+ Luts.Format.BigNumber(Luts.Upgrades.priceMultiple(this.upgrade),false,0));
    this.valueText.setText(Luts.Format.BigNumber(this.upgrade.value));

    this.visible = this.diceContainer.unlockedDices + 1 >= this.match.minDices;
    this.setActive(upgradeAble);
};

Luts.Object.MatchButton.prototype.update = function () {

};