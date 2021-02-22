# azure-allow-list
Use node and the Azure CLI to quickly generate allow (or deny) lists.

To use:
* Make sure you have the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed.
* Make sure you have the Azure CLI [Resource Graph Extension](https://docs.microsoft.com/en-us/azure/governance/resource-graph/first-query-azurecli#add-the-resource-graph-extension) installed.
* Make sure you a recent version of [node](https://nodejs.org/en/download/) installed.
* Pull down the code.
* Run `npm install`.
* Login to the Azure CLI with `az login`.
* Run the script and pass in the subscription id. 
```
node index.js c8faea8e-b5d3-4f31-bc58-f15f4390309a > azure-allow-list.csv
```
Have fun allowing (or denying) endpoints!