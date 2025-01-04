import { Divider } from "@nextui-org/react";

export function IntegrationsSettingsPage() {

  return (
    <section className="py-6 space-y-6">
      <div>
        <h2 className="text-lg font-bold">Integrations</h2>
        <p className="text-gray-500 text-md">Manage your account integrations.</p>
      </div>
      <Divider />
      <div>
        <h2 className="text-lg font-bold">Connected Apps</h2>
        <p className="text-gray-500">Manage your connected applications and services.</p>
        <Divider className="my-4" />
      </div>
    </section>
  );
}

export default IntegrationsSettingsPage;
