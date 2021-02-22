# Azure Allow List Generator
Use node and the Azure CLI to quickly generate allow (or deny) lists for Azure endpoints.

Read the [blog article](https://dev.to/michaelsrichter/easily-create-allow-or-deny-lists-for-azure-resources-pfb).

To use:
* This works great in Azure Shell. If you're NOT using Azure Shell:
  * Make sure you have the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) installed.
  * Make sure you have the Azure CLI [Resource Graph Extension](https://docs.microsoft.com/en-us/azure/governance/resource-graph/first-query-azurecli#add-the-resource-graph-extension) installed.
  * Make sure you a recent version of [node](https://nodejs.org/en/download/) installed.
  * Login to the Azure CLI with `az login`.
* Pull down the code.
* Run `npm install`.
* Run the script and pass in the subscription id. 
```
node index.js c8faea8e-b5d3-4f31-bc58-f15f4390309a > azure-allow-list.csv
```
Have fun allowing (or denying) endpoints!