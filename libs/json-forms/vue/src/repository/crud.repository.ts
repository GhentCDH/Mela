import { object } from 'zod';

import type { FormSchemaModel } from '@ghentcdh/json-forms/core';

type RequestOptions = {
  skipAuth?: boolean;
  queryParams?: Record<string, any>;
  contentType?: string;
};

export type HttpRequest<T> = {
  get: <T>(url: string, options?: RequestOptions) => Promise<T>;
  postFile: <T>(
    url: string,
    file: File,
    data?: any,
    options?: RequestOptions,
  ) => Promise<T>;
  post: <T>(url: string, data: any, options?: RequestOptions) => Promise<T>;
  patch: <T>(url: string, data: any, options?: RequestOptions) => Promise<T>;
  delete: <T>(url: string, data?: any, options?: RequestOptions) => Promise<T>;
};

export type NotificationStore = {
  info: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  success: (message: string) => void;
};

type RepositoryOptions = {
  notification?: {
    show: true;
    entityType: string;
    notification: NotificationStore;
  };
};

export const createRepository = <T extends { id?: string }>(
  formSchemaModel: Pick<FormSchemaModel, 'uri'>,
  httpRequest: HttpRequest<T>,
  options: RepositoryOptions = {},
) => {
  const notificationEntity = options.notification?.entityType || 'entity';
  const notificationStore = options.notification?.notification ?? null;

  const getDataUri = (...suffix: string[]) => {
    return [formSchemaModel.uri, ...suffix].join('/');
  };

  const handleSuccess = (message: string) => {
    const notification = options.notification;
    notificationStore?.success(message);
  };

  const handleError = (error: any, message: string) => {
    console.error(error);
    const notification = options.notification;
    notificationStore?.error(message);

    throw new Error(error);
  };

  const create = (object: T, options?: RequestOptions) => {
    return httpRequest
      .post(getDataUri(), object, options)
      .then((response) => handleSuccess(`Created ${notificationEntity}`))
      .catch((response) => {
        handleError(response, `Failed to create ${notificationEntity}`);
      });
  };

  const patch = (id: string, object: T, options?: RequestOptions) => {
    return httpRequest
      .patch(getDataUri(id), object, options)
      .then((response) => handleSuccess(`Saved ${notificationEntity}`))
      .catch((response) => {
        handleError(response, `Failed to save ${notificationEntity}`);
      });
  };

  const _delete = (id: string, options?: RequestOptions) => {
    return httpRequest
      .delete(getDataUri(id), options)
      .then((response) => handleSuccess(`${notificationEntity} deleted`))
      .catch((response) => {
        handleError(response, `Failed to delete ${notificationEntity}`);
      });
  };

  const createMulti = (objects: T[], options?: RequestOptions) => {
    return Promise.all(httpRequest.post(getDataUri(), object, options))
      .then((response) => handleSuccess(`Created ${notificationEntity}`))
      .catch((response) => {
        handleError(response, `Failed to save ${notificationEntity}`);
      });
  };

  return { create, patch, createMulti, delete: _delete };
};
