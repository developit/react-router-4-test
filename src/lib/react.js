/** This file is what React Router gets when it imports "react".
 *	It's just regular ol' Preact, but with:
 *		- h() aliased as createElement()
 *		- PropTypes mixed in
 *		- vnode.children deleted when empty
 */

import { h as createElement, cloneElement, Component, options } from 'preact';
import PropTypes from 'proptypes';

let old = options.vnode;
options.vnode = vnode => {
	if (vnode.children && !vnode.children.length) delete vnode.children;
	if (old) old(vnode);
};

const childrenForEach = (children, cb) =>
	Array.isArray(children) && children.forEach((VNode) => {
		// this is gross, send help
		VNode.props = VNode.attributes;
		cb(VNode);
		delete VNode.props;
	});

const Children = {
	count: c => c.length,
	forEach: childrenForEach,
	only: c => c[0]
};

// TODO
const isValidElement = (element) => true;

export { createElement, cloneElement, isValidElement, Children, PropTypes, Component };
export default { createElement, cloneElement, isValidElement, Children, PropTypes, Component };
