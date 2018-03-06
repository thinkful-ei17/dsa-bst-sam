'use strict';

class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }

    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      else {
        this.left.insert(key, value);
      }
    }

    else if (key >= this.key) {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    }

    else if (key < this.key && this.left !== null) {
      this.left.find(key);
    }
  
    else if (key >= this.key && this.right !== null) {
      this.right.find(key);
    }

    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.right === null && this.left === null) {
        this._replaceWith(null);
      }
  
      else if (this.left === null) {
        this._replaceWith(this.right);
      }
  
      else if (this.right === null) {
        this._replaceWith(this.left);
      }
  
      else {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
    } 

    else if (key < this.key && this.left !== null) {
      this.left.remove(key);
    }

    else if (key > this.key && this.right !== null) {
      this.right.remove(key);
    }

    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (this.left !== null) {
      this.left._findMin();
    }
    else {
      return this;
    }
  }
}

// FIND HEIGHT OF BST -- O(nlog(n))

const findHeightBST = tree => {  
  // BASE CASE
  if (tree.left === null && tree.right === null) {
    return 1;
  } 

  // RECURSIVE CASE
  let counterLeft = 1;
  let counterRight = 1;
  
  if (tree.right !== null && tree.left !== null) {
    counterLeft = counterLeft + findHeightBST(tree.left);
    counterRight = counterRight + findHeightBST(tree.right);
    if (counterLeft > counterRight) {
      return counterLeft;
    } else {
      return counterRight;
    }
  } else if (tree.left !== null) {
    return counterLeft + findHeightBST(tree.left);
  } else {
    return counterRight + findHeightBST(tree.right);
  }
};

const main = () => {
  const test = new BinarySearchTree();
  test.insert(3);
  test.insert(1);
  test.insert(4);
  test.insert(6);
  test.insert(9);
  test.insert(2);
  test.insert(5);
  test.insert(7);
  console.log(test);
  console.log(findHeightBST(test));
};

main();
