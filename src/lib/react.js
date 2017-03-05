/** This file is what React Router gets when it imports "react".
 *	It's just regular ol' Preact, but with:
 *		- h() aliased as createElement()
 *		- PropTypes mixed in
 *		- vnode.children deleted when empty
 */

import { h as createElement, Component, options } from 'preact';
import PropTypes from 'proptypes';

let old = options.vnode;
options.vnode = vnode => {
	if (vnode.children && !vnode.children.length) delete vnode.children;
	if (old) old(vnode);
};

const Children = { only: c => c[0], count: c => c.length };

export { createElement, Children, PropTypes, Component };
export default { createElement, Children, PropTypes, Component };
