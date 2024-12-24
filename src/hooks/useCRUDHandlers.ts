import { useSpinner, sharedProperty } from ".";
import { showErrorMessage, showSuccessMessage } from "../utils";
import { BaseEntityService } from "../services";

export function useCRUDHandlers<T>(
  service: BaseEntityService<T, any, any>,
  entityName: string,
  showAddState?: sharedProperty<boolean>,
  showEditState?: sharedProperty<boolean>
) {

  const { show, hide } = useSpinner();

  const getItems = async (oDataQuery: string) => await service.query(oDataQuery);

  const addItem = async (item: T) => {
    try {
      show();
      const ok = await service.insert(item);
      if (ok) {
        showSuccessMessage(`${entityName} added successfully.`);
        showAddState?.setter(false);
      }
    } catch (error) {
      showErrorMessage(`Error occurred while trying to execute insert: ${error}`);
    } finally {
      hide();
    }
  };

  const editItem = async (item: T & { id: number }) => {
    try {
      const ok = await service.update(item.id, item);
      if (ok) {
        showSuccessMessage(`${entityName} updated successfully.`);
        showEditState?.setter(false);
      }
    } catch (error) {
      throw new Error(`Unable to edit ${entityName}: ${error}`);
    } finally {
      hide();
    }
  };

  const deleteItem = async (item: T & { id: number }) => {
    try {
      show();
      const ok = await service.delete(item.id);
      if (ok) showSuccessMessage(`${entityName} deleted successfully.`);
    } catch (error) {
      throw new Error(`Unable to delete ${entityName}: ${error}`);
    } finally {
      hide();
    }
  };

  return {
    getItems,
    addItem,
    editItem,
    deleteItem,
  };
}
