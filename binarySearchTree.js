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

// FIND HEIGHT OF BST -- O(log(n))

const findHeightOfBST = tree => {  
  // BASE CASE
  if (tree.left === null && tree.right === null) {
    return 1;
  } 

  // RECURSIVE CASE
  let counterLeft = 1;
  let counterRight = 1;
  
  if (tree.right !== null && tree.left !== null) {
    counterLeft = counterLeft + findHeightOfBST(tree.left);
    counterRight = counterRight + findHeightOfBST(tree.right);
    return counterLeft > counterRight ? counterLeft : counterRight;
  } else if (tree.left !== null) {
    return counterLeft + findHeightOfBST(tree.left);
  } else {
    return counterRight + findHeightOfBST(tree.right);
  }
};

// IS IT A BINARY SEARCH TREE?

const isItBST = (tree, min=null, max=null) => {
  // BASE CASE

  if (min !== null) {
    if (tree.key < min) {
      return false;
    }
  }

  if (max !== null) {
    if (tree.key > max) {
      return false;
    }
  }

  // RECURSIVE CASE
  if (tree.right !== null) {
    if (!isItBST(tree.right, tree.key, max)) {
      return false;
    }
  }

  if (tree.left !== null) {
    if (!isItBST(tree.left, min, tree.key)) {
      return false;
    }
  }

  return true;
};

// FIND THIRD LARGEST NODE
const findLargestNode = tree => {
  if (tree.right !== null) {
    let node = tree.right;
    while (node.right !== null) {
      node = node.right;
    }
    return node;
  } else {
    return tree;
  }
};

const findThirdLargestNode = tree => {
  const largest = findLargestNode(tree);
  let secondLargest;
  let thirdLargest;
  
  if (largest.left !== null) {
    secondLargest = findLargestNode(largest.left);
    if (secondLargest.left !== null) {
      thirdLargest = findLargestNode(secondLargest.left);
    } else if (secondLargest.parent !== largest) {
      thirdLargest = secondLargest.parent;
    } else {
      thirdLargest = largest.parent;
    }
  } else {
    secondLargest = largest.parent;
    if (secondLargest.left !== null) {
      thirdLargest = findLargestNode(secondLargest.left);
    } else {
      thirdLargest = secondLargest.parent;
    }
  }
  return thirdLargest.key;
};

const findLengthOfShortestBranch = tree => {
  // BASE CASE
  
  if (tree.right === null || tree.left === null) {
    return 1;
  }

  // RECURSIVE CASE
  else {
    const leftBranch = 1 + findLengthOfShortestBranch(tree.left);
    const rightBranch = 1 + findLengthOfShortestBranch(tree.right);
    return leftBranch > rightBranch ? leftBranch : rightBranch;
  }

}

const isTreeBalanced = tree => {
  const longestBranch = findHeightOfBST(tree);
  const shortestBranch = findLengthOfShortestBranch(tree);
  return shortestBranch + 1 >= longestBranch ? true : false;
};

const main = () => {
  const test = new BinarySearchTree();
  test.insert(3);
  test.insert(1);
  test.insert(4);
  test.insert(6);
  test.insert(9);
  test.insert(12);
  test.insert(17);
  test.insert(10);
  // console.log(test);
  // console.log(findHeightOfBST(test));
  // console.log(isItBST(test));
  // console.log(isItBST(badTree));
  // console.log(findThirdLargestNode(test));
  console.log(isTreeBalanced(test));
};

main();

// const badTree = {
//   key: 5,
//   left: {
//     key: 4,
//     right: {
//       key: 6,
//       right: null,
//       left: null
//     },
//     left: null
//   },
//   right: {
//     key: 7,
//     right: null,
//     left: null
//   }
// };