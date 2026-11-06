export const buildTree = (files) => {
    const nodes = new Map(
        files.map(file => [
            file._id.toString(),
            {
                ...file.toObject(),
                children: []
            }
        ])
    );
    const tree = [];

    files.forEach(file => {
        const id = file._id.toString()
        if(file.parentId) {
            const parent = nodes.get(file.parentId.toString())
             if(parent) {
                parent.children.push(nodes.get(id))
             }
        } else {
            tree.push(nodes.get(id))
        }
    })
    return tree
}