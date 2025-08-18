output "public_ip" {
  description = "Public IP of the VM"
  value       = azurerm_public_ip.main.ip_address
}

output "admin_username" {
  description = "Admin username for the VM"
  value       = azurerm_linux_virtual_machine.main.admin_username
}
